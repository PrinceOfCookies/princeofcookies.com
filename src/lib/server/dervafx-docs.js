import { commonHelpers } from "$lib/dervafx-wiki";

const GITHUB_TREE_URL =
  "https://api.github.com/repos/PrinceOfCookies/DervaFX-Public/git/trees/master?recursive=1";
const RAW_BASE =
  "https://raw.githubusercontent.com/PrinceOfCookies/DervaFX-Public/master/";
const SOURCE_PREFIX = "src/main/java/com/princeofcookies/dervafx/";
const CACHE_TTL_MS = 5 * 60 * 1000;

let cachedDocs = null;
let cachedAt = 0;

const docOverrides = {
  DervaFX: {
    kind: "Factory",
    summary: "Factory and theme entry point.",
    description:
      "DervaFX is the main entry point for constructing wrappers and handling theme selection/application.",
    notes: [
      "Use this as the normal factory surface instead of constructing wrappers directly.",
      "Theme changes are scene-driven, not application-wide magic outside the tracked scenes.",
    ],
  },
  DervaElement: {
    kind: "Base Type",
    summary: "Base class for chainable UI elements.",
    description:
      "DervaElement<T> is the shared base wrapper used by most of the public surface. It exposes common layout, sizing, visibility, and styling helpers.",
    notes: [
      "Each element wraps a normal JavaFX node rather than replacing JavaFX with a custom rendering engine.",
      "getNode() returns the wrapper/root node used for layout and attachment.",
    ],
  },
  DervaRoot: {
    kind: "Container",
    summary: "Root overlay/container element backed by AnchorPane.",
    description:
      "DervaRoot is the normal top-level host for DervaFX content. Add windows or layouts to it, then attach its node to your JavaFX scene graph.",
    notes: [
      "The common pattern is DervaFX.root().anchorFill() inside an AnchorPane host.",
      "This is the main surface for stacking windows and content wrappers.",
    ],
  },
  DervaPanel: {
    kind: "Container",
    summary: "Simple vertical panel backed by VBox.",
  },
  DervaVBox: {
    kind: "Layout",
    summary: "Vertical layout wrapper backed by VBox.",
  },
  DervaHBox: {
    kind: "Layout",
    summary: "Horizontal layout wrapper backed by HBox.",
  },
  DervaGrid: {
    kind: "Layout",
    summary: "Grid layout wrapper backed by GridPane.",
    description:
      "DervaGrid is the thin GridPane-based layout wrapper for two-column settings panels, form-like rows, and other structured layouts.",
    notes: [
      "Use DervaFX.grid() for practical row and column placement without leaving the wrapper API.",
      "DervaGrid is meant to stay small and JavaFX-native rather than becoming a custom layout framework.",
    ],
    methods: [
      "add(DervaElement<?> child, int column, int row) : DervaGrid",
      "add(DervaElement<?> child, int column, int row, int columnSpan, int rowSpan) : DervaGrid",
      "remove(DervaElement<?> child) : DervaGrid",
      "clear() : DervaGrid",
      "hgap(double value) : DervaGrid",
      "vgap(double value) : DervaGrid",
      "debugGrid(boolean value) : DervaGrid",
      "spacing(double value) : DervaGrid",
      "padding(Insets padding) : DervaGrid",
      "padding(double value) : DervaGrid",
      "alignment(Pos alignment) : DervaGrid",
    ],
  },
  DervaDock: {
    kind: "Layout",
    summary: "Dock layout wrapper with Derma-style child docking.",
    description:
      "DervaDock is a Pane-based layout wrapper that positions children using Derma-style docking such as top, left, right, bottom, and fill.",
    notes: [
      "Use child methods like dockTop(), dockFill(), and dockMargin(...) before adding elements to the dock.",
      "This is the main wrapper surface for a more VGUI-like layout style.",
    ],
  },
  DervaPropertySheet: {
    kind: "Layout",
    summary: "Tabbed property-sheet wrapper backed by TabPane.",
    description:
      "DervaPropertySheet provides a simple tabbed content surface that leans toward the classic Derma property-sheet feel.",
    notes: [
      "Use addPage(...) to attach wrapped content as separate tabs.",
      "The Derma stylesheet gives this a more tool-like tab look than the default dark theme.",
    ],
  },
  DervaScrollPanel: {
    kind: "Layout",
    summary: "Scrollable vertical content wrapper backed by ScrollPane.",
    description:
      "DervaScrollPanel provides a Derma-style scrollable container for stacked content such as inspector sections, long settings lists, and category groups.",
    notes: [
      "Use add(...) to append wrapped content into the internal vertical stack.",
      "This is one of the main missing Derma/VGUI primitives for real tool UIs.",
    ],
  },
  DervaWindow: {
    kind: "Window",
    summary: "Floating window wrapper with title bar, close button, and drag support.",
    notes: [
      "DervaWindow moves its wrapper root rather than the internal VBox.",
      "This is one of the main public pieces that gives the library its Derma-inspired feel.",
    ],
  },
  DervaLabel: {
    kind: "Control",
    summary: "Thin wrapper around JavaFX Label.",
  },
  DervaButton: {
    kind: "Control",
    summary: "Thin wrapper around JavaFX Button.",
  },
  DervaTextField: {
    kind: "Control",
    summary: "Thin wrapper around JavaFX TextField.",
  },
  DervaTextArea: {
    kind: "Control",
    summary: "Thin wrapper around JavaFX TextArea.",
  },
  DervaCheckBox: {
    kind: "Control",
    summary: "Thin wrapper around JavaFX CheckBox.",
  },
  DervaComboBox: {
    kind: "Control",
    summary: "Thin wrapper around JavaFX ComboBox<String>.",
  },
  DervaTheme: {
    kind: "Theme",
    summary: "Theme descriptor for stylesheet-based scene theming.",
    notes: [
      "The current built-in stylesheet is /com/princeofcookies/dervafx/dervafx-dark.css.",
      "DervaTheme.derma() exposes the Derma-oriented stylesheet /com/princeofcookies/dervafx/dervafx-derma.css.",
      "If the configured stylesheet resource cannot be found, DervaFX throws an IllegalStateException.",
    ],
  },
  DervaThemeManager: {
    kind: "Theme",
    summary: "Scene tracking helper for stylesheet reapplication.",
  },
};

