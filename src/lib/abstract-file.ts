export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
export const ACCEPTED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function getFileError(
  file: { name: string; size: number; type: string } | null,
): string | null {
  if (!file) return "Please upload your abstract file.";
  if (file.size > MAX_FILE_SIZE) return "Abstract file must be under 10MB.";

  const lowerName = file.name.toLowerCase();
  const hasAcceptedExtension = ACCEPTED_EXTENSIONS.some((extension) =>
    lowerName.endsWith(extension),
  );

  if (!ACCEPTED_FILE_TYPES.has(file.type) && !hasAcceptedExtension) {
    return "Only PDF, DOC, or DOCX files are accepted.";
  }

  return null;
}
