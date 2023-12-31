export const isValidName = (name) => {
  const regex = /^[a-zA-Z\s]{3,30}$/;
  return regex.test(name);
};

export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const isValidPhoneNumber = (phone) => {
  const regex = /^05\d{8}$/; // Starts with 05 and followed by 8 digits
  return regex.test(phone);
};

export const isValidAddress = (address) => {
  const regex = /^[A-Za-z0-9.\s]{3,50}$/; // Allows letters, numbers, periods, and spaces
  return regex.test(address);
};

export const isValidCity = (city) => {
  const regex = /^[a-zA-Z\s]{2,20}$/; // Adjust length as needed
  return regex.test(city);
};

export const isValidPostalCode = (postalCode) => {
  const regex = /^\d{7}$/; // For 5-digit zip codes
  return regex.test(postalCode);
};

export const isValidCardNumber = (cardNumber) => {
  const regex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
  return regex.test(cardNumber);
};

export const isValidExpiryDate = (expiryDate) => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  return regex.test(expiryDate);
};

export const isValidCVV = (cvv) => {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
};

export const validations = [
  {
    field: "fullName",
    validate: isValidName,
    errorMessage: "*Invalid full name",
  },
  {
    field: "email",
    validate: isValidEmail,
    errorMessage: "*Invalid email address",
  },
  {
    field: "phone",
    validate: isValidPhoneNumber,
    errorMessage: "*Invalid phone number",
  },
  {
    field: "address",
    validate: isValidAddress,
    errorMessage: "*Invalid address",
  },
  {
    field: "city",
    validate: isValidCity,
    errorMessage: "*Invalid city name",
  },
  {
    field: "postalCode",
    validate: isValidPostalCode,
    errorMessage: "*Invalid zip number",
  },
  {
    field: "cardNumber",
    validate: isValidCardNumber,
    errorMessage: "*Invalid card number",
  },
  {
    field: "cardFullName",
    validate: isValidName,
    errorMessage: "*Invalid card name",
  },
  {
    field: "expDate",
    validate: isValidExpiryDate,
    errorMessage: "*Invalid expiry date",
  },
  {
    field: "cvv",
    validate: isValidCVV,
    errorMessage: "*Invalid CVV number",
  },
];
