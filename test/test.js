const index = require("../index");
const chai = require("chai");
const fs = require("fs-extra");

const testData = require("./yogev-testData.config");

const startPoint = () => {
  describe("Start point validation", () => {
    before(() => fs.removeSync(testData.mainDest));
    it("Should delete the whole main destination folder to start testing from scratch", () => {
      chai.expect(fs.existsSync(testData.mainDest)).to.equal(false);
    });
  });
};

const testSubDestinations = () => {
  for (let resultFolder in testData.propsInDests)
    it(`Should return ${
      testData.propsInDests[resultFolder]
    } (number of props in "${resultFolder}" destination folder)`, () => {
      chai
        .expect(fs.readdirSync(`${testData.mainDest}/${resultFolder}`).length)
        .to.equal(testData.propsInDests[resultFolder]);
    });
};

const testMainDestination = () => {
  const mainDestProps = Object.keys(testData.propsInDests).length;
  it(`Should return ${mainDestProps} (number of props in the main dest)`, () => {
    chai
      .expect(fs.readdirSync(testData.mainDest).length)
      .to.equal(mainDestProps);
  });
};

describe("Async Operation", () => {
  startPoint();
  describe("copyFiles() should copy all the selected files and folders into the destenation path", () => {
    before(
      "Operating the copyFiles() function before the results tests",
      index.copyFiles.bind(this, testData.foldersData)
    );

    testSubDestinations();
    testMainDestination();
  });
});

describe("Sync Operation", () => {
  startPoint();
  describe("copyFilesSync() should copy all the selected files and folders into the destenation path", () => {
    before(
      "Operating the copyFilesSync() function before the results tests",
      index.copyFilesSync.bind(this, testData.foldersData)
    );

    testSubDestinations();
    testMainDestination();
  });
});
