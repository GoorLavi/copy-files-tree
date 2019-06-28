const fs = require('fs-extra');

module.exports = (_filesData) => {

  try {
    initializeProcess(_filesData);
  } catch (error) {
    console.error(error);
    return error;
  }
};

const initializeProcess = (filesData) => {
  Object.keys(filesData).forEach(sourceFolderPath => {
      if (filesData[sourceFolderPath].allFiles) {
        //Get all files in folder and add it to the object as files
      };

      if (filesData[sourceFolderPath].fullyChosen) {
        //Copy all the directory(include diractories)        
        copyFolder(sourceFolderPath, filesData[sourceFolderPath].destination);
        return;
      };

      copyFiles(filesData[sourceFolderPath], sourceFolderPath);

    }

  );
};

const copyFolder = (sourceDirPath, destinationDirPath) => {
  fs.copySync(sourceDirPath, destinationDirPath, (err) => {
    if (err) console.log("Err: " + err);
  });
};

const copyFiles = ({
  files,
  destination
}, sourceDirPath) => {
  files.forEach(file =>
    fs.copySync(`${sourceDirPath}/${file}`, `${destination}/${file}`)
  );
};

// // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const filesData = {
//   'c:\\yogev\\Projects\\source-dir-test': {
//     files: ["textfile.txt"],
//     destination: "c:\\yogev\\Projects\\destination-dir-test"
//   },
//   'c:\\yogev\\Projects\\source-dir-test\\test1': {
//     files: ["textfiletest1.txt"],
//     destination: "c:\\yogev\\Projects\\destination-dir-test\\test1\\inner"
//   },
//   "c:\\yogev\\Projects\\source-dir-test\\test2": {
//     fullyChosen: true,
//     destination: "c:\\yogev\\Projects\\destination-dir-test\\test2"
//   },
// }


// initializeProcess(filesData);

// //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<