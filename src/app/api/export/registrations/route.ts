import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
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
  const docs = await Registration.find().sort({ registeredAt: -1 }).lean();
  const headers = [
    "Confirmation ID",
    "Name",
    "Email",
    "Affiliation",
    "Country",
    "Role",
    "Dietary",
    "Requests",
    "Date",
  ];
  const rows = docs.map((d) => [
    d.confirmationId ?? "",
    d.fullName ?? "",
    d.email ?? "",
    d.affiliation ?? "",
    d.country ?? "",
    d.role ?? "",
    d.dietaryRequirements ?? "",
    d.specialRequests ?? "",
    new Date(d.registeredAt).toISOString(),
  ]);

  return new Response(toCSV(headers, rows), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="acm23-registrations.csv"`,
    },
  });
}
