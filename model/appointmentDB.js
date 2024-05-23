const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    patient: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    gender: { type: String, required: true },
    date: { type: String, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    department: { type: String, required: true },
    address: { type: String, required: true },
    visited: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, default: "confirmed" },
    reason: { type: String, default: "" },
  },
  { timestamps: true }
);

const virtual = appointmentSchema.virtual("id");
virtual.get(() => {
  return this._id;
});

appointmentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Appointment = mongoose.model("Appointment", appointmentSchema);
