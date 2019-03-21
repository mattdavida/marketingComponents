const spawn = require("cross-spawn");
const fs = require('fs');

const angularLibraries = String.raw`C:\Users\matthew.arvidson\source\repos\angularLibraries`;
const cmsa = String.raw`C:\Users\matthew.arvidson\source\repos\kentico\src\cms.angular`;
const cms = String.raw`C:\Users\matthew.arvidson\source\repos\kentico\src\cms`;
const distPath = angularLibraries + '\\dist\\marketing-components\\'

function buildAngularLibraries() {
  process.chdir(angularLibraries)
  spawn.sync("gulp", ["marketingComponents"], { stdio: "inherit" })
  findPackage();
}

function buildCms() {
  process.chdir(cms);
  spawn.sync("gulp", ["debug"], { stdio: "inherit" });
}

function buildComponents() {
  try {
    buildAngularLibraries();
  } catch(error) {
    console.log('ERROR: ', error)
  }
} 

function findPackage() {
  fs.readdir(distPath, (error, fileList) => {
    if(error) {
      console.log('ERROR: ', error)
      return;
    }
    const file = fileList.find(file => file.endsWith('.tgz'))
    if(file) { 
      installPackage(distPath + file);
    }
  });
}

function installPackage(package) {
  process.chdir(cmsa)
  spawn.sync("npm", ["i", package], { stdio: "inherit" })
  buildCms()
}

module.exports = {
  buildComponents
};