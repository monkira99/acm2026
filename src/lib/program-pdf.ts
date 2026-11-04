import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, PageSizes, rgb } from "pdf-lib";
import type { PDFFont, PDFPage, RGB } from "pdf-lib";
import type { ProgramDay, ProgramSession, programOverview } from "@/data/program";

const [PAGE_WIDTH, PAGE_HEIGHT] = PageSizes.A4;
const MARGIN = 36;
const WIDTH = PAGE_WIDTH - MARGIN * 2;
const TIME_WIDTH = 78;
const TEXT_X = MARGIN + TIME_WIDTH;
const TEXT_WIDTH = WIDTH - TIME_WIDTH - 12;
const BOTTOM = PAGE_HEIGHT - 44;
const blue = rgb(0.133, 0.376, 0.678);
const ink = rgb(0.078, 0.239, 0.471);
const body = rgb(0.149, 0.239, 0.361);
const muted = rgb(0.28, 0.36, 0.46);
const pale = rgb(0.918, 0.949, 0.984);
const rule = rgb(0.80, 0.86, 0.92);

/** Wrap by actual embedded font metrics, including long scientific names. */
function wrap(text: string, font: PDFFont, size: number, width: number) {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= width) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = "";
      for (const character of word) {
        if (line && font.widthOfTextAtSize(line + character, size) > width) {
          lines.push(line);
          line = "";
        }
        line += character;
      }
    }
    lines.push(line);
  }
  return lines;
}

