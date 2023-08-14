const connection = require("../config/connection");
const { Thought, User } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  const users = [
    { username: "scalynoodle", email: "ballpython@aol.com" },
    { username: "ColorfulDino", email: "peacock@gmail.com" },
    { username: "2manyShoes", email: "centipede@ymail.com" },
  ];
  await User.collection.insertMany(users);
  console.info("Users added");

  await process.exit(0);
});