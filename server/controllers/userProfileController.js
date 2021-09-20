const User = require('../models/User')
const UserProfile = require('../models/UserProfile')
const asyncHandler = require('express-async-handler')


exports.createUserProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await new UserProfile(req.body)
    const userProfile = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          profile
        }
      }
    )
   return  res.json(userProfile)
  } catch (err) {
   return res.send(err)
  }  
})

exports.updateProfile = asyncHandler(async (req, res) => {
  try {
    const updateProfile = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          profile: { ...req.body }
        }   
      }
    )
   return res.json(updateProfile)
  } catch (err) {
   return res.send(err)
  }
})

exports.getProfile = asyncHandler(async (req, res) => {
  try {
    const userProfile = await User.findById({ _id: req.params.userId }).select(
      'profile'
    )
   return res.json(userProfile)
  } catch (err) {
   return res.send(err)
  }
})

exports.getAllProfiles = asyncHandler(async (req, res) => {
  try {
    const allProfiles = await User.find().select('profile')
  return  res.json(allProfiles)
  } catch (err) {
  return  res.send(err) 
  } 
})
