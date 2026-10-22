export type EditorialBoardMember = {
  _id: string;
  categoryId: string;
  name: string;
  designation: string;
  affiliation: string;
  email: string;
  sortOrder: number;
  created_at: string;
  updated_at: string;
};

export type EditorialBoardCategory = {
  _id: string;
  title: string;
  sortOrder: number;
  members: EditorialBoardMember[];
  created_at: string;
  updated_at: string;
};
