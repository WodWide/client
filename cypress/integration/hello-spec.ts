describe("App", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("renders the app", function () {
    cy.get(".index-page").should("exist");
  });
});
