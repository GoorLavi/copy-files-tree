const fs = require("fs-extra");
const chai = require("chai");
const services = require("../auxiliary/services");

const foldersAndFilesCheck = async (testData, testModule, done) => {
  services.removeDestDirs(testData);
  const error = await testModule(testData);
  if (error) return done(error);

  let currRequest, existCountProps, mightBeCount;
  for (srcPath in testData) {
    currRequest = testData[srcPath];
    if (!currRequest.foldersAndFiles || currRequest.options)
      return done(new Error(["This test require foldersAndFiles only"]));
    existCountProps = fs.readdirSync(currRequest.destination).length;
    mightBeCount = currRequest.foldersAndFiles.length;
    chai.expect(existCountProps).to.equal(mightBeCount);
  }
  return done();
};

//In case that options property structure is changed need to modify this function
const optionsCheck = async (testData, testModule, done) => {
  services.removeDestDirs(testData);
  const error = await testModule(testData);
  if (error) return done(error);

  let currRequest, existCountProps, mightBeCount;
  for (srcPath in testData) {
    currRequest = testData[srcPath];
    if (!currRequest.options || currRequest.foldersAndFiles)
      return done(new Error(["This test require only options"]));

    existCountProps = fs.readdirSync(currRequest.destination).length;
    const dirContent = fs.readdirSync(srcPath);
    let filteredItems;
    //In case that options property structure is changed need to modify this segment
    if (currRequest.options.allFiles && currRequest.options.allDirectories)
      filteredItems = dirContent;
    else
      filteredItems = dirContent.filter(item =>
        currRequest.options.allFiles
          ? !fs.statSync(`${srcPath}/${item}`).isDirectory()
          : fs.statSync(`${srcPath}/${item}`).isDirectory()
      );
    mightBeCount = filteredItems.length;
    chai.expect(existCountProps).to.equal(mightBeCount);
  }
  return done();
};

const sameDestCheck = async (testData, testModule, done) => {
  services.removeDestDirs(testData);
  const error = await testModule(testData);
  if (error) return done(error);

  let destPath,
    currRequest,
    allItems = [];
  for (srcPath in testData) {
    currRequest = testData[srcPath];
    if (!destPath) destPath = currRequest.destination;
    else if (destPath !== currRequest.destination) {
      return done(
        new Error(["This test requires same destinations at the recieved data"])
      );
    }
    if (currRequest.options || !currRequest.foldersAndFiles)
      return done(
        new Error(["This test require using 'foldersAndFiles' only"])
      );

    allItems = [...allItems, ...currRequest.foldersAndFiles];
  }

  //Check that there is no same files to copy into the destination
  if ([...new Set(allItems)].length !== allItems.length)
    return done(
      new Error([
        "You try to copy the same item more then onec to the same destination"
      ])
    );
  const existCountProps = fs.readdirSync(destPath).length;
  const mightBeCount = allItems.length;

  chai.expect(existCountProps).to.equal(mightBeCount);
  return done();
};

module.exports = {
  foldersAndFilesCheck,
  optionsCheck,
  sameDestCheck
};
