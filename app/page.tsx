import { AboutAndWhy } from "@/components/home/AboutAndWhy";
import { Conferences } from "@/components/home/Conferences";
import { CtaBand } from "@/components/home/CtaBand";
import { EditorNote } from "@/components/home/EditorNote";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { QuickActions } from "@/components/home/QuickActions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <HeroSlider />
      <CtaBand />
      <QuickActions />

      <div className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-10">
          <main className="min-w-0 space-y-8">
            <AboutAndWhy />
            <Conferences />
            <EditorNote />
          </main>
          <HomeSidebar />
        </div>
      </div>

      <Footer />
    </div>
  );
}
