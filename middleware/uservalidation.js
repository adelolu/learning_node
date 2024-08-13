const yup = require("yup");
let emailreq = /^[a-zA-Z0-9_.*-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;

const uservalidation = yup.object({
  username: yup
    .string()
    .required("username is required")
    .max(15, "username cannot be more than 15 chara"),
  email: yup
    .string()
    .matches(emailreq, " must be a valid email")
    .required("email is required"),
  password: yup
    .string()
    .min(5, "password is too short")
    .required("password is required"),
});

module.exports = { uservalidation };
