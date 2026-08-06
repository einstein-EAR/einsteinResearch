import PdfViewer from "@/src/components/journals/PdfViewer";

export default async function JournalPdfPage({
  params,
}: {
  params: Promise<{ journalId: string; issueId: string; pdfId: string }>;
}) {
  const { journalId, issueId, pdfId } = await params;

  return (
    <PdfViewer journalId={journalId} issueId={issueId} pdfId={pdfId} />
  );
}
