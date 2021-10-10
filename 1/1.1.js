import {Transform} from 'stream';

class Reverse extends Transform {
  _transform(chunk, enc, cb) {
    const transofmed = chunk
      .toString()
      .trim() // remove new line char
      .split('')
      .reverse()
      .join('');

    this.push(transofmed);
    this.push('\r\n'.repeat(2)); // add an empty line after
    cb();
  }
}

const reverse = new Reverse();

process.stdin
  .pipe(reverse)
  .pipe(process.stdout);