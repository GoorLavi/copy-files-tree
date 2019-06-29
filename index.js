const fs = require('fs-extra');


const getAllFilteredItems = (path, isAllDirectory, isAllFiles) => {

    return (fs.readdirSync(path) || []).filter(item => {
        const isDirectory = fs.statSync(`${path}/${item}`).isDirectory();
        return (isDirectory && isAllDirectory || !isDirectory && isAllFiles);
    });
};

const copyItems = ({items, destination, sourceDirPath}) =>
    items.forEach(file =>
        fs.copySync(`${sourceDirPath}/${file}`, `${destination}/${file}`)
    );

const copyFilesSync = filesData => {

    try {
        Object.keys(filesData).forEach(sourceDirPath => {

                const folderObject = filesData[sourceDirPath];
                const {options: {allFiles, allDirectories} = {}, destination, foldersAndFiles = []} = folderObject;

                const items = [...foldersAndFiles, ...getAllFilteredItems(sourceDirPath, allDirectories, allFiles)];

                copyItems({items, destination, sourceDirPath});
            }
        );
    } catch (error) {
        console.error(error);
        return error;
    }
};

module.exports = {
    copyFilesSync,
};


