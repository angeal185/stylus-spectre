const gulp = require('gulp'),
specStyl = require('stylus-spectre');

// list of files/folders to watch
let options = {
  compile:true, // options on detect change
  compress:true,
  compileSourceMaps:false,
  compressSourceMaps:false,
  toWatch: [ // list of files/folders to watch
    "./spectre.styl",
    "./dev",
    "./dev/includes",
    "./dev/includes/icons",
    "./dev/includes/mixins",
    "./dev/includes/utilities"
  ],
  backup: [ // files/dirs for backup
    "./spectre.styl",
    "./dev"
  ]
}



function specStylCompile(done) {
  specStyl.compile()
  done()
}

function specStylCompress(done) {
  specStyl.compress()
  done()
}

function specStylCompileSourceMaps(done) {
  specStyl.compileSourceMaps()
  done()
}

function specStylCompressSourceMaps(done) {
  specStyl.compressSourceMaps()
  done()
}

function specStylVersionCheck(done) {
  specStyl.versionCheck()
  done()
}

function specStylBuild(done) {
  specStyl.build()
  done()
}

function specStylWatch(done) {
  specStyl.watch(options)
  done()
}

function backup(done) {
  specStyl.backup(options.backup)
  done()
}

//exports
exports.specStylCompile = specStylCompile;
exports.specStylCompress = specStylCompress;
exports.specStylCompileSourceMaps = specStylCompileSourceMaps;
exports.specStylCompressSourceMaps = specStylCompressSourceMaps;
exports.specStylVersionCheck = specStylVersionCheck;
exports.specStylBuild = specStylBuild;
exports.specStylWatch = specStylWatch;
exports.specStylBackup = specStylBackup;
exports.default = specStylWatch
