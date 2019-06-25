const _ = require('lodash');
const wrench = require('wrench');
const fs = require('fs-extra');


let filesTree, mainFolderPath, destination;
module.exports = (_filesTree, source, _destination) => {

    filesTree = _filesTree;
    mainFolderPath = source;
    destination = _destination;

    try {
        copyFolder();
    } catch (error) {
        console.error(error);
        return error;
    }
};


const copyFolder = (treePath = '') => {

    const folder = treePath ? _.get(filesTree, treePath) : filesTree;

    // If main dir is fully chosen
    if (folder.fullyChosen)
        return fullFolderCopy(joinFolderPath(mainFolderPath, toFoldersPath(treePath)), joinFolderPath(destination, toFoldersPath(treePath)));

    else {
        copyFiles(treePath);
        const {files, folderRest} = folder;

        Object.keys(folderRest).forEach(folderName => {
            // In case on un-existed parent folder mkdir parent
            fs.ensureDirSync(destination);
            copyFolder(treePath ? joinObjectPath(treePath, folderName) : folderName);
        });
    }
};


const copyFiles = treePath => {

    const filesPaths = getFilesFullPaths(treePath);

    filesPaths.forEach(filePath => {
        const [fileName] = filePath.split('/');

        const fullDestination = joinFolderPath(destination, fileName);
        fs.copySync(filePath, fullDestination);
    });
};

// Copy hole folder into destination
const fullFolderCopy = (fullFolderPath, folderDestination) => {
    wrench.copyDirSyncRecursive(fullFolderPath, folderDestination, {
        forceDelete: false
    });
};

const getFilesFullPaths = treePath => {
    const filesPath = treePath ? joinFolderPath(treePath, 'files') : 'files';

    const files = _.get(filesTree, filesPath);
    return files.map(file => joinFolderPath(mainFolderPath, toFoldersPath(treePath), file.name))
};

const joinFolderPath = (...paths) => paths.join('/');
const joinObjectPath = (...paths) => paths.join('.');

const toFoldersPath = str => str.replace(/\./g, '/');
const toObjectPath = str => str.replace(/\//g, '.');
