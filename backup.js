const file_system = require('fs');
const path = require("path");
const archiver = require('archiver');
const log = require('log-to-file');

/**
 * Archive files
 * @param {*} sourceDir 
 * @param {*} archiveName 
 */
function archiveMaker(sourceDir, destinationDir, archiveName) {
    const archivePath = path.join(destinationDir, `${archiveName}.zip`);
    const bakPath = path.join(destinationDir, `${archiveName}.bak`);
    try {
        log(`[INFO] - Delete ${archiveName}.bak, if exists`, logFile);
        file_system.unlinkSync(bakPath)
        //file removed
    } catch (err) {
        log(`[ERROR] - ${err}`, logFile);
    }

    try {
        console.log(`Rename ${archiveName}.zip to ${archiveName}.bak, if exists`);
        file_system.renameSync(archivePath, bakPath);
        //file renamed
    } catch (err) {
        log(`[ERROR] - ${err}`, logFile);
    }

    var output = file_system.createWriteStream(`${archivePath}`);
    var archive = archiver('zip');

    output.on('close', function () {
        log(`[INFO] - ${archive.pointer()} total bytes -> ${archiveName}.zip`, logFile);
        log(`[INFO] - archiver has been finalized and the output file descriptor has closed.`, logFile);
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(`${sourceDir}`, false);

    archive.finalize();
}

/**
 * Get all directory inside a directory
 * @param {*} source 
 * @returns 
 */
const getDirectories = source =>
    file_system.readdirSync(source, {
        withFileTypes: true
    })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

// Global Variables
const configFile = file_system.readFileSync("config.json");
const configValues = JSON.parse(configFile);
const sourceDir = configValues.sourceDir;
const destinationDir = configValues.destinationDir;
const logFile = configValues.configuration.logDir === "" ? path.join(`${__dirname}`, 'projectSafer.log') : path.join(`${configValues.configuration.logDir}`, 'projectSafer.log');


// Main code
sourceDir.forEach(item => {
    // Stand alone directory
    if (item.type === 0) {
        const archivePath = path.join(destinationDir, item.name.toLowerCase())
        if (!file_system.existsSync(archivePath)) {
            file_system.mkdirSync(archivePath);
        }
        archiveMaker(item.path, archivePath, (item.name).toLowerCase());
    }
    // Parent directory - archive everything under this dir
    if (item.type === 1) {
        const archivePath = path.join(destinationDir, item.name.toLowerCase())
        if (!file_system.existsSync(archivePath)) {
            file_system.mkdirSync(archivePath);
        }
        let directories = getDirectories(item.path);
        directories.forEach(d => {
            archiveMaker(path.join(item.path, d), archivePath, (`${d}`).toLowerCase());
        });

    }
});