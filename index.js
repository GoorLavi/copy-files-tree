const _ = require("lodash");
const wrench = require("wrench");
const fs = require('fs-extra')  


let filesTree, mainFolderPath;

module.exports =  (_filesTree, source, destination) => {

  filesTree = _filesTree;
  mainFolderPath = source;

  try{

    copyFolder("", destination);
    return;
  }
  catch(error){
    return error;
  }
}

/**
 * @param {string} treePath 
 * @param {string} destination 
 */
const copyFolder = (treePath, destination) => {

  const folder = treePath ? _.get(filesTree, treePath): filesTree;

  // If main dir is fully chosen
  if(folder.fullyChosen)
    fullFolderCopy(joinPath(mainFolderPath, treePath.replace('.', '/')), destination);

  else{
    copyFiles(treePath, destination);

    // In case this is the main branch
    const currentBranch = treePath ? _.get(filesTree, treePath) : filesTree;
   
    _.forEach(currentBranch, (value, folderName) => {
      if(folderName !== 'files'){
        const innerTreePath = treePath ?  treePath+'.'+folderName : folderName;

        // In case on unexisted parent folder mkdir parent
        fs.ensureDirSync(destination)
        copyFolder(innerTreePath, joinPath(destination, folderName));
      }
    });
  }
};

/**
 *  Copy all tree files
 * @param {string} treePath 
 * @param {string} destination 
 */
const copyFiles= (treePath, destination) => {

  const filesPaths = getFilesFullPaths(treePath);

  _.forEach(filesPaths, (filePath) => {

  const fileName = _.last(filePath.split('/'));

  const fullDestination = joinPath(destination, fileName); 
    fs.copySync(filePath, fullDestination);
  });
};

// Copy hole folder into destenation
const fullFolderCopy = (fullFolderPath, folderDestination) =>{

  wrench.copyDirSyncRecursive(fullFolderPath, folderDestination, {
    forceDelete: false
  });
};


/**
 * Return all existed files in treePath with thier full path
 * @param {string} treePath 
 */
const getFilesFullPaths = (treePath) => {

    const path = treePath ? treePath + '.files' : 'files';

    const files = _.get(filesTree, path);
    
    return _.map(files, (file) => {

      // Convert to files path format
      treePath = treePath.replace('.', '/');
      return joinPath(mainFolderPath, treePath, file.name);
    });
};

/**
 * Combine path with seperator
 * @param {Path string} path 
 * @param {Array} subPaths 
 */
const joinPath = (path, ...subPaths) => {

  _.forEach(subPaths,(subPath, index) => {
    if(path[path.length-1] !== '/')
      path += '/';

      path += subPath; 
  }); 

  return path;
};