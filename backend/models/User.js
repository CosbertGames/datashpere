const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, trim: true },
    gender:    { type: String, required: true, enum: ['male', 'female', 'other'] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);