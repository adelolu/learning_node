let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "password cant be short"],
  },
  profileImage: { type: String, default: "" },
});

// let saltRound = 1;
// userSchema.pre("save", function (next) {
//   console.log(this);
//   bcrypt
//     .hash(this.password, saltRound)
//     .then((password) => {
//       console.log(password);
//       this.password = password;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

const usermodel = mongoose.model("user_collection", userSchema);
module.exports = usermodel;
