import csv from 'csvtojson';
import readline from 'readline';
import fs, { promises } from 'fs';
import path from 'path';
import { pipeline } from 'stream';

const csvPath = path.resolve('1', 'csv', 'nodejs-hw1-ex1.csv');
const jsonPath = path.resolve('1', 'json', 'nodejs-hw1-ex1.json');

const csvToJsonParser = csv({
  delimiter: ';',
  noheader: false,
  headers: ['book', 'author', 'amount', 'price']
})

/**
 * Full file to RAM
 */
promises
  .readFile(csvPath)
  .then((file) => csvToJsonParser.fromString(file.toString())
  )
  .then((json) => promises
    .writeFile(jsonPath, JSON.stringify(json, null, 2))
  )
  .catch(console.error);

/**
 * Via stream line by line
 */
const readStream = fs.createReadStream(csvPath);
const writeStream = fs.createWriteStream(jsonPath);

const rl = readline.createInterface({
    input: pipeline(
      readStream,
      csvToJsonParser,
      (err) => err && console.error(err)
    ),
});

rl.on('line', (line) => {
  writeStream.write(line + '\r\n');
})