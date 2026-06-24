import {
  getArticlesByIssue,
  getIssueBySlug,
  getVolumeById,
} from "@/src/apidata/Volumes";
import IssueArticles from "@/src/components/volume-issues/issueArticles/issueArticles";
import Link from "next/link";
import { notFound } from "next/navigation";

const ISSUE_INTRO_TEXT = `Papers are being invited from the authors/researchers for publication in the International Journal of All Research Education and Scientific Methods, IJARESM, ISSN: 2455-6211, Vol. 14, Issue 1, January-2026. Manuscripts are being uploaded soon after the Reviewer's decision and submission of copyright form & Processing charges by the Author. Submit your paper for possible publication in IJARESM. IJARESM Journal is indexed in Google Scholar, Thomson Reuters Web of Science Researcherid, Endnotes, Publons and also indexed in UGC Approved List of Journals. IJARESM Journal is a lowest price publication which is published only to support research and suite to every pocket. IJARESM Publication also provides fastest publication service all over the world. impact factor of ugc approved journals. #international journal of science #journal for publication in ugccare #International ugc journals with impact factor #international journal of research science and management #journal for research paper publication #research paper journals #international journal with high impact factor #ugc approved journals india #ugc approved journal call for papers 2026, ugc approved list 2026 journals, #international ugc care journal of research #list of ugc journals to publish research papers #paper publication in ugccare journal list #list of journals for paper publication #paper publication in ugc approved journals, fastest journals in India, fast publication journal, publish paper in 1 day, fast ugc approved journal`;

export default async function VolumeIssueArticlesPage({
  params,
}: {
  params: Promise<{ volumeId: string; issueSlug: string }>;
}) {
  const { volumeId: volumeIdParam, issueSlug } = await params;
  const volumeId = parseInt(volumeIdParam, 10);
  const volumeData = getVolumeById(volumeId);
  const issueData = getIssueBySlug(volumeId, issueSlug);

  if (!volumeData || !issueData || Number.isNaN(volumeId)) {
    notFound();
  }

  const articles = getArticlesByIssue(volumeId, issueData.id);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:py-14 lg:px-8">
      <div className="mb-6 rounded-2xl border border-[#ededed] bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-5 text-white shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2 opacity-70">/</span>
          <Link href="/volumes" className="hover:underline">
            Journal volumes
          </Link>
          <span className="mx-2 opacity-70">/</span>
          <Link href={`/volumes/${volumeData.id}`} className="hover:underline">
            {volumeData.title}
          </Link>
          <span className="mx-2 opacity-70">/</span>
          {issueData.dateLabel}
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{issueData.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-blue-100">
          Published articles for {volumeData.title} · {issueData.dateLabel}
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-[#ededed] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm leading-relaxed text-[#858c93] sm:text-base">
          {ISSUE_INTRO_TEXT}
        </p>
        <div className="mt-6">
          <Link
            href="/paper-submission"
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#024081] to-[#036eb6] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
          >
            Submit your paper
          </Link>
        </div>
      </div>

      <IssueArticles
        articles={articles}
        volumeId={volumeId}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
