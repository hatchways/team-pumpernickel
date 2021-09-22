const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const requestSchema = new mongoose.Schema({
  ownerId: {
    type: ObjectId,
    required: true,
  },
  sitterId: {
    type: ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  declined: {
    type: Boolean,
    default: false,
  },  
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = Request = mongoose.model("Request", requestSchema);
