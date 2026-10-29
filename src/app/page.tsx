import { CtaBand } from "@/src/components/home/CtaBand";
import { HeroSlider } from "@/src/components/home/HeroSlider";
import { HomeScrollEffects } from "@/src/components/home/HomeScrollEffects";
import { LatestNews } from "@/src/components/home/LatestNews";
import { QuickActions } from "@/src/components/home/QuickActions";
import { StrengthSec } from "@/src/components/home/StrengthSec";

export default function Home() {
  return (
    <>
      <HomeScrollEffects />
      <HeroSlider />
      <CtaBand />
      <QuickActions />
      <LatestNews />
      <StrengthSec />
    </>
  );
}
