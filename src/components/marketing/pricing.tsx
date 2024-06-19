"use client";

export default function QuizSectionCards() {
  return (
    <>
      {/* Pricing */}
      <section
        className="mx-auto max-w-screen-xl p-10 sm:p-12  lg:p-14"
        id="princing"
      >
        {/* Title */}
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Quiz disponible pour tous
          </h2>
          <p className="mt-1 text-muted-foreground">
            Whatever your status, our offers evolve according to your needs.
          </p>
        </div>
      </section>
    </>
  );
}
