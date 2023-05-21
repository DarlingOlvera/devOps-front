module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform:{
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(js|mjs)$':'babel-jest'
  },
  transformIgnorePatterns:[
    '/node_modules/(?!(vuetify|axios)/)'
  ],
}
