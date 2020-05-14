// require dependencies
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const util = require('util');
// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) => console.log(
  `\nlog ${logId} (${Date.now() - START} ms):\n`,
  value,
);

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const appendFilePromise = util.promisify(fs.appendFile);
// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const filePath = path.join(__dirname, process.argv[2]);
log(1, filePath);

const toAppend = process.argv[3];
log(2, toAppend);

const numberOfTimes = Number(process.argv[4]);
log(3, numberOfTimes);



//Async await 

const writeReadAssert = async (filePath, toAppend, numberOfTimes) => {
  try {
    log(4, 'reading old contents ...');
    const oldContents = await readFilePromise(filePath, 'utf-8');

    for (let i = 1; i <= numberOfTimes; i++) {
      log(4 + i, `appending ...`);
      await appendFilePromise(filePath, toAppend);
    };

    log(numberOfTimes + 5, 'reading new contents ...');
    const newContents = await readFilePromise(filePath, 'utf-8');

    log(numberOfTimes + 6, 'asserting file contents ...');
    const expectedContents = oldContents + toAppend.repeat(numberOfTimes);
    assert.strictEqual(newContents, expectedContents);

    log(numberOfTimes + 7, '\033[32mpass!\x1b[0m');
    fs.appendFileSync(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);

  } catch (err) {
    console.error(err);
  };
};
writeReadAssert(filePath, toAppend, numberOfTimes);

/*log(4, 'reading old contents ...');
const oldContents = fs.readFileSync(filePath, 'utf-8');

for (let i = 1; i <= numberOfTimes; i++) {
  log(4 + i, `appending ...`);
  fs.appendFileSync(filePath, toAppend);
};

log(numberOfTimes + 5, 'reading new contents ...');
const newContents = fs.readFileSync(filePath, 'utf-8');

log(numberOfTimes + 6, 'asserting file contents ...');
const expectedContents = oldContents + toAppend.repeat(numberOfTimes);
assert.strictEqual(newContents, expectedContents);

log(numberOfTimes + 7, '\033[32mpass!\x1b[0m');
fs.appendFileSync(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);

*/
// pass: 5/11/2020, 5:25:44 PM