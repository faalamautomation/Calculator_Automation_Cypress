

======Project Run Instructions (The project is based on cypress version:12.4.0)=======


Run this command "git clone https://github.com/fahadalamgir/Calculator_Automation_Cypress.git" to clone the repository to your local system.
Open the folder in VS Code or just drag it inside the editor.
Open the terminal and run this command "npm install" to install relevant dependencies and node modules to the project. There is no need to add any dependencies/modules externally.
After completion of the installation hit this command "npx cypress open" to run the tests in head mode.
The tests can also be run in the headless mode by simply hitting this command "npx cypress run"
Tests reports will be generated along with the tests and can be viewed in the browser by pasting the file path.

======================= Details About the Project =======================


The testing of the Calculator modal has been divided into three categories

(A) CalculatorAPITests.js
(B) CalculatorModalTests.js
(C) CalculatorSliderTests.js



Several critical scenarios for testing the calculator modal have been considered and they are easily understandable by the description inside the code blocks. The testing strategy covers both the positive or happy paths and negative/unhappy paths.

Negative tests are specially designed to check the quality of the application in a way that tests should fail.If there is unacceptable input given by the user for example negative amount value or month below zero and etc.

All tests should generate a html report separtely for each of the test files under integration/Calculator_API_Tests.

Reports can be visible in the browser by copying the path of the html file from mochawesome-report/mochawesome_001.html under the project and pasting in the browser URL.

Screenshots and videos of the tests should be generated in the specified folders under the project.

Thank you and have a nice time !

Enjoy !!!!
