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


specStyl.build()

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
 //specStyl.backup(options.backup);
