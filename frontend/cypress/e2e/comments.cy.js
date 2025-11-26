describe("E2E — Comment Feature", () => {
  beforeEach(() => {
    // Login first
    cy.visit("http://localhost:5173/login");

    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("123456");

    cy.contains("Se connecter").click();
  });

  it("allows a logged-in user to post a comment", () => {
    cy.visit("http://localhost:5173/idea/1");

    cy.get(".comment-input input").type("Cypress test comment");

    cy.get(".comment-input button").click();

    cy.contains("Cypress test comment").should("exist");
  });
});
