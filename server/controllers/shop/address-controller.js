const mongoose = require("mongoose");
const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(200).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.error("Error in addAddress:", e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    // validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id format!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.error("Error in fetchAllAddress:", e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User-id and address-id are required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId }, // ✅ also check userId to prevent editing others' addresses
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.error("Error in editAddress:", e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User-id and address-id are required!",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully!",
    });
  } catch (e) {
    console.error("Error in deleteAddress:", e);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
