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
        for (let sourceDirPath in filesData) {
            const {
                options: {
                    allFiles,
                    allDirectories
                } = {},
                destination,
                foldersAndFiles = []
            } = filesData[sourceDirPath];

            const filteredItems = getAllFilteredItems(sourceDirPath, allDirectories, allFiles);
            const items = foldersAndFiles.concat(filteredItems);
            copyItemsSync({items, destination, sourceDirPath});
        }

    } catch (error) {
        console.error(error);
        return error;
    }
};

const copyItems = ({items, destination, sourceDirPath}) =>
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

        for (let sourceDirPath in filesData) {
            const {
                options: {
                    allFiles,
                    allDirectories
                } = {},
                destination,
                foldersAndFiles = []
            } = filesData[sourceDirPath];
            const filteredItems = getAllFilteredItems(sourceDirPath, allDirectories, allFiles);
            const items = foldersAndFiles.concat(filteredItems);
            allPromises = allPromises.concat(copyItems({items, destination, sourceDirPath}));
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