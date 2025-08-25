import mongoose from "mongoose";

const suplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

const SuplierModel = mongoose.model("Suplier", suplierSchema);

export default SuplierModel;
