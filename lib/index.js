const utils = require('./utils'),
fs  = require('fs'),
path  = require('path'),
config = require('./config');

exports.compile = function(){
  utils.ifExists(config.main.compile.command)
}

exports.backup = function(i){
  utils.backup(i)
}

exports.compress = function(){
  utils.ifExists(config.main.compress.command)
}

exports.compileSourceMaps = function(){
  utils.ifExists(config.main.compileSourceMaps.command)
}

exports.compressSourceMaps = function(i){
  utils.ifExists(config.main.compressSourceMaps.command)
}

exports.watch = function(i){
  utils.watch(i);
}

exports.versionCheck = function(){
  utils.versionCheck()
}

const build = exports.build = function(i){
  utils.copyFolder(config.baseInstall + 'stylus-spectre/dev', './' )
  config.baseBuild.forEach(function(i){
    utils.copyFileSync(config.baseInstall + 'stylus-spectre/'+ i, './' )
  })

}
