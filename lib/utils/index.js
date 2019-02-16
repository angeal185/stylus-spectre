const {exec,spawn} = require('child_process'),
config = require('../config'),
fs  = require('fs'),
path  = require('path'),
baseCmd = 'stylus';

let buildCmd = [baseCmd, config.baseFile],
inc = config.baseInstall + config.baseDir,
dev = config.cloneInstall + config.baseDir;

exports.joinCmd = joinCmd = function (i){
  buildCmd.push(i)
  compile(buildCmd.join(' '));
}

function writeLog(url, text, task, note){
  fs.writeFile(url, text, function (err) {
    if (err) throw err;
    logIt('g', 'c', 'task:' + task, note);
  });
}

exports.copyFileSync = copyFileSync = function( source, target ) {
  var targetFile = target;
  if ( fs.existsSync( target ) ) {
    if ( fs.lstatSync( target ).isDirectory() ) {
      targetFile = path.join( target, path.basename( source ) );
    }
  }
  try{
    fs.writeFileSync(targetFile, fs.readFileSync(source));
  } catch (e){
    if (e) { return consolel.log(e) }
  } finally{
    logIt('g','c','copy:success', targetFile);
  }


}

exports.copyFolder = copyFolder = function( source, target ) {
  var files = [];
  //check if folder needs to be created or integrated
  var targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
      fs.mkdirSync( targetFolder );
  }
  //copy
  if ( fs.lstatSync( source ).isDirectory() ) {
    files = fs.readdirSync( source );
    files.forEach( function ( file ) {
      var curSource = path.join( source, file );
      if ( fs.lstatSync( curSource ).isDirectory() ) {
        copyFolder( curSource, targetFolder );
      } else {

        copyFileSync( curSource, targetFolder );
      }
    });
  }
}

function build(){

  if (config.main.compile.enable){
    //compile spectre.css
    joinCmd(config.main.compile.command)
  }
  if (config.main.compress.enable){
    //compile spectre.min.css
    joinCmd(config.main.compress.command)
  }
  if (config.main.compileSourceMaps.enable){
    //compile spectre.css with sounceMaps
    joinCmd(config.main.compileSourceMaps.command)
  }
  if (config.main.compressSourceMaps.enable){
    //compile spectre.min.css with sounceMaps
    joinCmd(config.main.compressSourceMaps.command)
  }
}


function compile(i){
  exec(i, (err, stdout, stderr) => {
      if (err) {
          logIt('r','m','stylus:error', stderr);
      } else {
        logIt('g','c','stylus:success', stdout);
      }
  });
}


exports.logIt = logIt = function(a,b,c,d){
  console.log('\x1b[' + col(a) + 'm%s\x1b[0m' + '\x1b[' + col(b) + 'm%s\x1b[0m', '[' + c + ']: ', d);
}

function col(i){

  if (i == 'r'){
    //red
    return '31';
  }
  else if (i === 'g'){
    //green
    return '32';
  }
  else if (i === 'c'){
    //cyan
    return '36';
  }
  else if (i === 'm'){
    //magenta
    return '35';
  }
  else if (i === 'b'){
    //blue
    return '34';
  }
  else {
    console.error('color choice eror!')
  }
}

exports.watch = function(i){
  if (!i){
    i = config.options;
    logIt('b', 'm', 'task:watch', 'no options selected, loading default...');
  } else {
    logIt('g', 'm', 'task:watch', 'options detected, loading...');
  }
  let files = i.toWatch;
  files.forEach(function(item){
    fs.watch(item, (eventType, filename) => {
      if (i.compile){
        ifExists(config.main.compile.command)
      }
      if (i.compress){
        ifExists(config.main.compress.command)
      }
      if (i.compressSourceMaps){
        ifExists(config.main.compressSourceMaps.command)
      }
      if (i.compileSourceMaps){
        ifExists(config.main.compileSourceMaps.command)
      }
      logIt('g', 'c', 'task:watch', 'change detected in ' + filename + ', compiling...');
    });

  })
  logIt('g', 'c', 'task:watch', JSON.stringify(files,0,2));
}

exports.ifExists = ifExists = function(i){
  if(fs.existsSync(config.baseDest)){
    logIt('g', 'c', 'task:checkDir', config.baseDest + ' exists. starting compile task...');
    joinCmd(i)
  } else {
    logIt('b', 'm', 'task:checkDir', config.baseDest + ' does not exist. creating...');
    fs.mkdir(config.baseDest, function(){
      joinCmd(i)
    })
  }
}

exports.versionCheck = function(){
  let i = "npm view stylus-spectre version"
  logIt('c','m','task:version', 'initiating version check...');
  exec(i, (err, stdout, stderr) => {
      if (err) {
          logIt('r','m','stylus:error', stderr);
      } else {

        response = parseFloat(stdout.slice(2));
        challenge = parseFloat(config.version.slice(2));
        //console.log(response)
        //console.log(challenge)
        if (challenge < response) {
          logIt('r','c','task:version', 'update available from v'+ config.version + ' to v'+ stdout );
          return
        }
        logIt('g','m','task:version', 'current v'+ config.version +' up to date!');
      }
  });
}

exports.backup = function(i){
  let arr = [];

  i.forEach(function(item){
    arr.push(item.replace(/\\/g, '/'))
  })
  console.log('tar cvzf backup.tar.gz ' + arr.toString().replace(/,/g, ' '))
  exec('tar cvzf backup.tar.gz ' + arr.toString().replace(/,/g, ' '), (err, stdout, stderr) => {
      if (err) {
          logIt('r','m','backup:error', stderr);
      } else {
        logIt('g','c','backup:success', stdout);
      }
  });

}
