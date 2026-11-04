import type { ReactNode } from "react";
import { site } from "@content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "./ProcessSteps";

type ProcessProps = {
  /** Replaces the default heading, e.g. on service pages. */
  heading?: ReactNode;
  id?: string;
  labelledBy?: string;
};

/** The four-step process band, shared by the home page and service pages. */
export function Process({ heading, id = "process", labelledBy }: ProcessProps) {
  const { process } = site;

  return (
    <section id={id} aria-labelledby={labelledBy} className="border-y border-line bg-raised/80">
      <div className="wrap section-y lg:py-0">
        <ProcessSteps
          steps={process.steps}
          heading={heading ?? <SectionHeading eyebrow={process.eyebrow} title={process.title} intro={process.intro} />}
        />
      </div>
    </section>
  );
}
