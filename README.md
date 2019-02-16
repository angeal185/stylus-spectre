# stylus-spectre
stylus port of spectre.css

### Installation

Ensure stylus is installed globally

```sh
$ npm install stylus -g
```

### info
A complete, fully functional and unaltered convert of spectre.css to stylus.  
No learning curve and no repeats. build it how you want it or just use it as an easy way to exclude unused css.
spectre.css has been converted, broken down into smaller `.styl` includes and the include files are named accordingly.

## npm
```sh
$ npm install stylus-spectre --save-dev
```
stylus-spectre can be used in the following ways when required as a module

#### build stylus-spectre

create a empty file and execute the following:

```javascript
/* ./stylus-spectre.js */
const specStyl = require('stylus-spectre');

specStyl.build()

//build stylus-spectre for use in cwd
// ~ note: repeating this command will write over any existing files.


````

your setup will be:

```bash
├─spectre.styl
├─stylus-spectre.js
├─gulpfile.js
├───dev
│   └───variables.styl
    └───includes
│       └───icons
│       └───mixins
│       └───utilities
├───dist

```

* `./stylus-spectre.js` contains a complete list of build functions.
* Build variables can be edited via the `./dev/variables.styl` file.  
* include ans sub include options can be edited in the in the `./dev/variables.styl` file.
*  `./dist` is where your compiled spectre files will be saved


#### API
```js
// ./stylus-spectre.js

const specStyl = require('stylus-spectre');

// list of files/folders to watch
let options = {
  compile:true, // options on detect change
  compress:true,
  compileSourceMaps:true,
  compressSourceMaps:true,
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

/* start livewatch and compile to ./dist folder on change */
specStyl.watch(options);

/* compile spectre.Styl into ./dist folder */
specStyl.compile()

/* compile spectre.min.styl into ./dist folder */
specStyl.compress()

/* compile spectre.styl.map into ./dist folder */
specStyl.compileSourceMaps()

/* compile spectre.min.styl.map into ./dist folder */
specStyl.compressSourceMaps()

/* check for updates */
specStyl.versionCheck()

 /* backup for linux/ windows with mingw ~ .tar.gz */
 specStyl.backup(options.backup);

```

#### gulp API
`v4`
```sh
$ npm install gulp --save-dev
```
all of the functions included in the `./stylus-spectre.js` file can be called using gulp like so:
```js
//gulpfile.js
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

```


#### bower
bower:
```sh
$ bower install stylus-spectre --save-dev
```

your setup will be:

```bash
├─spectre.styl
├─stylus-spectre.js
├─gulpfile.js
├───dev
│   └───variables.styl
    └───includes
│       └───icons
│       └───mixins
│       └───utilities
├───dist
├───bin
├───example

```


you can simply copy the `gulpfile.js` && `stylus-spectre.js` from the examples folder into your cwd and use them in the same manner as the other methods.


### npm commands
open a console and type:
```js
// compile spectre.css to ./dist folder
$ npm run compile

// compile and compress spectre.min.css to ./dist folder
$ npm run compress

// compile spectre.css to ./dist folder with sourceMap
$ npm run compileM

// compile and compress spectre.min.css to ./dist folder with sourceMap
$ npm run compressM

```

### default stylus command
open a console and type:
```js
// compile spectre.css to ./dist folder
$ stylus spectre.styl -o ./dist

// compile and compress spectre.min.css to ./dist folder
$ stylus spectre.styl -c -o ./dist/spectre.min.css

// compile spectre.css to ./dist folder with sourceMap
$ stylus spectre.styl -m -o ./dist

// compile and compress spectre.min.css to ./dist folder with sourceMap
$ stylus spectre.styl -c -m -o ./dist/spectre.min.css

```

### windows users
batch files can be executed from the bin folder for all compile methods

### config
The default app options can be configured in `/lib/config/index.json`.

```json
{
  "baseInstall":"./node_modules/",
  "baseDir":"stylus-spectre/",
  "baseFile":"spectre.styl",
  "baseName":"spectre",
  "baseDest": "./dist",
  "baseBuild": ["spectre.styl", "example/stylus-spectre.js", "example/gulpfile.js"],
  "main":{
    "compile":{
      "enable":true,
      "command":"-o ./dist"
    },
    "compress":{
      "enable":true,
      "command":"-c -o ./dist/spectre.min.css"
    },
    "compileSourceMaps":{
      "enable":false,
      "command":"-m -o ./dist"
    },
    "compressSourceMaps":{
      "enable":false,
      "command":"-c -m -o ./dist/spectre.min.css"
    }
  },
  "options":{
    "compile":true,
    "compress":true,
    "compileSourceMaps":false,
    "compressSourceMaps":false,
    "toWatch":[
      "./spectre.styl",
      "./includes",
      "./includes/icons",
      "./includes/mixins",
      "./includes/utilities"
    ]
  }
}

```

done.
