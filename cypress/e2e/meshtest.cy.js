describe("React Three Fiber Scene", () => {
    it("waits for the server to be ready", () => {
      cy.visit("http://localhost:5173/");
      cy.wait(2000); // Wait for the server to fully load
      cy.get("canvas").should("be.visible"); // Check if Three.js canvas is loaded
    });
  });