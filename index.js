const fs = require('fs');
const path = require('path');
const java = require('java');

// setup java interface
java.asyncOptions = {
    syncSuffix: '',
    asyncSuffix: 'Async',
    promiseSuffix: 'Promise',
    promisify: require('es6-promisify').promisify
};

// setup dependencies
const baseDir = path.join(__dirname, 'jar');
const dependencies = fs.readdirSync(baseDir);
dependencies.forEach((dependency) => {
    java.classpath.push(baseDir + "/" + dependency);
});

// export
module.exports = require('./lib');