function toSlug(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[<>]/g, "")
    .toLowerCase();
}

function inferKind(name) {
  if (docOverrides[name]?.kind) return docOverrides[name].kind;
  if (name === "DervaFX") return "Factory";
  if (name === "DervaElement") return "Base Type";
  if (name.endsWith("Theme") || name.endsWith("ThemeManager")) return "Theme";
  if (name.endsWith("Window")) return "Window";
  if (name.endsWith("Panel") || name.endsWith("Root")) return "Container";
  if (name.endsWith("VBox") || name.endsWith("HBox") || name.endsWith("Grid")) return "Layout";
  return "Control";
}

function inferSummary(name, kind) {
  if (docOverrides[name]?.summary) return docOverrides[name].summary;
  if (kind === "Control") return `Public ${name} control wrapper.`;
  if (kind === "Layout") return `Public ${name} layout wrapper.`;
  if (kind === "Container") return `Public ${name} container wrapper.`;
  if (kind === "Theme") return `Public ${name} theming surface.`;
  return `Public ${name} API surface.`;
}

function inferDescription(name, kind) {
  if (docOverrides[name]?.description) return docOverrides[name].description;
  if (kind === "Control") {
    return `${name} is part of the current public DervaFX control surface and is generated directly from the public Java source.`;
  }
  if (kind === "Layout" || kind === "Container") {
    return `${name} is part of the current public DervaFX layout/container surface and is generated directly from the public Java source.`;
  }
  if (kind === "Theme") {
    return `${name} is part of the current public theming surface and is generated directly from the public Java source.`;
  }
  return `${name} is part of the current public DervaFX API surface and is generated directly from the public Java source.`;
}

function methodSignatureFromMatch(returnType, name, params) {
  const compactReturnType = returnType.replace(/\s+/g, " ").trim();
  const compactParams = params.replace(/\s+/g, " ").trim();
  return `${name}(${compactParams})${compactReturnType ? ` : ${compactReturnType}` : ""}`;
}

function parseMethods(source, className) {
  const methods = [];
  const regex =
    /public\s+(?:static\s+)?(?:final\s+)?(?:synchronized\s+)?(?:<[^>]+>\s+)?([\w<>\[\],.? ]+)\s+(\w+)\s*\(([^)]*)\)/g;

  for (const match of source.matchAll(regex)) {
    const [, returnType, methodName, params] = match;
    if (methodName === className) continue;
    methods.push(methodSignatureFromMatch(returnType, methodName, params));
  }

  return Array.from(new Set(methods));
}

function parseClassName(source) {
  const match = source.match(/public\s+(?:abstract\s+)?class\s+(\w+)/);
  return match?.[1] ?? null;
}

function parseExtendsName(source) {
  const match = source.match(/public\s+(?:abstract\s+)?class\s+\w+\s+extends\s+([\w<>]+)/);
  return match?.[1] ?? null;
}

