import validator from "validator";

function dataValidation(req) {
  const errors = {};

  const { firstName, lastName, emailId, password, age, photo_url } = req || {};

  if (!firstName || !lastName || !emailId || !password || !age || !photo_url) {
    throw new Error("Please fill all the mandatory fields.");
  }

  if (!firstName || firstName.length < 4 || firstName.length > 50) {
    throw new Error(
      "First name is required and must be between 4 and 50 characters."
    );
  }
  if (
    !lastName ||
    typeof lastName !== "string" ||
    lastName.length < 4 ||
    lastName.length > 50
  ) {
    throw new Error(
      "Last name is required and must be between 4 and 50 characters."
    );
  }
  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Invalid Email Id");
  }
  if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Weak password");
  }

  if (!photo_url || !validator.isURL(photo_url)) {
    throw new Error("please provide a valid photo url");
  }

  if (
    age === undefined ||
    age === null ||
    typeof age !== "number" ||
    age < 18 ||
    age > 50
  ) {
    throw new Error("Age is required and must be between 18 and 50.");
  }
}
export default dataValidation;
