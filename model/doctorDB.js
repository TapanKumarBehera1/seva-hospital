const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  doctor: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: String, required: true },
  fee: { type: Number, required: true, min: [1, "wrong min price"] },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  email: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  age: { type: Number, required: true },
  mobile: { type: String, required: true },
  photo: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/ds0ojjzzd/image/upload/v1716350710/docHolder_ypkf22.jpg",
  },
});

const virtual = doctorSchema.virtual("id");
virtual.get(() => {
  return this._id;
});

doctorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Doctor = mongoose.model("Doctor", doctorSchema);
