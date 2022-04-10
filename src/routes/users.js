// const { Router } = require('express');
// const router = Router();

const express = require("express");
const router = express.Router();
const userProfile = require("../models/userProfileModel");
const auth = require("../middleware/auth");
const imageUpload = require("../models/imageUploadModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

//@route  POST api/v1/userProfile
//@desc   Create a userProfile
//@access private
const createUserProfile = async (req, res) => {
  // const id = req.params.id;
  const { user } = req;
  const {
    image,
    userName,
    title,
    jobStatus,
    email,
    phoneNumber,
    bio,
    resumeURL,
    accountStatus,
    technicalSkills1,
    technicalSkills2,
    technicalSkills3,
    otherSkills1,
    otherSkills2,
    otherSkills3,

    projectTitle1,
    projectDescription1,
    projectLink1,
    projectTitle2,
    projectDescription2,
    projectLink2,
    projectTitle3,
    projectDescription3,
    projectLink3,
  } = req.body;

  const newUserProfile = new userProfile({
    image,
    user,
    userName,
    title,
    jobStatus,
    email,
    phoneNumber,
    bio,
    resumeURL,
    accountStatus,
    technicalSkills1,
    technicalSkills2,
    technicalSkills3,
    otherSkills1,
    otherSkills2,
    otherSkills3,  

    projectTitle1,
    projectDescription1,
    projectLink1,
    projectTitle2,
    projectDescription2,
    projectLink2,
    projectTitle3,
    projectDescription3,
    projectLink3,
  });

  newUserProfile
    .save()
    .then((userProfile) => res.json({userProfile,
      message:`Information Sent`,}))
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `Check your input information`,
      });
    });
};

//@route  Get api/v1/profile
//@desc   Get All userProfile
//@access Public
const getAllUserProfiles = (req, res) => {
  userProfile
    .find()
    .populate("profileImage")
    .sort({ date: -1 })
    .then((userProfiles) => res.json(userProfiles))
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `server error`,
        error: error,
      });
    });
};

//@route  get api/v1/userProfile/:userProfileId/
//@desc   get a userProfile
//@access Public
const getAUserProfile = (req, res) => {
  const userProfileId = req.params.userProfileId;
  userProfile
    .find({ _id: userProfileId })
    .sort({ date: -1 })
    .then((userProfiles) => {
      if (!userProfiles) {
        return res
          .status(404)
          .send(`no such id ${userId}`)
          .json({
            message: `No such id ${userId}`,
          });
      }
      res.json(userProfiles);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .send(`Invalid user id ${userId}`)
        .json({
          message: `Invalid user id ${userId}`,
        });
    });
};

//@route  Put api/v1/userProfile
//@desc   Edit a userProfile
//@access Public
const editAUserProfile = (req, res) => {
  const id = req.params.userProfileId;
  const {
    image,
    userName,
    title,
    jobStatus,
    email,
    phoneNumber,
    bio,
    resumeURL,
    accountStatus,
    technicalSkills1,
    technicalSkills2,
    technicalSkills3,
    otherSkills1,
    otherSkills2,
    otherSkills3,

    projectTitle1,
    projectDescription1,
    projectLink1,
    projectTitle2,
    projectDescription2,
    projectLink2,
    projectTitle3,
    projectDescription3,
    projectLink3,
  } = req.body;

  userProfile
    .updateOne(
      { _id: id },
      {
        image,
        userName,
        title,
        jobStatus,
        email,
        phoneNumber,
        bio,
        resumeURL,
        accountStatus,
          technicalSkills1,
      technicalSkills2,
      technicalSkills3,
      otherSkills1,
      otherSkills2,
      otherSkills3,

        projectTitle1,
        projectDescription1,
        projectLink1,
        projectTitle2,
        projectDescription2,
        projectLink2,
        projectTitle3,
        projectDescription3,
        projectLink3,
      }
    )
    // new code
    .then((userProfiles) => {
      if (!userProfiles) {
        return res.status(404).json(`no such id ${id}`);
      }
    })
    .then(() => {
      userProfile.findOne({ _id: id }).then((result) => res.json({result,
        message:`Information Sent`,}));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
        message: `server error`,
      });
    });
};

//@route  Delete api/userProfile
//@desc   Delete an userProfile
//@access Public
const deleteAUserProfile = (req, res) => {
  userProfile
    .findById(req.params.id)
    .then((userProfile) =>
      userProfile.remove().then(() =>
        res.json({
          Success: true,
          message: `information deleted`,
        })
      )
    )
    .catch((err) =>
      res.status(404).json({ error: err.message, Success: false })
    );
};

module.exports = {
  createUserProfile,
  getAllUserProfiles,
  getAUserProfile,
  editAUserProfile,
  deleteAUserProfile,
};
