const copyFilesTree = require("../index");
const testsOperations = require("./services/testsOperations");
const testData = require("./yogev-testData.config.js");

describe("Async Operation", () => {
  const testModule = copyFilesTree.copyFiles;
  describe("Test appropriate number of properties that copied", () => {
    it("Using 'foldersAndFiles' property only", done => {
      testsOperations.countPropsCopied.foldersAndFilesCheck(
        testData.countPropsCopied.foldersAndFiles,
        testModule,
        done
      );
    });

    it("Using 'allFiles' only", done => {
      testsOperations.countPropsCopied.optionsCheck(
        testData.countPropsCopied.allFiles,
        testModule,
        done
      );
    });

    it("Using 'allDirectories' only", done => {
      testsOperations.countPropsCopied.optionsCheck(
        testData.countPropsCopied.allDirectories,
        testModule,
        done
      );
    });

    it("Using both 'allFiles' and 'allDirectories'", done => {
      testsOperations.countPropsCopied.optionsCheck(
        testData.countPropsCopied.allDirsAndFiles,
        testModule,
        done
      );
    });

    it("Test properties to same destination not override - using 'foldersAndFiles' only", done => {
      testsOperations.countPropsCopied.sameDestCheck(
        testData.countPropsCopied.sameDest,
        testModule,
        done
      );
    });
  });
});
describe("Sync Operations", () => {
  const testModule = copyFilesTree.copyFilesSync;
  describe("Test appropriate number of properties that copied", () => {
    it("Using 'foldersAndFiles' property only", done => {
      testsOperations.countPropsCopied.foldersAndFilesCheck(
        testData.countPropsCopied.foldersAndFiles,
        testModule,
        done
      );
    });

    it("Using 'allFiles' only", done => {
      testsOperations.countPropsCopied.optionsCheck(
        testData.countPropsCopied.allFiles,
        testModule,
        done
      );
    });

    it("Using 'allDirectories' only", done => {
      testsOperations.countPropsCopied.optionsCheck(
        testData.countPropsCopied.allDirectories,
        testModule,
        done
      );
    });

    it("Using both 'allFiles' and 'allDirectories'", done => {
      testsOperations.countPropsCopied.optionsCheck(
        testData.countPropsCopied.allDirsAndFiles,
        testModule,
        done
      );
    });

    it("Test non overrides - Items to the same destination not override - using 'foldersAndFiles' only", done => {
      testsOperations.countPropsCopied.sameDestCheck(
        testData.countPropsCopied.sameDest,
        testModule,
        done
      );
    });
  });
});
