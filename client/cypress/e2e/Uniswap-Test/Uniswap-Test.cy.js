/// <reference types="cypress" />

context("Test Uniswap App", ()=> {
    beforeEach(()=> {
        cy.visit('http://localhost:3000')
    });

    it("Checks If the Connect Wallet Button is Present",  ()=> {
        cy.get('img', {
            name: /uniswap\-logo/i
          });
          cy.get('#__next > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)')
          cy.get('#__next > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)> div:nth-child(1)').click();
        
    })
    
    // it("Send Eth To An Address", ()=> {
    //     cy.get('#__next > div > div:nth-child(2) > div > div:nth-child(2)').type('0.0005')
    //     cy.get('#__next > div > div:nth-child(2) > div > div:nth-child(3)').type('0x3e189aBbe5B61213645DeeCF137F7Ba22e40F67E')
    //     cy.get('#__next > div > div:nth-child(2) > div > div:nth-child(4)').click();
    //     // cy.get('input').should('have.value', '').type('0x3e189aBbe5B61213645DeeCF137F7Ba22e40F67');
    // })
})