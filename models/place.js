const { Schema, model, default: mongoose } = require("mongoose");

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: "Comment",
  },
});

const Place = model("Place", placeSchema);

module.exports = Place;
