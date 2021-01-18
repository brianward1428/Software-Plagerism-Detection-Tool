module.exports = {
  "stories": [
    "../src/**/**/*.story.mdx",
    "../src/**/**/*.story.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (config) => {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
}