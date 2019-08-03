// database
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

// tao name database
db.defaults({users: [], products:[], sessions:[]})
  .write()

module.exports = db;