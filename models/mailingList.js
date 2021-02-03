const mongoose = require('mongoose');

const mailingListSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    index: true,
    unique: true,
  },
  emails: [{
    type: String,
  }]
})

module.exports = mongoose.model('MailingList', mailingListSchema);