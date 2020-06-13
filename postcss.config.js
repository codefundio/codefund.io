const bridgetownEnv = process.env.BRIDGETOWN_ENV || "development";

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
    ...(bridgetownEnv != "development"
      ? [
          require("@fullhuman/postcss-purgecss")({
            content: ["!(_site|node_modules)/**/*.+(html|js|md)", "*.html"],
            whitelistPatternsChildren: [/highlight/],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
          require("cssnano")({ preset: "default" }),
        ]
      : [])
  ]
};