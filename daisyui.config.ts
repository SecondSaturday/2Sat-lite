/**
 * DaisyUI Cupcake Theme Configuration
 * Design tokens extracted from Figma DaisyUI Library 2.0
 * Node: 6705:20358
 */
const config = {
  themes: [
    {
      cupcake: {
        // Base colors
        "base-100": "#f8f2ed",
        "base-200": "#e8e1dc",
        "base-300": "#dad2cd",
        "base-content": "#291334",

        // Primary brand color
        primary: "#a442fe",
        "primary-content": "#f8f3ff",

        // Secondary color
        secondary: "#eeba79",
        "secondary-content": "#722e14",

        // Accent color
        accent: "#80e4e4",
        "accent-content": "#153a37",

        // Neutral
        neutral: "#262629",
        "neutral-content": "#e4e4e7",

        // Semantic colors
        info: "#238de4",
        "info-content": "#e2f1fd",

        success: "#3db17c",
        "success-content": "#d8f9e6",

        warning: "#e2b523",
        "warning-content": "#3d2009",

        error: "#be2448",
        "error-content": "#fae4e6",

        // Border radius
        "--rounded-box": "16px", // Card, modal, dropdown
        "--rounded-btn": "4px", // Button, input
        "--rounded-badge": "1000px", // Badge, tag

        // Animation
        "--animation-btn": "0.25s",
        "--animation-input": "0.2s",

        // Button specific
        "--btn-focus-scale": "0.95",

        // Border
        "--border-btn": "1px",

        // Tab
        "--tab-border": "1px",
        "--tab-radius": "8px",
      },
    },
  ],

  // Extend with custom utilities
  styled: true,
  base: true,
  utils: true,
  logs: false,
  rtl: false,

  // Prefix (optional, leave empty for default)
  prefix: "",

  // Dark theme (optional)
  darkTheme: "dark",
} as const;

export default config;
