describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should render the login page", () => {
    cy.get(".login-page").should("exist");
  });
  it("should render the correct page body text", () => {
    cy.get("#login-page-description").contains(
      "Login to start your journey as a cross-training athlete/coach"
    );
  });
  it("should display proper error message when both inputs are empty", () => {
    cy.get("#login-page-submit").click();
    cy.get("#login-page-error").contains("Please fill in all fields");
  });
  it("should display proper error message when username input is empty", () => {
    cy.get("#password").type("password");
    cy.get("#login-page-submit").click();
    cy.get("#login-page-error").contains("Please fill in all fields");
  });
  it("should display proper error message when password input is empty", () => {
    cy.get("#username").type("username");
    cy.get("#login-page-submit").click();
    cy.get("#login-page-error").contains("Please fill in all fields");
  });
  it("should redirect to /signup when register button is clicked", () => {
    cy.get("#login-page-signup-button").click();
    cy.url().should("eq", "http://localhost:3000/signup");
  });
  it("should display an error message because of invalid server", () => {
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "tokenAuth") {
        req.reply({ fixture: "invalid-login.json" });
      }
    });
    cy.fixture("user.json").then(({ user }) => {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-page-submit").click();
    });
    cy.get("#login-page-error").contains("Error: Invalid email or password");
  });
  it("Should login", () => {
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "tokenAuth") {
        req.reply({ fixture: "valid-login.json" });
      }
    });
    cy.fixture("user.json").then(({ user }) => {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-page-submit").click();
    });
    cy.url().should("eq", "http://localhost:3000/");
  });
});
