import type { Persona } from "@/data/users";
import type { TrainingProgram } from "@/data/training";
import { badgeById } from "@/data/badges";

export type Eligibility = {
  eligible: boolean;
  missingBadges: string[];
  missingPoints: number;
};

export function checkEligibility(persona: Persona | null, program: TrainingProgram): Eligibility {
  if (!persona) return { eligible: false, missingBadges: [], missingPoints: 0 };
  const missingBadges = program.requiredBadges
    .filter((b) => !persona.badges.includes(b))
    .map((b) => badgeById(b)?.name ?? b);
  const missingPoints = Math.max(0, program.requiredPoints - persona.points);
  return {
    eligible: missingBadges.length === 0 && missingPoints === 0,
    missingBadges,
    missingPoints,
  };
}
