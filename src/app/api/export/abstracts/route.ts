import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { verifyAdmin } from "@/lib/admin-session";

function toCSV(headers: string[], rows: string[][]): string {
  const escape = (val: string) => `"${String(val).replace(/"/g, '""')}"`;
  return [
    headers.map(escape).join(","),
    ...rows.map((row) => row.map(escape).join(",")),
  ].join("\n");
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
    "Keywords",
    "PDF URL",
    "Date",
  ];
  const rows = docs.map((d) => [
    d.submissionId ?? "",
    d.title ?? "",
    d.authors ?? "",
    d.correspondingEmail ?? "",
    d.affiliation ?? "",
    d.presentationType ?? "",
    (d.keywords as string[]).join("; "),
    (d.pdfFileUrl as string) ?? "",
    new Date(d.submittedAt).toISOString(),
  ]);

  return new Response(toCSV(headers, rows), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="acm23-abstracts.csv"`,
    },
  });
}
