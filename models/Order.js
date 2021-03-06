const mongoose = require('mongoose');

let connection = mongoose.createConnection(process.env.MONGODB_URI)

const OrderSchema = new mongoose.Schema({
  orderedItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      },
      options: [
        {
          option: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
          },
          qty: Number,
          name: String,
          price: Number,
          selected: {
            type: Boolean,
            default: false
          }
        }
      ],
      name: String,
      price: Number,
      qty: Number,
      comments: String,
      salGoneOrRain: String,
      porkOrVeg: String,
      spicyOrSweet: String,
      rollChoices: [
        { roll1: String,
          roll2: String,
          roll3: String
        }
      ],
      caliOrSpTuna: String,
      tunaOrSalmon: String,
    },
  ],
  comments: String,
  isDelivery: {
    type: Boolean,
    default: false
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  isReady: {
    type: Boolean,
    default: false
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isAgreed: {
    type: Boolean,
    default: false
  },
  isPlaced: {
    type: Boolean,
    default: false
  },
  isPaidAtRestaurant: {
    type: Boolean,
    default: false,
  },
  creditCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreditCard'
  },
  addOns: [
    { 
      addOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      },
      qty: Number,
      name: String,
      price: Number
    }
  ],
  grandTotal: Number,
  addOnTotal: Number,
  willReadyBy: Date,
  OrderNumber: Number,
}, {timestamps: true});

OrderSchema.index({ updatedAt: 1 });

let OrderNumber = connection.model('OrderNumber', OrderSchema);

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order;