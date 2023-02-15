==========================================================================
Project Run Instructions (The project is based on cypress version:12.4.0)
==========================================================================

1. Run this command "git clone https://github.com/falamgirgeek/BigBankTask.git" to clone the repository to your local system.
2. Open the folder in VS Code or just drag it inside the editor.
3. Open the terminal and run this command "npm install" to install relevant dependencies and node modules to the project. There is no need to add any dependencies/modules externally.
4. After completion of the installation hit this command "npx cypress open" to run the tests in head mode.
5. The tests can also be run in the headless mode by simply hitting this command "npx cypress run"
6. Tests reports will be generated along with the tests and can be viewed in the browser by pasting the file path.


=============================================================================
Details About the Project
=============================================================================


1. The testing of the Calculator modal has been divided into three categories
   
    (A) CalculatorAPITests.js 
	(B) CalculatorModalTests.js
	(C) CalculatorSliderTests.js
	
2. Several critical scenarios for testing the calculator modal have been considered and 
   they are easily understandable by the description inside the code blocks. The testing 
   strategy covers both the positive or happy paths and negative/unhappy paths.
   
3. Negative tests are specially designed to check the quality of the application in a way that
   tests should fail.If there is unacceptable input given by the user for example negative 
   amount value or month below zero and etc.

4. All tests should generate a html report separtely for each of the test files under integration/Calculator_API_Tests.
   
5. Reports can be visible in the browser by copying the path of the html file from mochawesome-report/mochawesome_001.html under the project and pasting in the browser URL.
   
6. Screenshots and videos of the tests should be generated in the specified folders under the project.


=================================
Questions and Feedback
=================================

If you have any questions regarding the project or you face any trouble in running the project. Please feel free to reach me out by this email 
address here fahadalamgir@outlook.com



Thank you and have a nice time !

Enjoy !!!!