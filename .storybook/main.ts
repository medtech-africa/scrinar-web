import type { StorybookConfig } from '@storybook/nextjs'
const path = require('path')

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {},
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        src: path.resolve(__dirname, '../src/'),
        '@/': path.resolve(__dirname, '../src/'),
        '@/components': path.resolve(__dirname, '../src/components'),
        '@/lib': path.resolve(__dirname, '../src/lib'),
        '@/constants': path.resolve(__dirname, '../src/constants'),
        '@/hooks': path.resolve(__dirname, '../src/hooks'),
        '@/utils': path.resolve(__dirname, '../src/utils'),
      },
    }
    return config
  },
}
export default config
