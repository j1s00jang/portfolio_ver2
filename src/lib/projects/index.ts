import type { Project } from "./types";
import { montro } from "./montro";
import { projectPulse } from "./project-pulse";
import { scaffold } from "./scaffold";
import { visualDesign } from "./visual-design";

export type {
  CaseStudyBlock,
  CaseStudyInlineImage,
  CaseStudyStatItem,
  Project,
  ProjectIntroVisual,
} from "./types";
export { montro, projectPulse, scaffold, visualDesign };

/** Homepage / nav order */
export const projects: Project[] = [
  projectPulse,
  scaffold,
  montro,
  visualDesign,
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
