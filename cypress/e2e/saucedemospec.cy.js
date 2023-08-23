//import chai from 'chai';
//import { before } from 'cypress/types/lodash';



describe('Sauce Demo Testing', () => {

let username='[data-test="username"]';
let password='[data-test="password"]';
let login='[data-test="login-button"]';
let error='[data-test="error"]';

  let saucedemodata;
    before(() => {        
      cy.fixture('saucedemo').then((testData) =>
     {           
      saucedemodata = testData        
    });     
  })




  it('Invalid login', () => {
   
    cy.visit('/');
    cy.get(username).type('locked_out_user');
    cy.get(password).type('secret_sauce');
    cy.get(login).click();

    cy.get(error).should('be.visible');
    
    
  });

 
  it('Order Checkout', function() {
   
    cy.visit('/');
   

    cy.get(username).type(saucedemodata.username);
    cy.get(password).type(saucedemodata.password);
    cy.get(login).click();

    cy.get('#item_1_title_link > div').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('.shopping_cart_link').click();

    cy.get('.inventory_item_price').should('contain.text',saucedemodata.tshirtbaseprice);
    cy.get('[data-test="continue-shopping"]').click();

    cy.get('#item_4_title_link').click();
    cy.get('.inventory_details_price').should('contain.text',saucedemodata.backpackbaseprice);
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('.shopping_cart_link').click();
    
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type(saucedemodata.firstname);
    cy.get('[data-test="lastName"]').type(saucedemodata.lastname);
    cy.get('[data-test="postalCode"]').type(saucedemodata.postcode);
    cy.get('[data-test="continue"]').click();

    const tshirtpricestring=saucedemodata.tshirtbaseprice.split('$');
    const tshirtpricenum=tshirtpricestring[1];

    const backpackpricestring=saucedemodata.backpackbaseprice.split('$');
    const backpackpricenum=backpackpricestring[1];

    const tshirtpriceInt=parseFloat(tshirtpricenum);
    const backpackpriceInt=parseFloat(backpackpricenum);

    const totalpriceInt=tshirtpriceInt + backpackpriceInt;
    
    cy.get('.summary_subtotal_label').should('contain.text',totalpriceInt)
    
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('contain.text','Thank you for your order!');

  });
})