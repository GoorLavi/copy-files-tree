const utils = require("./utils");

removeDestDirs = testData => {
    const pathsToRemove = {};
    for (srcPath in testData) {
      let dest = testData[srcPath].destination;
      pathsToRemove[dest] = true;
    }
    utils.removeDirs(pathsToRemove);
  };

  module.exports = {
    removeDestDirs  
  }