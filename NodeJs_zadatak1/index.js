const fs = require('fs');
const path = require('path');

function getLatestFile(directory) {
  let latestFile;

  const files = fs.readdirSync(directory);
  files.forEach(filename => {
    const stat = fs.lstatSync(path.join(directory, filename));
    if (stat.isDirectory()) {
      getLatestFile(path.join(directory, filename));
    }

    if (!latestFile) {
      latestFile = {filename, mtime: stat.mtime};
      return;
    }
    if (stat.mtime > latestFile.mtime) {
      latestFile.filename = filename;
      latestFile.mtime = stat.mtime;
    }
  });
  return path.join(directory, latestFile.filename);
}


const mainFolder = 'praksa/';
const newFolder = 'praksaNovi/';

if (fs.existsSync(mainFolder)) {
  let subfolders = fs.readdirSync(mainFolder);

  console.log("START: " + new Date().toISOString());
  console.log("The main folder " + mainFolder + " is opened.\n");

  subfolders.forEach(folder => {
    console.log("Subfolder " + folder + " is opened.");
    let file = getLatestFile(mainFolder + folder);

    while ((fs.lstatSync(file).isDirectory())) {
      file = getLatestFile(file);
    } 
    console.log("Latest file: " + file)
    fs.copyFile(file, newFolder + folder + '.pdf', (err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log("File " + file + " has been coopied and renamed to " + folder + ".\n");
  })
  console.log("\nEND: " + new Date().toISOString());
}

else {
  console.log("Directory not exists");
}




  