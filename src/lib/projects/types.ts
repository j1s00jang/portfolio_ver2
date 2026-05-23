/** Stat cell: animated number + optional `suffix` on the first line; optional `headlineBottom` on second (same display scale). */
export type CaseStudyStatItem = {
  value: number;
  label: string;
  /**
   * Appended to the animated number on the **first** line.
   * If `headlineBottom` is set, defaults to `""`. Otherwise defaults to `"%"` (user-research style).
   */
  suffix?: string;
  /** Second line of the large headline (e.g. `rd place`, `minutes`, `faster`). */
  headlineBottom?: string;
};

/** Bitmap embedded in prose (single figure, half of `imagePair`, or cell in `imageQuad`). */
export type CaseStudyInlineImage = {
  src: string;
  alt: string;
  /** Crop anchor when the slot uses `object-cover` (default `"center"`). */
  objectPosition?:
    | "center"
    | "top"
    | "bottom"
    | "top-left";
  /** Zoom / pan fullscreen viewer on click (`react-zoom-pan-pinch`). */
  lightbox?: boolean;
  /** `contain` shows the whole image centred in the slot; `cover` fills and crops (default). */
  fit?: "cover" | "contain";
};

/** One paragraph/run of text, a bullet list, or a row of animated stats. */
export type CaseStudyBlock =
  | string
  | { ul: string[] }
  | { stats: CaseStudyStatItem[]; /** Paragraph rendered tight under the stats row. */ afterStats?: string }
  | { vspace: true } /** Extra vertical gap between surrounding blocks (e.g. before a subheading). */
  | { highlight: string } /** Single phrase with teal/green marquee-style background */
  | {
      /** Full-width figure inside section column (paths from site root). */
      image: CaseStudyInlineImage;
    }
  | {
      /** Two images side by side (`sm`+); stacked on narrow screens. */
      imagePair: readonly [CaseStudyInlineImage, CaseStudyInlineImage];
    }
  | {
      /** Four images in a 2×2 grid (two columns on all breakpoints). */
      imageQuad: readonly [
        CaseStudyInlineImage,
        CaseStudyInlineImage,
        CaseStudyInlineImage,
        CaseStudyInlineImage,
      ];
    }
  | {
      /** Inline MP4 (and similar) demos; paths from site root (`public/`). */
      video: {
        src: string;
        /** Accessible name (defaults to neutral label). */
        title?: string;
        poster?: string;
        /** Width as % of the figure wrapper (others default to 90). */
        widthPct?: number;
        /** Full CSS `max-height` value when this clip shouldn’t match the default cap. */
        maxHeightCss?: string;
      };
    };

/** Image in the `#intro-visuals` grid above Overview (`public/` paths from site root). */
export type ProjectIntroVisual = {
  /** e.g. `/work/scaffold/intro-1.jpg` for `public/work/scaffold/intro-1.jpg` */
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  /**
   * Up to four images replacing “Visual 1–4”. Index 0 = top-left, then reading order.
   * Shorter arrays leave remaining slots as placeholders until you add more.
   */
  introVisuals?: readonly ProjectIntroVisual[];
  overview?: string[];
  /** Content keyed by section `id` from `scaffoldSections` (e.g. `opportunities`, `user-research`). Omit a key to show the placeholder. */
  caseStudySections?: Partial<Record<string, CaseStudyBlock[]>>;
  tags?: string[];
};
