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

const error = copyFiles({
    FolderPath1: FolderProps,
    FolderPath2: { allFiles: true, destination: 'FullDestinationFolderPath'},
    FolderPath3: { allDirectories: true, destination: 'FullDestinationFolderPath'}
});
```

## Props

### foldersAndFiles

Type: Array 

Files and folders names which you want to copy

### allFiles

Type: Bool

Default false, use true in case you want to copy all the files   

### allDirectories

Type: Bool

Default false, use true in case you want to copy all the directories 

### destination

Type: String

Full path to destination location 



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
