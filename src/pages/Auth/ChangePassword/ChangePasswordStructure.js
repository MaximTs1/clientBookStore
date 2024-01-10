import Joi from "joi";

export const structure = [
  {
    name: "password",
    type: "password",
    label: "My Password",
    required: true,
    block: true,
  },
  {
    name: "newPassword",
    type: "password",
    label: "New Password",
    required: true,
    block: true,
  },
  {
    name: "confirmNewPassword",
    type: "password",
    label: "Confirm New Password",
    required: true,
    block: true,
  },
];

export const resetPasswordStructure = [
  {
    name: "resetPassword",
    type: "password",
    label: "Reset Password",
    required: true,
    block: true,
  },
  {
    name: "confirmResetPassword",
    type: "password",
    label: "Confirm Reset Password",
    required: true,
    block: true,
  },
];

// check why "-" is not allowed
export const ChangePasswordSchema = Joi.object({
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

      //   "any.required": "My Password cannot be empty",
    }),
  newPassword: Joi.string()
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
        "New Password should have a minimum length of {#limit} characters",
      "string.max":
        "New Password should have a maximum length of {#limit} characters",
      "string.pattern.lowercase":
        "New Password should contain a lowercase letter",
      "string.pattern.uppercase":
        "New Password should contain an uppercase letter",
      "string.pattern.digit": "New Password should contain a digit",
      "string.pattern.specialCharacter":
        "New Password should contain a special character ($, @, $, !, #)",
      //   "any.required": "New Password cannot be empty",
    }),
  confirmNewPassword: Joi.string()
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
    .valid(Joi.ref("newPassword"))
    .min(8)
    .max(20)

    .messages({
      "any.only": "Passwords do not match",
      "string.min":
        "Confirm New Password should have a minimum length of {#limit} characters",
      "string.max":
        "Confirm New Password should have a maximum length of {#limit} characters",
      "string.pattern.lowercase":
        "New Password should contain a lowercase letter",
      "string.pattern.uppercase":
        "New Password should contain an uppercase letter",
      "string.pattern.digit": "New Password should contain a digit",
      "string.pattern.specialCharacter":
        "New Password should contain a special character ($, @, $, !, #)",
      "any.required": "Confirm New Password cannot be empty",
    }),
});

//ForgotPasswordEmailSchema

export const ForgotPasswordEmailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
});

//ResetPasswordSchema

export const ResetPasswordSchema = Joi.object({
  resetPassword: Joi.string()
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
      "any.only": "Passwords do not match",
      "string.min":
        "Confirm New Password should have a minimum length of {#limit} characters",
      "string.max":
        "Confirm New Password should have a maximum length of {#limit} characters",
      "string.pattern.lowercase":
        "New Password should contain a lowercase letter",
      "string.pattern.uppercase":
        "New Password should contain an uppercase letter",
      "string.pattern.digit": "New Password should contain a digit",
      "string.pattern.specialCharacter":
        "New Password should contain a special character ($, @, $, !, #)",
      "any.required": "Rest Password cannot be empty",
    }),

  confirmResetPassword: Joi.string()
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
    .valid(Joi.ref("resetPassword"))
    .min(8)
    .max(20)

    .messages({
      "any.only": "Passwords do not match",
      "string.min":
        "Confirm New Password should have a minimum length of {#limit} characters",
      "string.max":
        "Confirm New Password should have a maximum length of {#limit} characters",
      "string.pattern.lowercase":
        "New Password should contain a lowercase letter",
      "string.pattern.uppercase":
        "New Password should contain an uppercase letter",
      "string.pattern.digit": "New Password should contain a digit",
      "string.pattern.specialCharacter":
        "New Password should contain a special character ($, @, $, !, #)",
      "any.required": "Confirm Reset Password cannot be empty",
    }),
});

export default ResetPasswordSchema;
