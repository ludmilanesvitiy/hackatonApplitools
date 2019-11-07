/**
 Login Page UI Elements Test
 Open the login page and write assertions to ensure everything looks OK on that page. i.e. add assertions to ensure all the fields, labels and all other items exist.
 **/

import { LoginPo } from '../support/login.po';
import { AppPo } from '../support/app.po';

const versionLink = Cypress.env('v2') ? `hackathonV2.html` : 'hackathon.html';

describe('Login Page UI Elements Test', () => {
  const page = new LoginPo();

  beforeEach(() => page.navigateTo(versionLink));

  it('displayed: logo', () => {
    page.isVisible(page.logo);
  });

  it('displayed: input fields', () => {
    page.isVisible(page.usernameInput);
    page.isVisible(page.userpassInput);
  });

  it('displayed: buttons, icons', () => {
    page.isVisible(page.loginBtn);
    page.isVisible(page.rememberMeCheckbox);
  });

  it('displayed: social and user icons', () => {
    page.isVisible(page.preIcons, 0);
    page.isVisible(page.preIcons, 1);
    page.isVisible(page.twitterIcon);
    page.isVisible(page.facebookIcon);
    page.isVisible(page.linkedinIcon);
  });

  it('text: header', () => {
    page.isElementTextContains(page.h4, 'Login Form');
  });

  it('text: labels for inputs', () => {
    page.isElementTextContains(page.formLabels, 'Username', 0);
    page.isElementTextContains(page.formLabels, 'Password', 1);
    page.isLengthEqual(page.formLabels, 3);
  });

  it('text: placeholders for inputs', () => {
    page.isInputValueEqual(page.userpassInput, '');
    page.isInputValueEqual(page.usernameInput, '');
    page.isPlaceholderEqual(page.usernameInput, 'Enter your username');
    page.isPlaceholderEqual(page.userpassInput, 'Enter your password');
  });
});

/**
 * Test the following login functionality by entering different values to username and password fields.
 If you don’t enter the username and password and click the login button, it should throw an error
 If you only enter the username and click the login button, it should throw an error
 If you only enter the password and click the login button, it should throw an error
 If you enter both username (any value) and password (any value), it should log you in.
 **/
describe('Data-Driven Test', () => {
  const page = new LoginPo();
  const testString = 'myTest';

  beforeEach(() => page.navigateTo(versionLink));

  it('If you don’t enter the username and password and click the login button, it should throw an error', () => {
    page.clickOn(page.loginBtn);
    page.isVisible(page.errorMessage);
    page.isElementTextContains(page.errorMessage, 'username and password');
  });

  it('If you only enter the username and click the login button, it should throw an error', () => {
    page.clearInputAndSendKeys(page.usernameInput, testString);
    page.clickOn(page.loginBtn);
    page.isVisible(page.errorMessage);
    page.isElementTextContains(page.errorMessage, 'password must be present');
  });

  it('If you only enter the password and click the login button, it should throw an error', () => {
    page.clearInputAndSendKeys(page.userpassInput, testString);
    page.clickOn(page.loginBtn);
    page.isVisible(page.errorMessage);
    page.isElementTextContains(page.errorMessage, 'username must be present');
  });

  it('If you enter both username (any value) and password (any value), it should log you in.', () => {
    page.clearInputAndSendKeys(page.usernameInput, testString);
    page.clearInputAndSendKeys(page.userpassInput, testString);
    page.clickOn(page.loginBtn);
    page.isUrlContains('/hackathonApp');
  });
});

/**
 Once logged in (use any username and password to login), view the Recent Transactions table.
 Your test should click on the "Amounts" header, and verify that the column is in ascending order
 and that each row’s data stayed in tact after the sorting.
 **/

describe('Table Sort Test', () => {
  const login = new LoginPo();
  const page = new AppPo();
  const testString = 'myTest';

  beforeEach(() => {
    page.navigateTo(versionLink);
    page.clearInputAndSendKeys(login.usernameInput, testString);
    page.clearInputAndSendKeys(login.userpassInput, testString);
    page.clickOn(login.loginBtn);
    page.isUrlContains('/hackathonApp');
  });

  it('view the Recent Transactions table, click on the "Amounts" header, and verify that the column is in ascending order' +
    'and verify that each row’s data stayed in tact after the sorting', () => {
    page.checkSorting();
  });
});

/**
 Canvas Chart Test
 Once logged in, click on the "Compare Expenses" button on the toolbar.
 This will display a bar chart comparing the expenses for the year 2017 and 2018.
 Assume the values of the chart are coming from a test data and the test data will not change across versions.
 Validate that the bar chart and representing that data (number of bars and their heights).
 They should remain the same across versions. Then click on the "Show data for next year" button.
 This should add the data for the year 2019. Verify that this data set is added for the year 2019.
 **/

describe('Canvas Chart Test', () => {
  const login = new LoginPo();
  const page = new AppPo();
  const testString = 'myTest';

  beforeEach(() => {
    page.navigateTo(versionLink);
    page.clearInputAndSendKeys(login.usernameInput, testString);
    page.clearInputAndSendKeys(login.userpassInput, testString);
    page.clickOn(login.loginBtn);
    page.isUrlContains('/hackathonApp');
  });

  it('click on the "Compare Expenses" button on the toolbar. Validate that the bar chart and representing that data (number of bars and their heights)', () => {
    page.clickOn(page.compareExpensesBtn);
    page.isVisible(page.chart);
    page.waitChart();
    page.checkCanvasVisually('Validate that the bar chart and representing data', 'Content');
    //Without Applitools it's too hard to do this test. So, in such cases, I'm always using applitools :-)
  });

  it('click on the "Show data for next year" button - this should add the data for the year 2019. Verify this data', () => {
    page.clickOn(page.compareExpensesBtn);
    page.isVisible(page.chart);
    page.clickOn(page.addDataSetBtn);
    page.waitChart();
    page.checkCanvasVisually('Validate bar chart after adding new year data', 'Content');
    //Without Applitools it's too hard to do this test. So, in such cases, I'm always using applitools :-)
  });
});

/**
 Test for the existence of a display ad that’s dynamic and at times might go missing by using this URL:
 https://demo.applitools.com/hackathon.html?showAd=true. Log in by entering any username and password.
 Once logged in, you should see two different "Flash sale" gifs. Make sure both gifs exists.
 **/

describe('Dynamic Content Test', () => {
  const login = new LoginPo();
  const page = new AppPo();
  const testString = 'myTest';

  beforeEach(() => {
    page.navigateTo(`${versionLink}?showAd=true`);
    page.clearInputAndSendKeys(login.usernameInput, testString);
    page.clearInputAndSendKeys(login.userpassInput, testString);
    page.clickOn(login.loginBtn);
    page.isUrlContains('/hackathonApp');
  });

  it('see two different "Flash sale" gifs. Make sure both gifs exists.', () => {
    page.isVisible(page.gifs, 0);
    page.isVisible(page.gifs, 1);
    page.isLengthEqual(page.gifs, 2);
  });
});
