const Joi = require("joi");
const errorResponse = require("../../utils/errorResponse");

const validateUserSchema = Joi.object({
  username: Joi.string().min(3).max(40).required().label("invalid username"),
  name: Joi.string().min(3).max(40).required().label("invalid name"),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .label("invalid email"),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    )
    .required()
    .label("invalid password"),
  mobile: Joi.string()
    .pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .required()
    .label("invalid mobile number"),
});

// const user = {
//   username: "nokheta",
//   name: "nasdfa",
//   email: "nsfha@gmail.com",
//   password: "Aadsfh00#",
//   address: "aasqwla",
//   mobile: "+23435235418",
// };

const validateUser = async (req, res, next) => {
  try {
    const { username, name, email, password, address, mobile } = req.body;
    const user = {
      username: username,
      name: name,
      email: email,
      password: password,
      mobile: mobile,
    };
    console.log(req.body);
    await validateUserSchema.validateAsync(user);
    req.user = { ...user, address };
    next();
  } catch (err) {
    console.log(err.details[0].context.label);
    next(new errorResponse(err.details[0].context.label, "400"));
  }
};

module.exports = validateUser;
