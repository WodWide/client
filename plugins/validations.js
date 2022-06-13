import { configure, extend } from "vee-validate";
import { required, email, digits, numeric } from "vee-validate/dist/rules";

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

extend("digits", {
  ...digits,
  message: "Invalid number of digits",
  initial: false,
});

extend("numeric", {
  ...numeric,
  message: "Must be numeric",
  initial: false,
});
