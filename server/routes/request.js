const express = require('express')
const router = express.Router()
const {
  profile,
  getProfile,
  getAllProfiles
} = require('../controllers/userProfileController')

router.patch('/profile/:userId', profile)
router.get('/get_profile/:userId', getProfile)
router.get('/get_all_profiles/', getAllProfiles)

module.exports = router
