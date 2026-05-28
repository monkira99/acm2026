import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { verifyAdmin } from "@/lib/admin-session";
import { formatAbstractTopic } from "@/lib/abstract-topics";

function toCSV(headers: string[], rows: string[][]): string {
  const escape = (val: string) => `"${String(val).replace(/"/g, '""')}"`;
  return [
    headers.map(escape).join(","),
    ...rows.map((row) => row.map(escape).join(",")),
  ].join("\n");
}

function formatAuthors(authors: unknown): string {
  if (Array.isArray(authors)) {
    return authors
      .map((author) => {
        const label =
          author?.role === "presenting" ? "Presenting Author" : "Co-Author";
        const email = author?.email ? ` <${author.email}>` : "";
        return `${author?.name ?? ""} (${label}) - ${author?.affiliation ?? ""}${email}`;
      })
      .join("; ");
  }

  return String(authors ?? "");
}

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const docs = await Abstract.find().sort({ submittedAt: -1 }).lean();
  const headers = [
    "Submission ID",
    "Title",
    "Authors",
    "Email",
    "Affiliation",
    "Type",
    "Topic",
    "Keywords",
    "Abstract Text",
    "Date",
  ];
  const rows = docs.map((d) => [
    d.submissionId ?? "",
    d.title ?? "",
    formatAuthors(d.authors),
    d.correspondingEmail ?? "",
    d.affiliation ?? "",
    d.presentationType ?? "",
    formatAbstractTopic(d.topic),
    (d.keywords as string[]).join("; "),
    d.abstractText ?? "",
    new Date(d.submittedAt).toISOString(),
  ]);

  return new Response(toCSV(headers, rows), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="acm23-abstracts.csv"`,
    },
  });
}
