const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"]
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false
  },
  isAdmin: {
    type: String,
    default: 'user'
  },
  address1: String,
  contact: String,
  Orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  Reservations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation'
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  CreditCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreditCard'
  }]
}, {timestamps: true})

const User = mongoose.model("User", UserSchema);

module.exports = User;