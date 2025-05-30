const fs = require('fs');
const path = require('path');

// Get all folders in the current directory
const folders = fs.readdirSync(__dirname, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());

// My folders are named 1Introduction, 2Operators, 3Conditionals, etc.Put those that meet this pattern in an array
const folderNames = folders
    .map((dirent) => dirent.name)
    .filter((name) => /^10[A-Z].*$/.test(name))
    .sort((nameA, nameB) => {
        const [_, A] = /^(\d+)[A-Z].*$/.exec(nameA);
        const [__, B] = /^(\d+)[A-Z].*$/.exec(nameB);
        return +A - +B;
    }); // Sort the folders

const result = folderNames
    .map((folderName) => {
        return fs
            .readdirSync(path.join(__dirname, folderName), { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory() && dirent.name[0] === 'q')
            .map((dirent) => path.join(__dirname, folderName, dirent.name, './testcases.js'))
            .sort();
    })
    .flat()
    .forEach((testcaseFilepath) => {
        const { testcases, options = {} } = require(testcaseFilepath);
        const newTestCases = [];
        testcases.forEach((testcase) => {
            const { inputs, expected } = testcase;
            for (let i = 0; i < inputs.length; i++) {
                newTestCases.push({
                    input: inputs[i],
                    expected: expected[i],
                });
            }
        });
        const output = {
            testcases: newTestCases,
            options,
        };
        writeExportFile(testcaseFilepath, output);

        return;
    });

function writeExportFile(filename, obj) {
    const content = `module.exports = ${JSON.stringify(obj, null, 2)};\n`;

    const filePath = path.resolve(__dirname, filename);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log(`Successfully wrote to ${filePath}`);
        }
    });
}
