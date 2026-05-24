import { BookOpenIcon, CreditCardIcon, UploadCloudIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const site = {
  name: "ER Publications",
  tagline: "Enhanced Research Publications",
  description:
    "UGC-approved, peer-reviewed international publisher for journals, books, and conference proceedings.",
  email: "contact@erpublications.in",
  phone: "+91-00000-00000",
  issn: "XXXX-XXXX",
};

export const navItems: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Editorial Board", href: "/editorial-board" },
  { label: "Processing Charges", href: "/processing-charges" },
  { label: "Paper Submission", href: "/paper-submission" },
  {
    label: "Our Journals",
    href: "/journals",
    children: [
      { label: "Volume 2026 — Issue 1", href: "/journals/2026/issue-1" },
      { label: "Volume 2025 — Archive", href: "/journals/2025" },
      { label: "All Volumes", href: "/journals" },
    ],
  },
  { label: "Indexing", href: "/indexing" },
  { label: "Conferences", href: "/#conferences" },
  { label: "Contact", href: "/contact" },
];

export const slides = [
  {
    title: "Publish Research with Confidence",
    subtitle: "Peer-reviewed · ISSN & ISBN · Indexed platforms",
    description:
      "From manuscript to certificate — ER Publications supports authors across journals, books, and conference proceedings with transparent timelines.",
    image: "/images/Img1.png",
  },
  {
    title: "Journals, Books & Conferences",
    subtitle: "One desk for your scholarly output",
    description:
      "Submit online, track review status, and publish in UGC-aligned channels with editorial guidance at every step.",
    image: "/images/Img2.png",
  },
  {
    title: "Thesis & Dissertation Publishing",
    subtitle: "Proper ISBN · Print & digital options",
    description:
      "Turn your thesis into a citable publication with formatting support and optional print delivery.",
    image: "/images/Img3.png",
  },
];

export const quickCards = [
  {
    title: "Publish With Us",
    description: "Books, theses, and monographs with proper ISBN registration.",
    href: "/publish-with-us",
    accent: "from-violet-600 to-indigo-600",
    icon: BookOpenIcon,
  },
  {
    title: "Submit an Article",
    description: "Upload your manuscript for editorial screening and peer review.",
    href: "/paper-submission",
    accent: "from-indigo-600 to-blue-600",
    icon: UploadCloudIcon,
  },
  {
    title: "Review & Ethics Policy",
    description: "Understand our peer-review workflow and publication ethics.",
    href: "/publication-ethics",
    accent: "from-blue-600 to-cyan-600",
    icon: BookOpenIcon,
  },
  {
    title: "Secure Payment",
    description: "Pay processing charges through our verified payment channel.",
    href: "/payment",
    accent: "from-cyan-600 to-teal-600",
    icon: CreditCardIcon,
  },
];

export const sidebarResources = [
  { label: "Author Guidelines", href: "/downloads/author-guidelines" },
  { label: "Copyright Agreement", href: "/downloads/copyright-form" },
  { label: "Manuscript Template", href: "/downloads/paper-template" },
  { label: "Processing Charges", href: "/processing-charges" },
];

export const sidebarExplore = [
  { label: "Call for Papers", href: "/call-for-papers" },
  { label: "Why ER Publications", href: "/why-er" },
  { label: "Subject Areas", href: "/topics" },
  { label: "Special Issues", href: "/special-issues" },
  { label: "Publication Ethics", href: "/publication-ethics" },
];

export const latestUpdates = [
  {
    title: "2026 author submission window now open",
    date: "15 May 2026",
    excerpt: "Manuscripts across engineering, education, and health sciences are welcome.",
    href: "/updates/2026-submissions",
  },
  {
    title: "New indexing partners added",
    date: "02 Apr 2026",
    excerpt: "Expanded discoverability through additional scholarly databases.",
    href: "/updates/indexing-2026",
  },
  {
    title: "Peer review turnaround improvements",
    date: "18 Mar 2026",
    excerpt: "Average first decision now within 48 hours for eligible submissions.",
    href: "/updates/review-timeline",
  },
  {
    title: "Conference proceedings bundle",
    date: "07 Feb 2026",
    excerpt: "Publish your conference papers with unified ISBN and proceedings format.",
    href: "/updates/conference-bundle",
  },
];

export const strengths = [
  "Dedicated author support desk — online and phone.",
  "Blind peer review with qualified editorial board members.",
  "Clear status updates from submission to acceptance.",
  "Digital certificates; optional print copies on request.",
  "Best contribution recognition per issue.",
  "Quality-first acceptance — no pay-to-publish shortcuts.",
];

export const whyChooseItems = [
  "UGC-aligned and peer-reviewed publication pathways.",
  "ISSN and ISBN centered cataloging for journals and books.",
  "International reach through indexed and referred channels.",
  "End-to-end guidance from submission to certificate delivery.",
];

export const conferenceItems = [
  {
    title: "महर्षि वाल्मीकि : मूल्य मीमांसा...",
    date: "मार्च 2019",
    venue: "महर्षि दयानंद विश्वविद्यालय, रोहतक, हरियाणा",
  },
  {
    title:
      'LIFECON2022", Multidisciplinary Research in Life Sciences, ONE DAY NATIONAL E-CONFERENCE...',
    date: "07 March, 2022",
    venue: "BNN College, Bhiwandi",
  },
  {
    title: "हिंदी भक्ति काव्य धारा में हरियाणा का ...",
    date: "19 फरवरी, 2020",
    venue: "बनवारी लाल जिंदल सूईवाला महाविद्यालय, तोशाम, भिवानी, हरियाणा",
  },
];

export const footerColumns = [
  {
    title: "Quick links",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Editorial board", href: "/editorial-board" },
      { label: "Processing charges", href: "/processing-charges" },
      { label: "Refer a colleague", href: "/refer" },
    ],
  },
  {
    title: "Authors",
    links: [
      { label: "Paper submission", href: "/paper-submission" },
      { label: "Our journals", href: "/journals" },
      { label: "Indexing", href: "/indexing" },
      { label: "Publication ethics", href: "/publication-ethics" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Author guidelines", href: "/downloads/author-guidelines" },
      { label: "Manuscript template", href: "/downloads/paper-template" },
      { label: "Copyright form", href: "/downloads/copyright-form" },
      { label: "Dissertation / thesis", href: "/dissertation" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];
