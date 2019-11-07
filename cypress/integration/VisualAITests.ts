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
    page.isExistVisually(page.logo, 'displayed: logo');
  });

  it('displayed: input fields', () => {
    page.isExistVisually(page.usernameInput, 'displayed: name input');
    page.isExistVisually(page.userpassInput, 'displayed: pass input');
  });

  it('displayed: buttons, icons', () => {
    page.isExistVisually(page.loginBtn, 'displayed: login button');
    page.isExistVisually(page.rememberMeCheckbox, 'displayed: remember checkbox');
  });

  it('displayed: the whole page app', () => {
    page.isExistVisually(page.wholePageSelector, 'displayed: the whole page app');
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
  const app = new AppPo();
  const testString = 'myTest';

  beforeEach(() => page.navigateTo(versionLink));

  it('If you don’t enter the username and password and click the login button, it should throw an error', () => {
    page.clickOn(page.loginBtn);
    page.isExistVisually(page.errorMessage, 'displayed: error message about username and password');
  });

  it('If you only enter the username and click the login button, it should throw an error', () => {
    page.clearInputAndSendKeys(page.usernameInput, testString);
    page.clickOn(page.loginBtn);
    page.isExistVisually(page.errorMessage, 'displayed: error message about password');
  });

  it('If you only enter the password and click the login button, it should throw an error', () => {
    page.clearInputAndSendKeys(page.userpassInput, testString);
    page.clickOn(page.loginBtn);
    page.isExistVisually(page.errorMessage, 'displayed: error message about username');
  });

  it('If you enter both username (any value) and password (any value), it should log you in.', () => {
    page.clearInputAndSendKeys(page.usernameInput, testString);
    page.clearInputAndSendKeys(page.userpassInput, testString);
    page.clickOn(page.loginBtn);
    page.isExistVisually(app.pageHeader, 'displayed: new app page header');
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
    page.isExistVisually(page.transactionsTable, 'displayed: Recent Transactions table', 'Layout');
    page.clickOn(page.amountHeaderLink);
    page.isExistVisually(page.transactionsTable, 'table: the column is in ascending order and each row stayed in tact', 'Layout');
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
  });

  it('click on the "Show data for next year" button - this should add the data for the year 2019. Verify this data', () => {
    page.clickOn(page.compareExpensesBtn);
    page.isVisible(page.chart);
    page.clickOn(page.addDataSetBtn);
    page.waitChart();
    page.checkCanvasVisually('Validate bar chart after adding new year data', 'Content');
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
    page.isExistVisually(page.gifs, 'displayed: 1t "Flash sale" gif', 'Layout', 0);
    page.isExistVisually(page.gifs, 'displayed: 2d "Flash sale" gif', 'Layout', 1);
    page.isLengthEqual(page.gifs, 2);
  });
});
