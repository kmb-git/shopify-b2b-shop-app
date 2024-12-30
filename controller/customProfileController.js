const CustomProfile = require("../models/customer");
exports.createProfile = async (req, res) => {
  try {
    const newProfile = new CustomProfile(req.body);
    await newProfile.save();
    res.status(201).json({
      success: true,
      message: "Custom Profile Created successfully!",
      data: newProfile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error Creating Custom Profile",
      error: error.message,
    });
  }
};
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await CustomProfile.find();
    res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving custom profiles",
      error: error.message,
    });
  }
};
exports.getProfileById = async (req, res) => {
  try {
    const profile = await CustomProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Custom profile not found",
      });
    }
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving custom profile",
      error: error.message,
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const updatedProfile = await CustomProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Custom profile not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Custom profile updated successfully!",
      data: updatedProfile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating custom profile",
      error: error.message,
    });
  }
};
exports.deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await CustomProfile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Custom profile not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Custom profile deleted successfully!",
      data: deletedProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting custom profile",
      error: error.message,
    });
  }
};
