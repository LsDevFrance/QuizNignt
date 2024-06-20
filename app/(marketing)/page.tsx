import HeroSection from "@/components/marketing/hero";
import QuizSectionCards from "@/components/marketing/pricing";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div>Loading...</div>}>
        <QuizSectionCards />
      </Suspense>
    </>
  );
}
