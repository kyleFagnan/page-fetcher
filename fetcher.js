
const request = require('request');
const { writeFile , stat } = require('fs');

const args = process.argv.slice(2);


if (!args[0] || !args[1]) return;

const url = args[0];
const path = args[1];

request(url, (err, res, body) => {
  if (err) {
    throw err;
  }

  if (res.statusCode === 200) {
    writeFile(path, body, 'utf8', (err)=> {
      if (err) throw err;
      stat(path, (err, stats) => {
        if (err) throw err;
        console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
      });
    });
  }
});