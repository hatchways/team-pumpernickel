const mongoose = require('mongoose')
const reqString = {
  type: 'string',
  required: true
}

const noReqString = {
  type: 'string',
  required: false
}

const userProfile = new mongoose.Schema(
  {
    firstName: reqString,
    lastName: reqString,
    userImage: reqString,
    userId: reqString,
    nickName: noReqString,
    dateOfBirth: { type: Date, default: Date.now },
    education: noReqString,
    occupation: noReqString,
    hobbies: noReqString,
    postCode: noReqString,
    address: noReqString,
    city: noReqString,
    country: noReqString,
    online: {
      type: 'boolean',
      required: true
    },
    about: reqString
  },
  { timestamps: true }
)

const UserProfile = mongoose.model('profile', userProfile)
module.exports = UserProfile
