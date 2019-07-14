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

const error = copyFiles(FoldersData);
```

## Props

- `FoldersData` `<Object>`
  
  
  - `Key` `<String>` Folder source path
  
  - `Value` `<Object>` Folder data . 
  
    - `foldersAndFiles` `<Array>` Of `<String>` should contain the folders/files names you want to copy from the `Key` path 

    - `destination` `<String>` Destination folder path
    
    - `options` `<Object>` 
    
      - `allFiles` `<boolean>` Default `false`, use true in case you want to copy all the files in  the `Key` path 

      - `allDirectories` `<boolean>` Default `false`, use true in case you want to copy all the folders in  the `Key` path 



### Example:   

```js
import {copyFiles} from 'copy-files-tree'

const FoldersData = {
    '/Users/user/folder name 1': {
        foldersAndFiles: ['image.png', 'inner folder name1'],
        destination: '/Users/user1/some folder name',
    },
    '/Users/user1/folder name 2': {
        options: {
            allFiles: true,  // Folder files [`file name1.txt`, `file name2.txt`]
        },
        destination: '/Users/user2/some folder name2'
    }
}

const error = copyFiles(FoldersData);
```


```js
/Users/ ----- |
               - user1 ---
              |            |
              |              -  'image.png'
              |            |
              |              - 'inner folder name1' // With all the inner files and folders
              |
              |
               - user2 --- 
                           |
                            - `file name1.txt`
                           |
                            - `file name2.txt`
                            
```

[More Examples](example.js)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
