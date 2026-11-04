import { program, programOverview } from "@/data/program";
import { createProgramPdf } from "@/lib/program-pdf";

// Rebuilt from the same source as the page on every deployment.
export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET() {
  const pdf = await createProgramPdf(program, programOverview);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="ACM23-scientific-programme.pdf"',
      "X-Content-Type-Options": "nosniff",
    },
  });
}
