import { BaseComponent } from './base.component';

export class AppPo extends BaseComponent {
  amountHeaderLink = '#amount';
  amountColumn = 'tbody td.text-right';
  descriptionLines = '.cell-with-media';
  compareExpensesBtn = '#showExpensesChart';
  chart = 'canvas';
  gifs = '.balance img';
  addDataSetBtn = '#addDataset';
  pageHeader = '.top-bar';
  transactionsTable = '#transactionsTable';

  checkSorting() {
    let amountArray = [];
    let amountArrayOrigin = [];
    let textArray = [];

    cy.get(this.amountColumn).each((line, index, $list) => {
      amountArray.push(Number((line.text().split(' USD')[0]).replace(/[ ,]/g, ""))); //take origin number data and save to Array
      amountArrayOrigin.push(Number((line.text().split(' USD')[0]).replace(/[ ,]/g, ""))); //take origin number data and save to Array
      textArray.push(line.parent().find(this.descriptionLines).text()); //take origin description data and save to Array

      if (index === $list.length - 1) { //on the last step of saving the data need to make actions
        amountArray.sort(function (a, b) {
          return a - b
        });
        cy.get(this.amountHeaderLink).click(); //click on the "Amounts" header
        cy.get(this.amountColumn).each((line, index) => {
          expect(line.text().replace(/[ ,]/g, "")).to.contain(amountArray[index]); //and verify that the column is in ascending order
          const previousIndex = amountArrayOrigin.indexOf(amountArray[index]);
          expect(textArray[previousIndex]).to.contain(line.parent().find(this.descriptionLines).text()); //and verify that each row’s description stayed in tact after the sorting
        });
      }
    });
  }

  checkCanvasVisually(testName: string, matchLevel = 'Strict') {
    cy.get(this.chart).eyesOpen({
      appName: 'Default chart - test app',
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
        selector: this.chart,
      })
      .eyesClose();
  }
}
