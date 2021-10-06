const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// @route POST /request/
// @desc create a new request by owner
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const { sitterId, startDate, endDate } = req.body;
    const requestModel = {
        ownerId: ObjectId(userId), 
        sitterId: ObjectId(sitterId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
    };
    
    const existingRequest = await Request.findOne(requestModel);
    if (existingRequest) {
      return res
          .status(200) 
          .json({ message: 'You have already made a request', existingRequest });
    }

    const newRequest = await Request.create(requestModel); 
    res.status(201).json({ newRequest });
  } catch (error) {
    next(error);
  } 
});

// @route GET /request
// @desc list of requests made for logged in user
// @access Private
exports.userRequests = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentTime }  = req.params;

    const requestsByUser = await Request.find({ 
      $or: [
        { ownerId: ObjectId(userId) },
        { sitterId: ObjectId(userId) }
      ] 
    }).sort({ startDate: 'desc' });

    const resModel = {
      nextBooking: {},
      currentBookings: [],
      pastBookings: [],
    };
    
    if (requestsByUser.length === 0) 
      return res.status(200).json({
        success: { resModel }
      });   
    
    // current bookings and past bookings list
    const separatorIndex = requestsByUser.findIndex(req => req.startDate < currentTime);
    if (separatorIndex === -1) {
      resModel.currentBookings = requestsByUser;
    } else {
      resModel.currentBookings = requestsByUser.slice(0, separatorIndex);
      resModel.pastBookings = requestsByUser.slice(separatorIndex, requestsByUser.length)
    }

    // next booking object
    const currentLength = resModel.currentBookings.length;
    if (currentLength > 0 ) {
      const acceptedBookings = resModel.currentBookings.filter(booking => booking.status == 'accepted');
      if (acceptedBookings.length > 0) {
        resModel.nextBooking = acceptedBookings[acceptedBookings.length -1];
         
        const nextBookingIndex = resModel.currentBookings.findIndex(booking => booking._id === resModel.nextBooking['_id']);
        resModel.currentBookings.splice(nextBookingIndex, 1);
      }
    }

    res.status(200).json({
      success: { resModel }
    });
  } catch (error) {
      next(error);
  } 
});

// @route UPDATE /request/accepted
// @desc Update request with approved or decline by sitter
// @access Private
exports.updateStatus = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { requestId, status } = req.body;

    const request = await Request.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ message: "Request does not exists"});
    }
    if (request.sitterId !== ObjectId(userId)) {
      return res
        .status(401)
        .json({ message: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      success: { request }
    });
  } catch (error) {
    next(error);
  }
});

