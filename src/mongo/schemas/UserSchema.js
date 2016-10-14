const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  /*
    Credentials info
  */
  mail: {
    type: String,
    unique: true,
    validate: { validator: validator.isEmail }, // Check if email is valid
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },

  /*
    Other infos
  */
  createdAt: {
    type: Date,
    default: Date.Now,
  },
});

module.export = mongoose.model('userSchema', UserSchema);
