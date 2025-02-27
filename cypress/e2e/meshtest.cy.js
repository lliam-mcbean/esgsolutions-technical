describe("React Three Fiber Scene", () => {
    it("renders canvas and calls click event", () => {
        cy.visit("http://localhost:5173/")

        cy.window().then((win) => {
            cy.spy(win.console, 'log').as('consoleLog');
        });
        
        cy.get('canvas')
        .wait(3000)
        .click(400, 300) 
        .then(() => {
            cy.get('@consoleLog').should('be.calledWith', 'Clicked!');
            cy.window().then((win) => {
                let foundObject;
                win.scene.traverse((child) => {
                    if (child.userData && child.userData.testid === "r3f-sphere") {
                        foundObject = child;
                    }
                });
                console.log('Found object:', foundObject);
                expect(foundObject).to.exist;
              });
        });
    });
  });