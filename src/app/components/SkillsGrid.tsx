interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillsGridProps {
  skills: SkillCategory[];
}

export const SkillsGrid = ({ skills }: SkillsGridProps) => {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      {skills.map((skillGroup) => (
        <div key={skillGroup.category} className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            {skillGroup.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillGroup.items.map((skill) => (
              <span
                key={skill}
                className="rounded border border-border bg-muted px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
