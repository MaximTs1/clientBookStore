import Joi from "joi";

export const structure = [
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    block: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
    block: true,
  },
];

export const pattern = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!#.])[A-Za-z\\d$@$!%*?&.]{8,20}"
);

export const loginSchema = Joi.object({
  password: Joi.string()
    .required()
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
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
});
