const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,3}$/,
        `Please use format "name@email.com".`,
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Return number of friends.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Export model
const User = model("user", userSchema);

module.exports = User;