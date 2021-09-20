const mongoose = require('mongoose')

const reqString = {
  type: 'string',
  required: true
}

const noReqString = {
  type: 'string',
  required: false
}

const date = {
  type: Date,
  default: null
}

const userProfile = new mongoose.Schema(
  {
    firstName: reqString,
    lastName: reqString,
    gender: reqString,
    birthDay: date,
    email: reqString,
    phoneNumber: reqString,
    address: reqString,
    city: noReqString,
    country: noReqString,
    description: noReqString,
    available: { type: 'boolean', required: true },
    availableDays: [
      {
        availableDay: date,
        from: noReqString,
        to: noReqString,
      }
    ]
  },
  { timestamps: true }
)

const UserProfile = mongoose.model('profile', userProfile)
module.exports = UserProfile
