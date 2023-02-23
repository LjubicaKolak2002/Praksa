const fs = require('fs');
const path = require('path');

function getLatestFile(dirpath) {
  let latest;

  const files = fs.readdirSync(dirpath);
  files.forEach(filename => {
    const stat = fs.lstatSync(path.join(dirpath, filename));
    if (stat.isDirectory())
      return;

    if (!latest) {
      latest = {filename, mtime: stat.mtime};
      return;
    }
    if (stat.mtime > latest.mtime) {
      latest.filename = filename;
      latest.mtime = stat.mtime;
    }
  });

  return latest.filename;
}


const mainFolder = 'praksa/';
const newFolder = 'praksaNovi/';

if (fs.existsSync(mainFolder)) {
  subfolders = fs.readdirSync(mainFolder);

  console.log("START: " + new Date().toISOString());
  console.log("The main folder " + mainFolder + " is opened.\n")

  subfolders.forEach(folder => {
    console.log("Subfolder " + folder + " is opened.")
    file = getLatestFile(mainFolder + folder)
    console.log("Latest file: " + file)
    fs.copyFile(mainFolder + folder + '/' + file, newFolder + folder + '.pdf', (err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log("File " + file + " has been coopied and renamed to " + folder + ".\n")
  })
 
  console.log("\nEND: " + new Date().toISOString())
}

else {
  console.log("Directory not exists");
}

