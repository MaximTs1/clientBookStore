import Joi from "joi";

export const structure = [
  {
    name: "firstName",
    type: "text",
    label: "First name",
    required: true,
    block: false,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last name",
    required: true,
    block: false,
  },
  {
    name: "phone",
    type: "string",
    label: "Phone Number",
    required: true,
    block: false,
  },
  {
    name: "email",
    type: "email",
    label: "email",
    required: true,
    block: false,
  },
  {
    name: "password",
    type: "password",
    label: "password",
    required: true,
    block: false,
  },
  { name: "city", type: "text", label: "city", required: true, block: false },
  {
    name: "street",
    type: "text",
    label: "Street Address",
    required: true,
    block: false,
  },
  {
    name: "houseNumber",
    type: "number",
    label: "House Number",
    required: true,
    block: false,
  },
  {
    name: "zip",
    type: "number",
    label: "Zip",
    required: true,
    block: false,
  },
];

export const pattern = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!#.])[A-Za-z\\d$@$!%*?&.]{8,20}"
);

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(200).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  password: Joi.string()
    .custom((value, helpers) => {
      if (!/[a-z]/.test(value)) {
        return helpers.error("string.pattern.lowercase");
      }
      if (!/[A-Z]/.test(value)) {
        return helpers.error("string.pattern.uppercase");
      }
      if (!/\d/.test(value)) {
        return helpers.error("string.pattern.digit");
      }
      if (!/[!@%$#^&*_()*]/.test(value)) {
        return helpers.error("string.pattern.specialCharacter");
      }
      return value;
    })
    .min(8)
    .max(20)
    .messages({
      "string.min":
        "Password should have a minimum length of {#limit} characters",
      "string.max":
        "Password should have a maximum length of {#limit} characters",
      "string.pattern.lowercase": "Password should contain a lowercase letter",
      "string.pattern.uppercase": "Password should contain an uppercase letter",
      "string.pattern.digit": "Password should contain a digit",
      "string.pattern.specialCharacter":
        "Password should contain a special character ($, @, $, !, #)",
    }),
  email: Joi.string().email({ tlds: { allow: false } }),
  city: Joi.string().min(2).required(),
  street: Joi.string().min(2).required(),
  houseNumber: Joi.number().required(),
  zip: Joi.number().required(),
});
