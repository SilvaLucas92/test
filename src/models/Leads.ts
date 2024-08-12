import mongoose from "mongoose";
const { Schema } = mongoose;

const leadsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Leads = mongoose.models.Leads || mongoose.model("Leads", leadsSchema);

export default Leads;
