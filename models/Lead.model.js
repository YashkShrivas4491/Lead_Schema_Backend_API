const mongoose = require("mongoose");

// Define the schema for the Leads collection
const leadSchema = new mongoose.Schema({
  leadImage: { type: String },
  leadOwner: { type: String },
  firstName: { type: String, required: true },
  title: { type: String },
  phone: { type: String },
  mobile: { type: String },
  leadSource: { type: String },
  industry: { type: String },
  annualRevenue: { type: Number },
  emailOptOut: { type: Boolean, default: false },
  company: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  fax: { type: String },
  website: { type: String },
  leadStatus: { type: String },
  numberOfEmployees: { type: Number },
  rating: { type: String },
  skypeID: { type: String },
  secondaryEmail: { type: String },
  twitter: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  description: { type: String },
  linkedInProfile: { type: String },
  preferredContactMethod: { type: String },
  leadScore: { type: Number },
  referralSource: { type: String },
  interestLevel: { type: String },
  nextFollowUpDate: { type: Date },
  timeZone: { type: String },
});

// Create the model from the schema
const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
