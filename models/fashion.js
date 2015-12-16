var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FashionSchema   = new Schema({
   title: String, //<TITLE>
   blurb: String, // <BLURB>
   author: String, // <AUTHOR>
   thumbnail_url: String, // <URL>
   details_url: String, // <URL>

});

module.exports = mongoose.model('Fashion', FashionSchema);