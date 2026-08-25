import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { verifyAdmin } from "@/lib/admin-session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ submissionId: string }> },
) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { submissionId } = await params;
  if (!submissionId) {
    return NextResponse.json(
      { error: "Submission ID is required" },
      { status: 400 },
    );
  }

  await connectDB();
  const abstract = await Abstract.findOne({ submissionId }).lean();
  if (!abstract || !abstract.fileUrl) {
    return NextResponse.json(
      { error: "Abstract file not found" },
      { status: 404 },
    );
  }

  try {
    let result = null;
    try {
      result = await get(abstract.fileUrl, { access: "private" });
    } catch {
      result = await get(abstract.fileUrl, { access: "public" });
    }

    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json(
        { error: "Failed to retrieve file from storage" },
        { status: 404 },
      );
    }

    const headers = new Headers();
    const contentType =
      result.blob.contentType ||
      (abstract.fileName.endsWith(".pdf")
        ? "application/pdf"
        : abstract.fileName.endsWith(".docx")
          ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          : abstract.fileName.endsWith(".doc")
            ? "application/msword"
            : "application/octet-stream");

    headers.set("Content-Type", contentType);
    // Use RFC 5987 syntax for Unicode filenames
    const encodedFilename = encodeURIComponent(abstract.fileName);
    headers.set(
      "Content-Disposition",
      `inline; filename="${abstract.fileName.replace(/["\\]/g, "")}"; filename*=UTF-8''${encodedFilename}`,
    );
    headers.set("Content-Length", String(result.blob.size));
    headers.set("Cache-Control", "private, no-cache");

    return new Response(result.stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error serving abstract file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
