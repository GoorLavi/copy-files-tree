const copyFilesTree = require('./index');


// Example:
// filesTree: {
// files: [ 0: {name: 'myFile'}, ... ], 
// firstFolder: { files: [ 0: {name: 'myFile2'} ]},
// secFolder: { fullyChosen: true } 
// }
// source: C:// 
// destination: Z:// 

// Copy folder with content
copyFilesTree({fullyChosen: true},'SourceFolder/','destination'+'/wantedFolder/');

// Copy folders with one inner folder
copyFilesTree({
    files: [{name: '1.png'},{name: '2.png'},{name: '3.png'}],
     folder1: {files: [{name: 'image.png'}], innerFolder: {files: [{name: '1.jpg'}, {name: '2.jpg'}]}},
    folder2: {files: [{name: 'file.txt'}]}
}, 'SourceFolder/','destination'+'/wantedFolder/');

// Copy folder with inner fully chosen
 copyFilesTree({
     files:[{name: '1.png'},{name: '2.png'},{name: '3.png'}],
     folder1:{fullyChosen: true}
}, 'SourceFolder/','destination'+'/wantedFolder/');