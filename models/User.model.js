const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
    },
    address: {
      streetHouseNumb: String,
      postalCode: String,
      city: String,
      country: String
    },
    telephone: String,
    plants: [{type:mongoose.Schema.Types.ObjectId, ref: 'UserPlant'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);



const User = model('User', userSchema);

module.exports = User;
