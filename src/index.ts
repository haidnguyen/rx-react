import { resolve } from 'path';
import { readFile } from 'fs';

readFile(resolve(__dirname, '../assets/test.txt'), 'utf-8', (err, data) => {
  if (err) {
    return;
  }
  console.log(data);
  return data;
});
