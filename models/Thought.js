const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Format timestamp
thoughtSchema.virtual("formatDate").get(function () {
  return this.createdAt.toString();
});

// Return number of reactions on a thought.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Export model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;