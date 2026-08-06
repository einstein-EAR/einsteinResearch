export type IssuePdf = {
  _id: string;
  title: string;
  author?: string;
  doi?: string;
  pdfUrl: string;
  created_at: string;
};

export type JournalIssue = {
  _id: string;
  journalId: string;
  issueLabel: string;
  title: string;
  description: string;
  pdfs: IssuePdf[];
  created_at: string;
  updated_at: string;
};
