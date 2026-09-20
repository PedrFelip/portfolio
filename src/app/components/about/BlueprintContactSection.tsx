import { memo } from "react";
import {
  type ContactSocialLink,
  SocialLinksGrid,
} from "@/components/about/SocialLinksGrid";
import { SectionBadge } from "@/components/blueprint";

interface BlueprintContactSectionProps {
  title: string;
  description: string;
  links: ContactSocialLink[];
}

export const BlueprintContactSection = memo(function BlueprintContactSection({
  title,
  description,
  links,
}: BlueprintContactSectionProps) {
  return (
    <section id="contact" className="max-w-screen overflow-x-clip">
      <p className="sr-only">{description}</p>

      <div className="mx-auto px-4 md:max-w-4xl">
        <SectionBadge className="border-x border-line px-4 py-3">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            {title}
          </h2>
        </SectionBadge>
      </div>
      <SocialLinksGrid links={links} />
    </section>
  );
});

BlueprintContactSection.displayName = "BlueprintContactSection";
