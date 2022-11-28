const { Schema, model, default: mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minglength: 6,
  },
  image: {
    type: String,
    required: true,
  },
  places: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Place",
    },
  ],
});

userSchema.plugin(uniqueValidator);

const User = model("User", userSchema);

module.exports = User;
