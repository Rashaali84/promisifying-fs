// require dependencies
const fs = require(`fs`);
const path = require(`path`);
const assert = require(`assert`);
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
const fileToRead = path.join(__dirname, fileName1);
log(1, fileToRead);

const fileName2 = process.argv[3];
const fileToAppend = path.join(__dirname, fileName2);
log(2, fileToAppend);


//promise syntax 

log(3, `reading original contents from ${fileName2} ...`);
readFilePromise(fileToAppend, 'utf8')//read file 1 first original
  .then((oldContents) => {
    log(4, `reading from ${fileName1} ...`);
    readFilePromise(fileToRead)
      .then((contentToAppend) => {
        log(5, `writing to ${fileName2} ...`);
        appendFilePromise(fileToAppend, contentToAppend, `utf-8`)
          .then(() => {
            log(6, `reading from ${fileName2} ...`);
            readFilePromise(fileToAppend, 'utf8')
              .then((newContent) => {

                log(7, `asserting ...`);
                assert.strictEqual(newContent, oldContents + contentToAppend);
                log(8, '\033[32mpass!\x1b[0m');
                fs.appendFileSync(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);


              }).catch(err => console.error(err))


          }).catch(err => console.error(err))
      }
      ).catch(err => console.error(err));
  })
  .catch(err => console.error(err))


/*
log(3, `reading original contents from ${fileName2} ...`);
fs.readFile(fileToAppend, `utf-8`, (err, oldContents) => {
  if (err) {
    console.error(err);
    return;
  }

  log(4, `reading from ${fileName1} ...`);
  fs.readFile(fileToRead, `utf-8`, (err, contentToAppend) => {
    if (err) {
      console.error(err);
      return;
    }

    log(5, `writing to ${fileName2} ...`);
    fs.appendFile(fileToAppend, contentToAppend, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      log(6, `reading from ${fileName2} ...`);
      fs.readFile(fileToAppend, `utf-8`, (err, newContent) => {
        if (err) {
          console.error(err);
          return;
        }

        log(7, `asserting ...`);
        assert.strictEqual(newContent, oldContents + contentToAppend);
        log(8, '\033[32mpass!\x1b[0m');
        fs.appendFileSync(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);
      });
    });

  });

});

*/


// pass: 5/11/2020, 4:12:28 PM