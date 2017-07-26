var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var messageSchema = new Schema({
  content: String,
  created_at: Date,
  updated_at: Date,
  creator : String

});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
