const fs = require('fs');
const readline = require('readline');


// Package name to remove
const packagesToRemove = [
    '@jmqm/react-native-vlc-media-player'
];


// Path to the yarn.lock file
const yarnLockPath = './yarn.lock';
const yarnLockTempPath = `${yarnLockPath}.temp`;

const readLine = readline.createInterface({
    input: fs.createReadStream(yarnLockPath, 'utf-8'),
    output: fs.createWriteStream(yarnLockTempPath, 'utf-8')
});

let insideBlock = false;
readLine.on('line', (line) => {
    const isLineEmpty = line.trim() === '';

    if (isLineEmpty && insideBlock) {
        insideBlock = false;
    } else if (!insideBlock) {
        const foundToRemove = packagesToRemove.some(packageToRemove => line.includes(packageToRemove));

        if (foundToRemove) {
            insideBlock = true;
        } else {
            readLine.output.write(line + '\n');
        }
    }
});

readLine.on('close', () => {
    readLine.output.end(() => {
        fs.renameSync(yarnLockTempPath, yarnLockPath);
    });
});
