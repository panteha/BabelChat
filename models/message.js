var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var messageSchema = new Schema({
  content: {
    type: String,
  },
  created_at: Date,
  updated_at: Date,
  
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
