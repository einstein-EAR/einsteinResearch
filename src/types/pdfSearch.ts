export type IssuePdfSearchResult = {
  _id: string;
  title: string;
  author?: string;
  doi?: string;
  pdfUrl: string;
  created_at: string;
  issueId: string;
  issueLabel: string;
  journalId: string;
  journalTitle: string;
};
