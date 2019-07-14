# copy-files-tree

Copy files and folder to destination by tree model

## Getting Started

To install package using npm
```
npm install --save copy-files-tree
```
Or with yarn
```
yarn add copy-files-tree
```

### How to use?

We made some changes in the api
Currently we have copyFiles and copyItemsSync (both having the same parameters)

```
import {copyFiles, copyItemsSync} from 'copy-files-tree'


copyFiles({
    FolderPath1: { files:['image.png'], destination: 'FullDestinationFolderPath'},
    FolderPath2: { allFiles: true, destination: 'FullDestinationFolderPath'},
    FolderPath3: { allDirectories: true, destination: 'FullDestinationFolderPath'}
});


// Copy folders with one inner folder
const error = copyFilesTree({
    files: [{name: 'image.png'}...],
    folder1: {innerFolder: {files: [{name: 'file.text'}]}},
    folder2: {files: [{name: 'file.txt'}]}
}, 'SourceFolder/','Destination'+'/wantedFolder/');
```


#### Result

```
Destination/wantedFolder/ ------ image.png          
                               |       
                               - folder1/ ------  innerFolder/ ----- file.text         
                               |         
                               - folder2/ ------  file.txt       
```

[More Examples](example.js)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
