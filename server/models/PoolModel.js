import mongoose from "mongoose";

const PoolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  candidates:{
    type: Array,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },

},{
  timestamps: true
});

export default mongoose.model("Pool", PoolSchema);
