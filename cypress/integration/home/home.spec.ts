describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should render the app", () => {
    cy.get(".index-page").should("exist");
  });
  it("should render the correct page body text", () => {
    cy.get("#index-page-description").contains(
      "A social platform for cross training athletes"
    );
  });
  it("should redirect to / when you click the home button", () => {
    cy.get("#index-page-navbar").find(".index-page__nav-item").eq(0).click();
    cy.url().should("include", "/");
  });
  it("should redirect to /about when you click the about button", () => {
    cy.get("#index-page-navbar").find(".index-page__nav-item").eq(1).click();
    cy.url().should("include", "/about");
  });
  it("should redirect to /pricing when you click the about button", () => {
    cy.get("#index-page-navbar").find(".index-page__nav-item").eq(2).click();
    cy.url().should("include", "/pricing");
  });
  it("should redirect to /contact when you click the contact button", () => {
    cy.get("#index-page-navbar").find(".index-page__nav-item").eq(3).click();
    cy.url().should("include", "/contact");
  });
  it("should redirect to /login when you click the login button", () => {
    cy.get(".index-page__button").eq(0).click();
    cy.url().should("include", "/login");
  });
  it("should redirect to /signup when you click the sign up button", () => {
    cy.get(".index-page__button").eq(1).click();
    cy.url().should("include", "/signup");
  });
  it("should redirect to /signup when you click the join us button", () => {
    cy.get("#index-page-join").click();
    cy.url().should("include", "/signup");
  });
  it("should redirect to /about when you click the learn more button", () => {
    cy.get("#index-page-learn-more").click();
    cy.url().should("include", "/about");
  });
});
