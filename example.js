const copyFilesTree = require('./index');


// Example:
// filesTree: {
// files: [{name: 'myFile'}, ... ], 
// firstFolder: { files: [{name: 'myFile2'} ]},
// secFolder: { fullyChosen: true } 
// }
// source: C:// 
// destination: Z:// 

// // Copy folder with content
// copyFilesTree({fullyChosen: true},'SourceFolder/','Destination'+'/wantedFolder/');

// // Copy folders with one inner folder
// copyFilesTree({
//     files: [{name: '1.png'},{name: '2.png'},{name: '3.png'}],
//      folder1: {files: [{name: 'image.png'}], innerFolder: {files: [{name: '1.jpg'}, {name: '2.jpg'}]}},
//     folder2: {files: [{name: 'file.txt'}]}
// }, 'SourceFolder/','Destination'+'/wantedFolder/');

// // Copy folder with inner fully chosen
//  copyFilesTree({
//      files:[{name: '1.png'},{name: '2.png'},{name: '3.png'}],
//      folder1:{fullyChosen: true}
// }, 'SourceFolder/','Destination'+'/wantedFolder/');


copyFilesTree({
    innerTest1:{fullyChosen: true}
}, 'C:\\Users\\goorlavi1\\Desktop\\test1\\','D:\\'+'testFolder\\');