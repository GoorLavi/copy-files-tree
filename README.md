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

Only sync method is provided

```
const copyFilesTree = require('copy-files-tree');

// Copy folders with one inner folder

copyFilesTree(filesTree, 'SourceFolder/','Destination'+'/wantedFolder/');



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
