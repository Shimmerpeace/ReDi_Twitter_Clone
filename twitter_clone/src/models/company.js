import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  industry: {
    type: String,
    required: true,
    maxlength: [60, "Industry cannot be more than 60 characters"],
  },
  founded_year: {
    type: Number,
    required: true,
  },
});

export let Company =
  mongoose.models.Company ?? mongoose.model("Company", CompanySchema);
