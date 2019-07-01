const fs = require('fs-extra');

const getAllFilteredItems = (path, isAllDirectory, isAllFiles) => {

  return (fs.readdirSync(path) || []).filter(item => {
    const isDirectory = fs.statSync(`${path}/${item}`).isDirectory();
    return (isDirectory && isAllDirectory || !isDirectory && isAllFiles);
  });
};

const copyItemsSync = ({
    items,
    destination,
    sourceDirPath
  }) =>
  items.forEach(item =>
    fs.copySync(`${sourceDirPath}/${item}`, `${destination}/${item}`)
  );

const copyFilesSync = filesData => {

  try {
    Object.keys(filesData).forEach(sourceDirPath => {

      const folderObject = filesData[sourceDirPath];
      const {
        options: {
          allFiles,
          allDirectories
        } = {},
        destination,
        foldersAndFiles = []
      } = folderObject;

      const items = [...foldersAndFiles, ...getAllFilteredItems(sourceDirPath, allDirectories, allFiles)];

      copyItemsSync({
        items,
        destination,
        sourceDirPath
      });
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

const copyItems = ({
    items,
    destination,
    sourceDirPath
  }) =>
  items.map(item =>
    new Promise((resolve, reject) => {
      fs.copy(`${sourceDirPath}/${item}`, `${destination}/${item}`, err => {
        if (err)
          reject(err);
        resolve();
      });
    })
  );


const copyFiles = async filesData => {

  try {
    let allPromises = [];
    const filesDataKeys = Object.keys(filesData);

    for (filesDataIndex in filesDataKeys) {
      const sourceDirPath = filesDataKeys[filesDataIndex];
      const folderObject = filesData[sourceDirPath];
      const {
        options: {
          allFiles,
          allDirectories
        } = {},
        destination,
        foldersAndFiles = []
      } = folderObject;
      const items = [...foldersAndFiles, ...getAllFilteredItems(sourceDirPath, allDirectories, allFiles)];

      allPromises = [...allPromises, ...copyItems({
        items,
        destination,
        sourceDirPath
      })];
    }

    await Promise.all(allPromises);
  } catch (error) {
    return error;
  }

}

module.exports = {
  copyFilesSync,
  copyFiles
};