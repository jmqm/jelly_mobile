const fs = require('fs');
const path = require('path');

// Set .env file location
const envFilePath = path.resolve(path.join(__dirname, '..'), '.env');

// Define placeholders based on environment variables from .env
const envFileContent = fs.readFileSync(envFilePath, 'utf8');
const envVariables = envFileContent
    .split('\n')
    .filter(line => line.trim() !== '') // Remove empty lines
    .reduce((accumulator, line) => {
        const [key, value] = line.split('=');

        accumulator[key.trim()] = value
            .trim()
            .replace(/"/g, '');

        return accumulator;
    }, { });

// Read package.json
const packageJsonPath = path.resolve(path.join(__dirname, '..'), 'package.json');
let packageJson = fs.readFileSync(packageJsonPath, 'utf8');

// Replace variables in package.json with values from .env
for (const key in envVariables) {
    const variableKey = key;
    const variableValue = envVariables[key];
    packageJson = packageJson.replace(`$${variableKey}`, variableValue);
}

// Write the modified package.json back to the file
fs.writeFileSync(packageJsonPath, packageJson);
