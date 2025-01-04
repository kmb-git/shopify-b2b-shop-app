const CustomProfile = require("../models/customer");
const ShopifyService = require("../services/shopifyServices");

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

    let params = {
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: profile.email,
      // phone: profile.phone,
      company: profile.company || null, // Add company if available
      // taxNumber: profile.tax || null,
      notes: profile.note || null,
      address: {
        address1: profile.address1 || null,
        address2: profile.address2 || null,
        city: profile.city || null,
        province: profile.state || null,
        zip: profile.zip || null,
        country: profile.country || null,
      },
    };
    let shopifyCustomer = await ShopifyService.createCustomerAccount(params);
    console.log(shopifyCustomer);
    res.redirect("/home/customer/list"); // Redirect to the profiles list
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
    res.redirect("/home/customer/list"); // Redirect to the profiles list
  } catch (error) {
    res.status(500).send("Error deleting profile: " + error.message);
  }
};
