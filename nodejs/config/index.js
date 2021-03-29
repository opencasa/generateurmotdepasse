const bunyan = require('bunyan');
//const fs = require('fs');
const path = require('path');
const appname = 'qf';


let ts = new Date();
let filename = `${ts.getFullYear()}-${ts.getMonth()}-${ts.getDay()}-${ts.getHours()}-${ts.getMinutes()}.txt`;

module.exports = {
  applicationName: appname,
  logger: bunyan.createLogger({ 
    name: appname,
    streams: [
      {
        level: 'debug',
        stream: process.stdout                                      // log DEBUG and above to stdout
      },
      {
        level: 'info',
        path: path.join(__dirname, '..', 'public', 'log', filename) // log INFO and above to a file
      }
    ] 
  }),
  asset: {
    filetypes: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'fs', 'frag', 'glsl', 'webm', 'mp4'],
    storage: 'public',
    maxFileSize: 1000048576
  },
};
