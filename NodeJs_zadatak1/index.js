const fs = require('fs');
const path = require('path');

function getLatestFile(directory) {
  let latestFile;

  const files = fs.readdirSync(directory);
  files.forEach(filename => {
    const stat = fs.lstatSync(path.join(directory, filename));
    if (stat.isDirectory())
      return;

    if (!latestFile) {
      latestFile = {filename, mtime: stat.mtime};
      return;
    }
    if (stat.mtime > latestFile.mtime) {
      latestFile.filename = filename;
      latestFile.mtime = stat.mtime;
    }
  });

  return latestFile.filename;
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

