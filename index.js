#!/usr/bin/env node
const options = require("minimist")(process.argv.slice(2));
const path = require("path");
const recursive = require("recursive-readdir");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

var ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"];
var INPUT_DIR = "./";
var OUTPUT_DIR = "./";
var QUALITY  = 70;

if (typeof options.quality === "number") {
    QUALITY = options.quality;
}

if (options.in || options.out) {
    if (!options.in) {
        console.error("Error: Specify an input directory.");
        process.exit(1);
    } else if (!options.out) {
        console.error("Error: Specify an output directory.");
        process.exit(1);
    } else {
        INPUT_DIR = path.join(options.in);
        OUTPUT_DIR = path.join(options.out);
    }
}

recursive(INPUT_DIR, function (err, files) {
    if (!Array.isArray(files)) {
        console.error("No files found!");
        process.exit(1);
    }

    files.forEach(function (file) {
        var extenstion = path.extname(file).toLowerCase();

        if (ALLOWED_EXTENSIONS.indexOf(extenstion) === -1) {
            console.log("Skipped", file);
            return false;
        }

        var fileParentDir = path.dirname(file);
        var relativeToInputDir = path.relative(INPUT_DIR, fileParentDir);
        var fileOutputDir = path.join(OUTPUT_DIR, relativeToInputDir);

        imagemin([file], fileOutputDir, {
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: QUALITY
                })
            ]
        }).then(function (files) {
            files.forEach(function (minfile) {
                console.log("Minified", minfile.path);
            });
        });
    });
});