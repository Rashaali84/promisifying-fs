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

const fileName1 = process.argv[2];
const filePath1 = path.join(__dirname, fileName1);
log(1, filePath1);

const fileName2 = process.argv[3];
const filePath2 = path.join(__dirname, fileName2);
log(2, filePath2);

//Async await 

const writeReadAssert = async (filePath1, filePath2) => {
  try {
    log(3, `reading ${fileName1} ...`);
    const oldFile1 = await readFilePromise(filePath1, 'utf8');

    log(4, `reading ${fileName2} ...`);
    const oldFile2 = await readFilePromise(filePath2, 'utf-8');

    log(5, `writing ${fileName1} ...`);
    await writeFilePromise(filePath1, oldFile2);

    log(6, `writing ${fileName2} ...`);
    await writeFilePromise(filePath2, oldFile1, 'utf8');

    log(7, `reading ${fileName1} ...`);
    const newFile1 = await readFilePromise(filePath1, 'utf8');

    log(8, 'asserting new file 1 contents ...');
    assert.strictEqual(newFile1, oldFile2);

    log(9, `reading ${fileName2} ...`);
    const newFile2 = await readFilePromise(filePath2, 'utf8');

    log(10, 'asserting new file 2 contents ...');
    assert.strictEqual(newFile2, oldFile1);

    log(11, '\033[32mpass!\x1b[0m');
    fs.appendFileSync(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);


  } catch (err) {
    console.error(err);
  };
};
writeReadAssert(filePath1, filePath2);



/*log(3, `reading ${fileName1} ...`);
fs.readFile(filePath1, 'utf-8', (err, oldFile1) => {
  if (err) {
    console.error(err);
    return;
  }

  log(4, `reading ${fileName2} ...`);
  fs.readFile(filePath2, 'utf-8', (err, oldFile2) => {
    if (err) {
      console.error(err);
      return;
    }

    log(5, `writing ${fileName1} ...`);
    fs.writeFile(filePath1, oldFile2, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      log(6, `writing ${fileName2} ...`);
      fs.writeFile(filePath2, oldFile1, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        log(7, `reading ${fileName1} ...`);
        fs.readFile(filePath1, 'utf-8', (err, newFile1) => {
          if (err) {
            console.error(err);
            return;
          }

          log(8, 'asserting new file 1 contents ...');
          assert.strictEqual(newFile1, oldFile2);

          log(9, `reading ${fileName2} ...`);
          fs.readFile(filePath2, 'utf-8', (err, newFile2) => {
            if (err) {
              console.error(err);
              return;
            }

            log(10, 'asserting new file 2 contents ...');
            assert.strictEqual(newFile2, oldFile1);

            log(11, '\033[32mpass!\x1b[0m');
            fs.appendFileSync(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);
          })
        })
      })
    })
  })
})
*/
// pass: 5/11/2020, 4:22:07 PM