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

const copyItemsAsync = ({
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
    const promisesArrays = Object.keys(filesData).map(sourceDirPath => {
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

      return copyItemsAsync({
        items,
        destination,
        sourceDirPath
      });
    });

    const allPromises = promisesArrays.reduce((acc, arr) => [...acc, ...arr]);

    await Promise.all(allPromises);
    return "Done copyFiles successfully";
  } catch (error) {
    return error;
  }

}

module.exports = {
  copyFilesSync,
  copyFiles
};