import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-session";

export async function GET(request: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });

  const blobResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
    },
  });

  if (!blobResponse.ok) {
    return NextResponse.json({ error: "Failed to fetch file" }, { status: blobResponse.status });
  }

  const contentType = blobResponse.headers.get("Content-Type") ?? "application/octet-stream";
  const body = await blobResponse.arrayBuffer();

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": "inline",
    },
  });
}
