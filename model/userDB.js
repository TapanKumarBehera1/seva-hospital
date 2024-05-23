const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true},
    dob: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    role: {
      type: String,
      required: true,
      enum: ["patient", "admin"],
      default: "patient",
    },
  },
  { timestamps: true }
);

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", userSchema);
