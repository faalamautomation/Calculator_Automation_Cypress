const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    "reporter":"mochawesome",
    "reporterOptions":{"charts": true,"overwrite":false,"html":true,"json":false},
    specPattern:'cypress/integration/Calculator_API_Tests/*.js'
  },
});
