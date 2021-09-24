const mongoose = require('mongoose')

const userProfile = new mongoose.Schema(
  {
    firstName: {
      type: 'string',
      required: false
    },
    lastName: {
      type: 'string',
      required: false
    },
    gender: {
      type: 'string',
      required: false
    },
    birthDate: {
      type: Date,
      default: null
    },

    phoneNumber: {
      type: 'string',
      required: false
    },
    address: {
      type: 'string',
      required: false
    },
    city: {
      type: 'string',
      required: false
    },
    country: {
      type: 'string',
      required: false
    },
    description: {
      type: 'string',
      required: false
    },
    available: { type: 'boolean', required: true },
    availabityPeriod: {
      startDate: {
        type: Date,
        default: null
      },
      endDate: {
        type: Date,
        default: null
      }
    },
    availabilityDays: {
      type: 'string',
      enum: ['Mon', 'Tue', 'Wed', 'Tue', 'Fri', 'Sat', 'Sun']
    }
  },
  { timestamps: true }
)

const UserProfile = mongoose.model('profile', userProfile)
module.exports = UserProfile
