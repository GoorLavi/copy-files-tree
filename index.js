const fs = require('fs-extra');

module.exports = (_filesData) => {
  try {
    initializeProcess(_filesData);
  } catch (error) {
    console.error(error);
    return error;
  }
};

const initializeProcess = filesData => {
  Object.keys(filesData).forEach(sourceFolderPath => {
      if (filesData[sourceFolderPath].allFiles) {
        //Get all files in folder and add it to the object as files
      }

      if (filesData[sourceFolderPath].fullyChosen) {
        //Copy all the directory(include diractories)        
        copyFolder(sourceFolderPath, filesData[sourceFolderPath].destination);
        return;
      }
      
      copyFiles(filesData[sourceFolderPath], sourceFolderPath);
    }
  )
}

const copyFolder = (sourceDirPath, destinationDirPath) => {
  //CANT REACH THE SOURCE DIRECTORY NEED TO CHECK WHY
  fs.copy(sourceDirPath, destinationDirPath, (err) => {
    if (err) console.log(err)
  })
};

const copyFiles = ({
  files,
  destination
}, sourceDirPath) => {
  files.forEach(file =>
    fs.copySync(`${sourceDirPath}/${file}`, `${destination}/${file}`)
  );
};
