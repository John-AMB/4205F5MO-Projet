/// <reference types="cypress" />

describe("Like system", () => {
  beforeEach(() => {
    // 1. LOGIN
    cy.visit("http://localhost:5173/login");
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("123456");
    cy.contains("Se connecter").click();

    cy.url().should("include", "/user"); // successfully logged
  });

  it("User can like an idea", () => {
    cy.visit("http://localhost:5173/idea/53");
    cy.get(".heart-btn").click();
  });
});
