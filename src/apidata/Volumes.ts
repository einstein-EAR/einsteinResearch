export type Volume = {
  id: number;
  title: string;
  slug: string;
};

export type VolumeIssue = {
  id: number;
  volumeId: number;
  title: string;
  slug: string;
  dateLabel: string;
};

export type IssueArticle = {
  id: number;
  volumeId: number;
  issueId: number;
  title: string;
  author: string;
  country: string;
  viewUrl?: string;
  downloadUrl?: string;
};

const MONTHS = [
  { month: 1, name: "January", short: "jan" },
  { month: 2, name: "February", short: "feb" },
  { month: 3, name: "March", short: "mar" },
  { month: 4, name: "April", short: "apr" },
  { month: 5, name: "May", short: "may" },
  { month: 6, name: "June", short: "jun" },
  { month: 7, name: "July", short: "jul" },
  { month: 8, name: "August", short: "aug" },
  { month: 9, name: "September", short: "sep" },
  { month: 10, name: "October", short: "oct" },
  { month: 11, name: "November", short: "nov" },
  { month: 12, name: "December", short: "dec" },
] as const;

export const volumes: Volume[] = Array.from({ length: 14 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `Volume ${id}`,
    slug: `volume-${id}`,
  };
});

function buildVolumeIssues(): VolumeIssue[] {
  const issues: VolumeIssue[] = [];
  let issueId = 1;

  for (const volume of volumes) {
    for (const month of MONTHS) {
      issues.push({
        id: issueId,
        volumeId: volume.id,
        title: `Issue ${month.month} ${month.name} 2026`,
        slug: `${month.month}-${month.short}-2026`,
        dateLabel: `${month.month} ${month.name.slice(0, 3)} 2026`,
      });
      issueId += 1;
    }
  }

  return issues;
}

export const volumeIssues = buildVolumeIssues();

export const issueArticles: IssueArticle[] = [
  {
    id: 1,
    volumeId: 1,
    issueId: 1,
    title: "The Impact of Climate Change on Agriculture",
    author: "John Doe",
    country: "United States",
  },
  {
    id: 2,
    volumeId: 1,
    issueId: 1,
    title: "Machine Learning Applications in Healthcare",
    author: "Jane Doe",
    country: "United Kingdom",
  },
  {
    id: 3,
    volumeId: 1,
    issueId: 1,
    title: "Renewable Energy Trends in Developing Nations",
    author: "Jim Doe",
    country: "Canada",
  },
  {
    id: 4,
    volumeId: 1,
    issueId: 2,
    title: "Digital Transformation in Higher Education",
    author: "Jill Doe",
    country: "Australia",
  },
  {
    id: 5,
    volumeId: 1,
    issueId: 2,
    title: "Blockchain for Academic Publishing",
    author: "Jack Doe",
    country: "New Zealand",
  },
  {
    id: 6,
    volumeId: 1,
    issueId: 2,
    title: "Peer Review Models in Open Access Journals",
    author: "Jill Doe",
    country: "France",
  },
  {
    id: 7,
    volumeId: 2,
    issueId: 13,
    title: "Smart Cities and Urban Sustainability",
    author: "Jack Doe",
    country: "Germany",
  },
  {
    id: 8,
    volumeId: 2,
    issueId: 13,
    title: "AI Ethics in Research Publication",
    author: "John Doe",
    country: "United States",
  },
  {
    id: 9,
    volumeId: 2,
    issueId: 13,
    title: "Data Science in Agricultural Research",
    author: "John Doe",
    country: "United States",
  },
  {
    id: 10,
    volumeId: 2,
    issueId: 14,
    title: "Nanotechnology in Medical Diagnostics",
    author: "John Doe",
    country: "United States",
  },
];

export function getVolumeById(volumeId: number): Volume | undefined {
  return volumes.find((volume) => volume.id === volumeId);
}

export function getIssuesByVolumeId(volumeId: number): VolumeIssue[] {
  return volumeIssues.filter((issue) => issue.volumeId === volumeId);
}

export function getIssueBySlug(
  volumeId: number,
  issueSlug: string,
): VolumeIssue | undefined {
  return volumeIssues.find(
    (issue) => issue.volumeId === volumeId && issue.slug === issueSlug,
  );
}

export function getArticlesByIssue(
  volumeId: number,
  issueId: number,
): IssueArticle[] {
  return issueArticles.filter(
    (article) => article.volumeId === volumeId && article.issueId === issueId,
  );
}

/** Legacy exports — keep imports working during migration */
export const volumeIssuesYears = volumeIssues.map(({ id, title }) => ({
  id,
  title,
}));

export const issueData = issueArticles;
