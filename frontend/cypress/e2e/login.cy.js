describe("E2E — Login", () => {
  it("allows a user to log in successfully", () => {
    cy.visit("http://localhost:5173/login");

    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("123456");

    cy.contains("Se connecter").click();

    cy.url().should("include", "/user/");
  });
});
