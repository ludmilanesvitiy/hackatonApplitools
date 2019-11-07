export abstract class BaseComponent {
  navigateTo(url: string) {
    cy.visit(url);
  }

  isUrlContains(url: string) {
    cy.url().should('to.contain', url);
  }

  clickOn(baseSelector: string, buttonIndex?: number) {
    cy.get(baseSelector).eq(buttonIndex ? buttonIndex : 0).click();
  }

  isPlaceholderEqual(baseSelector: string, placeholderValue: string, inputIndex = 0) {
    cy.get(baseSelector).eq(inputIndex)
      .should('to.have.attr', 'placeholder', placeholderValue);
  }

  isInputValueEqual(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    cy.get(baseSelector).eq(inputIndex).should('to.have.value', expectedTxt);
  }

  clearInputAndSendKeys(baseSelector: string, dataToSend: string, inputIndex = 0) {
    cy.get(baseSelector).eq(inputIndex).clear().type(dataToSend);
  }

  clickEnterOnInput(baseSelector: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).type('{enter}');
  }

  isElementTextContains(baseSelector: string, text: string, elementNumber?: number) {
      cy.get(baseSelector).eq(elementNumber ? elementNumber : 0).then(elem => {
        expect(elem.text().toLowerCase()).to.contain(text.toLowerCase());
      });
  }

  isVisible(baseSelector: string, elementNumber = 0) {
    cy.get(baseSelector).eq(elementNumber)
      .should('be.visible');
  }

  isLengthEqual(baseSelector: string, length: number) {
    cy.get(baseSelector)
      .should('have.length', length);
  }

  waitChart() {
    cy.wait(500);
  }

  isExistVisually(baseSelector: string, testName: string, matchLevel = 'Strict', elementNumber = 0) {
    cy.get(baseSelector).eq(elementNumber)
      .eyesOpen({
        appName: 'Test app',
        matchLevel: matchLevel,
        testName: testName,
        browser: [{
          name: 'chrome',
          browserVersion: 'latest',
          width: 1240,
          height: 800
        }]
      })
      .eyesCheckWindow({
        sizeMode: 'selector',
        selector: baseSelector,
      })
      .eyesClose();
  }
}
