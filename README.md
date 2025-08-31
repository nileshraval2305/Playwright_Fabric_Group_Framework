**Fabric Group Playwright E2E Test Framework**

This repository contains the End-to-End (E2E) testing framework for Fabric Group applications, built using Playwright. The framework is designed for reliable and fast cross-browser testing of web applications.

**Sample Report**
<img width="1090" height="330" alt="image" src="https://github.com/user-attachments/assets/82c13286-32a5-4825-9546-72a0c16bc961" />

**Prerequisites**
Before you begin, ensure you have the following installed on your machine:

Node.js (LTS version recommended)

npm (Node Package Manager)

**Getting Started**
Follow these steps to set up and run the test framework locally.

**Clone the repository:**

git clone [https://github.com/your-username/Playwright_Fabric_Group_Framework.git](https://github.com/your-username/Playwright_Fabric_Group_Framework.git)


**Navigate into the project directory:**

cd Playwright_Fabric_Group_Framework


**Install project dependencies: This will download all the required Playwright libraries and other packages.**

npm install
npm init playwright@latest
Running Tests
You can run tests from the command line using Playwright's CLI.

**Run All Tests**
To execute all tests defined in the tests/ directory:

npx playwright test

**Test Reports**
After a test run, Playwright automatically generates a detailed HTML report.

To view the report, run the following command in your terminal:

npx playwright show-report

**Framework Structure**
The framework is organized using a Page Object Model (POM) and follows a clear, logical structure.
1. **tests/->** this directory contains all the test specification files. Each file, typically with a .spec.js or .spec.ts extension, describes a set of tests for a specific feature or component of the application

2. **pages/:** This is where you'll find the Page Object Model (POM) classes. Each class represents a specific page or major component of your application, containing locators and methods to interact with elements on that page. This approach makes tests more maintainable and readable.

3. **utils/:** This folder is for shared utility functions, helper methods, and any reusable code that can be used across multiple tests or page objects.

4. **Page Fixtures** : a fixture is a way to share objects or setup code across your tests.

5. **Models :** A model defines the shape of your data in TypeScript. It ensures type safety so you know exactly what properties an object should have.

6. **Testdata :** Test data refers to the inputs, credentials, or other information used during your automated te

7. **Playwright-TestReport** A test report provides a summary of test execution, including which tests passed, failed, or were skipped.

 
