const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const virtual = messageSchema.virtual("id");
virtual.get(() => {
  return this._id;
});

messageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Message = mongoose.model("Message", messageSchema);
