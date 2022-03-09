import { configure, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

const config = {
  useConstraintAttrs: false,
};
configure(config);

extend("email", {
  ...email,
  message: "Invalid email address",
  initial: false,
});

extend("required", {
  ...required,
  message: "This field is required",
  initial: false,
});

extend("password", {
  validate: (value) => value.length > 8,
  message: "Password must be at least 8 characters long",
  initial: false,
});

extend("phone", {
  validate: (value) => /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/.test(value),
  message: "Phone number should have a length of 10 digits",
  initial: false,
});
