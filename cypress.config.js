constallureWriter=require('@shelex/cypress-allure-plugin/writer');
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    return require('./cypress/plugins/index.js')(on, config)
      // implement node event listeners here
    },
    'video': true,
    'screenshotOnRunFailure':true,
    experimentalStudio:true, 
    baseUrl:'https://www.saucedemo.com',
    env: {
      allureReuseAfterSpec: true,
      api: {
        url: 'https://petstore.swagger.io/v2',
            },
     }
   },

});
