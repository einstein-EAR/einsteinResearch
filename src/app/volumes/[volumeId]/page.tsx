import {
  getIssuesByVolumeId,
  getVolumeById,
} from "@/src/apidata/Volumes";
import IssueByYears from "@/src/components/volume-issues/issueyear/issueByYears";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function VolumeIssuesPage({
  params,
}: {
  params: Promise<{ volumeId: string }>;
}) {
  const { volumeId: volumeIdParam } = await params;
  const volumeId = parseInt(volumeIdParam, 10);
  const volumeData = getVolumeById(volumeId);
console.log("volumeId", volumeId);
console.log("volumeIdParam", volumeIdParam);
  if (!volumeData || Number.isNaN(volumeId)) {
    notFound();
  }

  const issues = getIssuesByVolumeId(volumeId);

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
          {volumeData.title}
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          Issues for {volumeData.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-blue-100">
          Browse monthly issues published under this volume and open articles for each
          edition.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-[#ededed] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm leading-relaxed text-[#858c93] sm:text-base">
          Publish your research paper, review paper, case study, books, thesis online or
          offline like a book into International Peer Reviewed Journals and Refereed
          Journals. Convert thesis into a printed book, Publish thesis like a book,
          Self-publish thesis as a book, Publish research thesis online, Turn your thesis
          into a book, publish your dissertation online, dissertation publication, Publish
          thesis both online and offline, Online and offline thesis book publishing,
          Book-style thesis publication services, Publish thesis in digital and print
          formats, Thesis publication services, Publish thesis online, Academic thesis
          publication, Research thesis publishing platforms, Fast paper publication, How
          to publish a thesis, International paper publication, Publish PhD thesis online,
          Publish paper in academic journals, dissertation publication, publish your paper
          online and print in international journals.
        </p>
      </div>

      <IssueByYears
        issueData={issues}
        volumeId={volumeData.id}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
