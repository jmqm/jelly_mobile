const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Set .env file location
const envFilePath = path.resolve(path.join(__dirname, '..'), '.env');

// Load environment variables
dotenv.config({ path: envFilePath });

// Define placeholders based on environment variables from .env
const envFileContent = fs.readFileSync(envFilePath, 'utf8');
const envVariables = dotenv.parse(envFileContent);

// Read package.json
const packageJsonPath = path.resolve(path.join(__dirname, '..'), 'package.json');
let packageJson = fs.readFileSync(packageJsonPath, 'utf8');

// Replace variables in package.json with values from .env
for (const key in envVariables) {
    const variableKey = key;
    const variableValue = envVariables[key];
    packageJson = packageJson.replace(variableValue, `$${variableKey}`);
}

// Write the modified package.json back to the file
fs.writeFileSync(packageJsonPath, packageJson);
