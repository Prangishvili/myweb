import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { workProcessDocs } from "@/data/workProcess";

export function generateStaticParams() {
  return workProcessDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work-process/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = workProcessDocs.find((d) => d.slug === slug);
  if (!doc) return {};

  return {
    title: `${doc.title}, Oto Prangi`,
    description: doc.description,
    robots: { index: false, follow: false },
    openGraph: { title: `${doc.title}, Oto Prangi`, description: doc.description, type: "website" },
    twitter: { card: "summary", title: `${doc.title}, Oto Prangi`, description: doc.description },
  };
}

export default async function WorkProcessDocPage({ params }: PageProps<"/work-process/[slug]">) {
  const { slug } = await params;
  const doc = workProcessDocs.find((d) => d.slug === slug);
  if (!doc) notFound();

  const files = doc.files ?? [{ label: doc.title, file: doc.file }];

  return (
    <div>
      <Header />
      <PageTransition>
        <main className="flex-1 px-[0.7rem] pt-28 pb-20 sm:pt-32">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-serif text-[24px] font-semibold sm:text-[36px]">{doc.title}</h1>
            {files.length === 1 && (
              <a
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-semibold uppercase hover:opacity-60"
              >
                Open in new tab
              </a>
            )}
          </div>
          <div className={files.length > 1 ? "grid grid-cols-1 gap-8 lg:grid-cols-2" : undefined}>
            {files.map((f) => (
              <div key={f.file}>
                {files.length > 1 && (
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-sans text-sm font-semibold uppercase">{f.label}</h2>
                    <a
                      href={f.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm font-semibold uppercase hover:opacity-60"
                    >
                      Open in new tab
                    </a>
                  </div>
                )}
                <iframe src={f.file} title={f.label} className="h-[85vh] w-full rounded-lg border border-black/10" />
              </div>
            ))}
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
