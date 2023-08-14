const { User, Thought } = require("../models");

module.exports = {
    //get all users
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // get single user by ID
    getUser(req, res) {
        User.findOne({_id: req.params.userId})
        .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: `User ${req.params.userId} not found` })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    // create new user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: `User ${req.params.userId} not found` })
              : res.json(user)
        )
          .catch((err) => res.status(500).json(err));
    },
    //delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
              ? res.status(404).json({ message: `User not found` })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
        .then(() => res.json({ message: "User profile deleted" }))
        .catch((err) => res.status(500).json(err));
    },
    // Add friend
     createFriend(req, res) {
       User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
       )
        .then((user) =>
           !user
             ? res
                 .status(404)
                 .json({ message: `User ${req.params.userId} not found` })
             : res.json(user)
       )
        .catch((err) => res.status(500).json(err));
    },
    //Delete friend
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
       )
        .then((user) =>
           !user
             ? res
                .status(404)
                 .json({ message: `User ${req.params.userId} not found` })
             : res.json(user)
       )
        .catch((err) => res.status(500).json(err));
    },       
};