function buildGroups(componentDocsBySlug) {
  const slugs = Object.keys(componentDocsBySlug);
  const core = [];
  const containers = [];
  const controls = [];
  const themes = [];

  for (const slug of slugs) {
    const doc = componentDocsBySlug[slug];
    if (doc.kind === "Factory" || doc.kind === "Base Type") {
      core.push(slug);
    } else if (doc.kind === "Container" || doc.kind === "Layout" || doc.kind === "Window") {
      containers.push(slug);
    } else if (doc.kind === "Theme") {
      themes.push(slug);
    } else {
      controls.push(slug);
    }
  }

  return [
    { title: "Core", items: core },
    { title: "Containers and Layouts", items: containers },
    { title: "Controls", items: controls },
    { title: "Themes", items: themes },
  ].filter((group) => group.items.length > 0);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "princeofcookies-portfolio",
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "princeofcookies-portfolio",
      Accept: "text/plain",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

async function buildComponentDocs() {
  const tree = await fetchJson(GITHUB_TREE_URL);
  const javaFiles = tree.tree
    .filter(
      (entry) =>
        entry.type === "blob" &&
        entry.path.startsWith(SOURCE_PREFIX) &&
        entry.path.endsWith(".java") &&
        !entry.path.includes("/demo/")
    )
    .sort((a, b) => a.path.localeCompare(b.path));

  const sources = await Promise.all(
    javaFiles.map(async (entry) => ({
      path: entry.path,
      source: await fetchText(`${RAW_BASE}${entry.path}`),
    }))
  );

  const docs = sources
    .map(({ path, source }) => {
      const className = parseClassName(source);
      if (!className) return null;

      const kind = inferKind(className);
      const methods = parseMethods(source, className);
      const extendsName = parseExtendsName(source);

      return {
        slug: toSlug(className),
        title: className === "DervaElement" ? "DervaElement<T>" : className,
        className,
        kind,
        summary: inferSummary(className, kind),
        description: inferDescription(className, kind),
        methods: docOverrides[className]?.methods ?? methods,
        inheritedHelpers:
          className !== "DervaElement" && extendsName?.startsWith("DervaElement")
            ? commonHelpers
            : [],
        notes: docOverrides[className]?.notes ?? [],
        sourcePath: path,
      };
    })
    .filter(Boolean);

  if (!docs.some((doc) => doc.className === "DervaGrid")) {
    docs.push({
      slug: toSlug("DervaGrid"),
      title: "DervaGrid",
      className: "DervaGrid",
      kind: "Layout",
      summary: inferSummary("DervaGrid", "Layout"),
      description: inferDescription("DervaGrid", "Layout"),
      methods: docOverrides.DervaGrid.methods,
      inheritedHelpers: commonHelpers,
      notes: docOverrides.DervaGrid.notes,
      sourcePath: "src/main/java/com/princeofcookies/dervafx/DervaGrid.java",
    });
  }

  const componentDocsBySlug = Object.fromEntries(docs.map((doc) => [doc.slug, doc]));
  const componentGroups = buildGroups(componentDocsBySlug);

  const wikiGroups = [
    {
      title: "Overview",
      items: [
        {
          href: "/DervaFX",
          title: "Home",
          summary: "Main wiki page with categories, screenshots, and project overview.",
        },
        {
          href: "/DervaFX/current-status",
          title: "Current Status",
          summary: "What exists now, what is missing, and the current goals.",
        },
      ],
    },
    {
      title: "Getting Started",
      items: [
        {
          href: "/DervaFX/installation-and-build",
          title: "Installation and Build",
          summary: "Requirements, Maven coordinates, build command, and demo run command.",
        },
        {
          href: "/DervaFX/quick-start",
          title: "Quick Start",
          summary: "Minimal JavaFX app setup with DervaRoot, DervaWindow, and theme application.",
        },
        {
          href: "/DervaFX/core-concepts",
          title: "Core Concepts",
          summary: "Wrapper model, shared helpers, and root vs content node behavior.",
        },
        {
          href: "/DervaFX/theming",
          title: "Theming",
          summary: "Built-in stylesheet handling, scene theme application, and custom theme resources.",
        },
      ],
    },
    {
      title: "Components",
      items: componentGroups.flatMap((group) =>
        group.items.map((slug) => {
          const doc = componentDocsBySlug[slug];
          return {
            href: `/DervaFX/components/${doc.slug}`,
            title: doc.title,
            summary: doc.summary,
          };
        })
      ),
    },
  ];

  return {
    componentDocs: docs,
    componentDocsBySlug,
    componentGroups,
    currentComponents: docs.map((doc) => doc.className),
    wikiGroups,
  };
}

export async function getDervaFXDocs() {
  if (cachedDocs && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedDocs;
  }

  const docs = await buildComponentDocs();
  cachedDocs = docs;
  cachedAt = Date.now();
  return docs;
}
