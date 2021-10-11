const User = require("./models/User");
const Joi = require("joi");

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
  address: Joi.string().label("invalid address"),
  mobile: Joi.string()
    .pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .required()
    .label("invalid mobile number"),
});

const user = {
  username: "asdf",
  name: "nokha",
  email: "nokha@gmail.com",
  password: "Akash00#",
  address: 'adsd9fjasdf9',
  mobile: "+916909557218",
};

const validator = async () => {
  try {
    const value = await validateUserSchema.validateAsync(user);
  } catch (err) {
    console.log(err.details[0].context.label);
  }
};

validator();
