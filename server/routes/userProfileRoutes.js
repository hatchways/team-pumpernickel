const express = require("express");
const router = express.Router();
const { createUserProfile,updateProfile,getProfile,getAllProfiles} = require("../controllers/userProfileController");

router.post("/create_profile/:userId",createUserProfile)
router.patch("/update_profile/:userId",updateProfile)
router.get("/get_profile/:userId",getProfile)
router.get("/get_all_profiles/",getAllProfiles)

module.exports = router;
   