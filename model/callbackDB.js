const mongoose = require("mongoose");
const { Schema } = mongoose;

const callbackSchema = new Schema(
  {
    mobile: { type: Number, required: true },
    callStatus: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

const virtual = callbackSchema.virtual("id");
virtual.get(() => {
  return this._id;
});

callbackSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Callback = mongoose.model("Callback", callbackSchema);
