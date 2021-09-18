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
    firstName: reqstring,
    lastName: reqString,
    gender: { type: boolean, required: true },
    birthDay: date,
    email: reqString,
    phoneNumber: reqString,
    address: reqString,
    description: noReqString,
    available: { type: 'boolean', required: true },
    availableDays: [
      {
        availableDay: date,
        from: noReqString,
        to: noReqString
      }
    ]
  },
  { timestamps: true }
)

const UserProfile = mongoose.model('profile', userProfile)
module.exports = UserProfile
