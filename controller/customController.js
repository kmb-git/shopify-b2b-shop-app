const CustomProfile = require("../models/customer");

/**
 * Fetch all custom profiles
 */
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await CustomProfile.find();
    res.render("profiles", { profiles }); // Render the Pug view with profiles
  } catch (error) {
    res.status(500).send("Error fetching profiles: " + error.message);
  }
};

/**
 * Approve a custom profile
 */
exports.approveProfile = async (req, res) => {
  try {
    const profile = await CustomProfile.findByIdAndUpdate(
      req.params.id,
      { account_status: "active" },
      { new: true }
    );
    if (!profile) {
      return res.status(404).send("Profile not found");
    }
    res.redirect("/profiles"); // Redirect to the profiles list
  } catch (error) {
    res.status(500).send("Error approving profile: " + error.message);
  }
};

/**
 * Delete a custom profile
 */
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await CustomProfile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).send("Profile not found");
    }
    res.redirect("/profiles"); // Redirect to the profiles list
  } catch (error) {
    res.status(500).send("Error deleting profile: " + error.message);
  }
};
