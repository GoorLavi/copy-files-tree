const fs = require("fs-extra");

removeDirs = (pathsToRemove) =>{    
    for (d in pathsToRemove){
        fs.removeSync(d);
    }        
}

module.exports = {
    removeDirs
}

