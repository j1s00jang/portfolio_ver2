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
  /**
   * `slot` (default): fixed aspect-ratio frame.
   * `hug`: full width, height follows image aspect ratio.
   * `intrinsic`: natural file dimensions, box wraps image (no upscale).
   */
  frame?: "slot" | "hug" | "intrinsic";
  /** When set with `frame: "intrinsic"`, scales natural width (e.g. `0.8` = 80%). */
  displayScale?: number;
  /** Grid / slot frame proportion (default `wide`). */
    slotAspect?: "wide" | "banner" | "portrait" | "tall" | "compact" | "square" | "rowFill";
};

/** One screen in a sidebar gallery (`screenGallery` block). */
export type ScreenGalleryItem = {
  label: string;
  /** Optional fixed nav lines — prevents layout shift when labels wrap. */
  navLines?: readonly string[];
  src: string;
  alt: string;
};

/** One page in a flipbook (`flipbook` block). */
export type FlipbookPage = {
  src: string;
  alt: string;
};

/** One flavour in the label + mockup carousel (`flavorCarousel` block). */
export type FlavorCarouselSlide = {
  flavor: string;
  label: CaseStudyInlineImage;
  productMockup: CaseStudyInlineImage;
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
      /** Three images in one row (`sm`+); equal-size cells, stacked on narrow screens. */
      imageTriple: readonly [
        CaseStudyInlineImage,
        CaseStudyInlineImage,
        CaseStudyInlineImage,
      ];
    }
    | {
      /** Four images in one row (`sm`+); equal-size cells, stacked on narrow screens. */
      imageRow4: readonly [
        CaseStudyInlineImage,
        CaseStudyInlineImage,
        CaseStudyInlineImage,
        CaseStudyInlineImage,
      ];
    }
  | {
      /** Two equal cells on row 1; row 2 spans 2:1:1 (four-column grid). */
      imageGrid2_211: readonly [
        CaseStudyInlineImage,
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
    }
  | {
      /** Figma file / board / prototype share URL (rendered as embed iframe). */
      figma: {
        url: string;
        title?: string;
        /** Fixed iframe height (boards). Ignored when `aspectRatio` is set. */
        heightCss?: string;
        /** Match the Figma frame ratio so the prototype fills the embed box. */
        aspectRatio?: string;
        /** Switch embed URL — tab pills render top-right (copy each page’s share link from Figma). */
        tabs?: readonly { label: string; url: string }[];
        /** Prototype scaling (`/proto/` URLs). Default `fit-width`. */
        scaling?:
          | "scale-down"
          | "contain"
          | "min-zoom"
          | "scale-down-width"
          | "fit-width"
          | "free";
        contentScaling?: "fixed" | "responsive";
        deviceFrame?: boolean;
        footer?: boolean;
        hotspotHints?: boolean;
      };
    }
  | {
      /** Label-on-scene + product mockup carousel (centre slide active, neighbours peek at 40% opacity). */
      flavorCarousel: {
        slides: readonly FlavorCarouselSlide[];
      };
    }
  | {
      /** Interactive page-flip viewer for multi-page spreads (e.g. brochure). */
      flipbook: {
        pages: readonly FlipbookPage[];
        title?: string;
      };
    }
  | {
      /** Sidebar nav + preview for a set of UI screens (e.g. existing product audit). */
      screenGallery: {
        screens: readonly ScreenGalleryItem[];
        /** Optional heading in the left column (above tab nav). */
        sidebarTitle?: string;
        /** Optional bullet list in the left column — edit in project data. */
        sidebar?: string[];
        regionLabel?: string;
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
