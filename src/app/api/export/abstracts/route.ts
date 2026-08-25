import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { verifyAdmin } from "@/lib/admin-session";
import {
  formatAbstractSession,
  formatScientistCategory,
} from "@/lib/abstract-topics";

function toCSV(headers: string[], rows: string[][]): string {
  const escape = (val: string) => `"${String(val).replace(/"/g, '""')}"`;
  return [
    headers.map(escape).join(","),
    ...rows.map((row) => row.map(escape).join(",")),
  ].join("\n");
}

export async function GET(request: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    url.host;
  const proto =
    request.headers.get("x-forwarded-proto") ??
    url.protocol.replace(":", "");
  const origin = `${proto}://${host}`;

  await connectDB();
  const docs = await Abstract.find().sort({ submittedAt: -1 }).lean();
  const headers = [
    "Submission ID",
    "Notification Email",
    "Scientist Category",
    "Preferred Session",
    "File Name",
    "File URL",
    "File Size (bytes)",
    "Submitted At",
    "Email Sent",
  ];
  const rows = docs.map((d) => [
    d.submissionId ?? "",
    d.notificationEmail ?? "",
    formatScientistCategory(d.scientistCategory),
    formatAbstractSession(d.sessionPreference),
    d.fileName ?? "",
    d.submissionId
      ? `${origin}/api/admin/abstracts/${d.submissionId}/file`
      : (d.fileUrl ?? ""),
    String(d.fileSize ?? ""),
    new Date(d.submittedAt).toISOString(),
    d.emailSent ? "yes" : "no",
  ]);

  return new Response(toCSV(headers, rows), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="acm23-abstracts.csv"`,
    },
  });
}
