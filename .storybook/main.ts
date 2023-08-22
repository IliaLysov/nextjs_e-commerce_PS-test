import type { StorybookConfig } from "@storybook/nextjs";
import path from "path"

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: require('sass'),
        }
      }
    }
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"], // This loads images at localhost:6006/next.svg e.t.c.
  async webpackFinal(config, { configType }) {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      }
    }

    if (config?.module?.rules) {
      const imageRule: any = config.module.rules.find((rule: any) => {
        if (typeof rule !== 'string' && rule.test instanceof RegExp) {
          return rule.test.test('.svg')
        }
      })
      if (typeof imageRule !== 'string') {
        imageRule.exclude = /\.svg$/
      }
    
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })
    }

    return config
  },
};
export default config;
