const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    address: {
      streetHouseNumb: String,
      postalCode: String,
      city: String,
      country: String,
    },
    userPicture: String,
    name: String,
    surname: String,
    telephone: String,
    profilePicture: Object,
    plants: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserPlant" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
