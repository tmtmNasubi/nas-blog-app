import oxlint from "eslint-plugin-oxlint";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(...oxlint.configs["flat/recommended"], {
  files: ["**/*.vue"],
  rules: {
    "vue/block-order": ["error", { order: ["script", "template", "style"] }],
    "vue/no-empty-component-block": "error",
  },
});
