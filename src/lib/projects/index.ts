import type { Project } from "./types";
import { montro } from "./montro";
import { projectTracker } from "./project-tracker";
import { scaffold } from "./scaffold";
import { visualDesign } from "./visual-design";

export type {
  CaseStudyBlock,
  CaseStudyInlineImage,
  CaseStudyStatItem,
  Project,
  ProjectIntroVisual,
} from "./types";
export { montro, projectTracker, scaffold, visualDesign };

/** Homepage / nav order */
export const projects: Project[] = [
  projectTracker,
  scaffold,
  montro,
  visualDesign,
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
