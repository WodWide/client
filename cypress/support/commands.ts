Cypress.Commands.add("stubGraphQL", (graphQlFixture) => {
  cy.fixture(graphQlFixture).then((mockedData) => {
    cy.on("window:before:load", (win) => {
      function fetch({ body }: any) {
        const { operationName } = JSON.parse(body);
        return responseStub(mockedData[operationName]);
      }
      cy.stub(win, "fetch").withArgs("/graphql").as("graphql").callsFake(fetch);
    });
  });
});

const responseStub = (result: any) =>
  Promise.resolve({
    json: () => Promise.resolve(result),
    text: () => Promise.resolve(JSON.stringify(result)),
    ok: true,
  });