export async function createProgramPdf(
  days: ProgramDay[],
  overview: typeof programOverview,
) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle(`ACM23 — Scientific programme | ${overview.dates}`);
  doc.setAuthor("ACM23 Hanoi");
  doc.setSubject(overview.theme);
  doc.setLanguage("en");

  const [regularBytes, boldBytes, italicBytes] = await Promise.all([
    readFile(path.join(process.cwd(), "src/assets/fonts/Inter-Regular.ttf")),
    readFile(path.join(process.cwd(), "src/assets/fonts/Inter-Bold.ttf")),
    readFile(path.join(process.cwd(), "src/assets/fonts/Inter-BoldItalic.ttf")),
  ]);
  // Full embedding preserves Inter's composite glyphs across PDF viewers.
  const regular = await doc.embedFont(regularBytes);
  const bold = await doc.embedFont(boldBytes);
  const italic = await doc.embedFont(italicBytes);
  let page!: PDFPage;
  let y = 0;
  let currentDay: ProgramDay;

  function text(
    value: string,
    x: number,
    top: number,
    size: number,
    font = regular,
    color: RGB = body,
  ) {
    page.drawText(value, { x, y: PAGE_HEIGHT - top - size, size, font, color });
  }

  function rectangle(x: number, top: number, width: number, height: number, color: RGB) {
    page.drawRectangle({ x, y: PAGE_HEIGHT - top - height, width, height, color });
  }

  function paragraph(
    value: string,
    x: number,
    top: number,
    size: number,
    lineHeight: number,
    font = regular,
    color = body,
    width = TEXT_WIDTH,
  ) {
    const lines = wrap(value, font, size, width);
    lines.forEach((line, index) => text(line, x, top + index * lineHeight, size, font, color));
    return lines.length * lineHeight;
  }

  function dayHeading() {
    rectangle(MARGIN, y, WIDTH, 29, blue);
    text(`${currentDay.day}  /  ${currentDay.date}`, MARGIN + 10, y + 7, 11, bold, rgb(1, 1, 1));
    y += 37;
  }

  function addPage(continued = false) {
    page = doc.addPage(PageSizes.A4);
    const first = doc.getPageCount() === 1;
    if (first) {
      rectangle(0, 0, PAGE_WIDTH, 114, ink);
      text("ACM23", MARGIN, 20, 24, bold, rgb(1, 1, 1));
      const label = `HANOI, VIETNAM  /  ${overview.dates.toUpperCase()}`;
      text(label, PAGE_WIDTH - MARGIN - bold.widthOfTextAtSize(label, 8), 32, 8, bold, rgb(1, 1, 1));
      text("Scientific programme", MARGIN, 54, 20, bold, rgb(1, 1, 1));
      paragraph(overview.theme, MARGIN, 85, 8.5, 11, regular, rgb(0.87, 0.93, 1), WIDTH);
    }
    y = first ? 130 : MARGIN;
    if (first) {
      const venueLines = wrap(overview.venue, regular, 8, WIDTH);
      venueLines.forEach((line, index) => {
        const x = PAGE_WIDTH - MARGIN - regular.widthOfTextAtSize(line, 8);
        text(line, x, y + index * 10, 8, regular, muted);
      });
      y += venueLines.length * 10 + 12;
    }
    if (continued) dayHeading();
  }

  function sessionNotes(session: ProgramSession) {
    return [
      ...(session.chairs?.length ? [`Chairs: ${session.chairs.join(" and ")}`] : []),
      ...(session.details ?? []).map((detail) => `• ${detail}`),
      ...(session.description ? [session.description] : []),
    ];
  }

  function sessionHeight(session: ProgramSession) {
    return 17 + wrap(session.title, bold, 10, TEXT_WIDTH).length * 12.5
      + sessionNotes(session).reduce((height, note) => height + wrap(note, regular, 8.5, TEXT_WIDTH).length * 11 + 4, 0);
  }

  function sessionHeading(session: ProgramSession) {
    const height = sessionHeight(session);
    const scientific = session.type === "session";
    if (scientific) rectangle(MARGIN, y, WIDTH, height, pale);
    text(session.time, MARGIN + 9, y + 8, 8.5, bold, blue);
    let top = y + 7;
    top += paragraph(session.title, TEXT_X, top, 10, 12.5, bold, ink);
    for (const note of sessionNotes(session)) {
      top += 4;
      top += paragraph(note, TEXT_X, top, 8.5, 11);
    }
    y += height;
  }

  type Talk = NonNullable<ProgramSession["talks"]>[number];
  function titleLines(talk: Talk) {
    const parts = typeof talk.title === "string" ? [talk.title] : talk.title;
    const runs = [
      ...(talk.keynote ? [{ value: `${talk.keynote}: `, font: bold }] : []),
      ...parts.map((part) => typeof part === "string"
        ? { value: part, font: bold }
        : { value: part.scientificName, font: italic }),
    ];
    const lines: { value: string; font: PDFFont }[][] = [[]];
    let width = 0;
    for (const run of runs) {
      for (const token of run.value.match(/\s+|\S+/g) ?? []) {
        if (!width && !token.trim()) continue;
        const tokenWidth = run.font.widthOfTextAtSize(token, 9.2);
        if (width + tokenWidth > TEXT_WIDTH) {
          lines.push([]);
          width = 0;
          if (!token.trim()) continue;
        }
        const values = tokenWidth > TEXT_WIDTH
          ? wrap(token, run.font, 9.2, TEXT_WIDTH)
          : [token];
        for (const value of values) {
          if (width + run.font.widthOfTextAtSize(value, 9.2) > TEXT_WIDTH) {
            lines.push([]);
            width = 0;
          }
          lines[lines.length - 1].push({ value, font: run.font });
          width += run.font.widthOfTextAtSize(value, 9.2);
        }
      }
    }
    return lines;
  }

  function talkHeight(talk: Talk) {
    return titleLines(talk).length * 11.8
      + wrap(talk.speaker, bold, 8.4, TEXT_WIDTH).length * 10.5
      + wrap(talk.affiliation, regular, 8, TEXT_WIDTH).length * 10.2 + 18;
  }

  for (const [dayIndex, day] of days.entries()) {
    currentDay = day;
    const opening = day.sessions[0];
    const firstBlock = opening
      ? sessionHeight(opening) + (opening.talks?.[0] ? talkHeight(opening.talks[0]) : 0)
      : 0;
    // Keep each date with its first event, while avoiding mostly empty pages.
    if (dayIndex === 0 || y + 51 + firstBlock > BOTTOM) addPage();
    else y += 14;
    dayHeading();

    for (const session of day.sessions) {
      const firstTalk = session.talks?.[0];
      const minimum = sessionHeight(session) + (firstTalk ? talkHeight(firstTalk) : 0);
      if (y + minimum > BOTTOM) addPage(true);
      sessionHeading(session);

      for (const talk of session.talks ?? []) {
        const height = talkHeight(talk);
        if (y + height > BOTTOM) {
          addPage(true);
        }
        text(talk.time, MARGIN + 9, y + 8, 8.2, bold, blue);
        let top = y + 7;
        for (const line of titleLines(talk)) {
          let x = TEXT_X;
          for (const run of line) {
            text(run.value, x, top, 9.2, run.font, ink);
            x += run.font.widthOfTextAtSize(run.value, 9.2);
          }
          top += 11.8;
        }
        top += paragraph(talk.speaker, TEXT_X, top + 3, 8.4, 10.5, bold) + 3;
        paragraph(talk.affiliation, TEXT_X, top, 8, 10.2, regular, muted);
        y += height;
        page.drawLine({ start: { x: TEXT_X, y: PAGE_HEIGHT - y }, end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - y }, thickness: 0.5, color: rule });
      }
      y += 4;
    }
  }

  const pages = doc.getPages();
  pages.forEach((p, index) => {
    page = p;
    page.drawLine({ start: { x: MARGIN, y: 31 }, end: { x: PAGE_WIDTH - MARGIN, y: 31 }, thickness: 0.5, color: rule });
    text("ACM23  /  Scientific programme", MARGIN, PAGE_HEIGHT - 24, 7, regular, muted);
    const number = `${index + 1} / ${pages.length}`;
    text(number, PAGE_WIDTH - MARGIN - regular.widthOfTextAtSize(number, 7), PAGE_HEIGHT - 24, 7, regular, muted);
  });
  return doc.save();
}
