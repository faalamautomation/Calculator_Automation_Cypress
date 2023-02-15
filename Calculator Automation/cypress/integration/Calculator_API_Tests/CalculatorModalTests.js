/// <reference types="cypress" />

const inputAmount=()=>cy.get('input[name="calculator-amount"]')
const inputPeriod=()=>cy.get('input[name="calculator-period"]')
const outResult=()=>cy.get('.bb-calculator__result-for-sliders p.bb-labeled-value__value')
const savecalculator=()=>cy.get('.bb-modal__footer >.bb-button--block')
const amountlabel=()=>cy.get('.bb-edit-amount__content > .bb-edit-amount__amount')


beforeEach(()=>{
 
  cy.visit('https://web-loan-application-test.bigbank.se/?amount=85000&period=120&interestRate=10.95&lang=sv&bbsource=google&bbchannel=organic')
  cy.get('.bb-edit-amount > .bb-icon--rotated-up').click()
  cy.intercept('POST','https://web-loan-application-test.bigbank.se/api/v1/loan/calculate', {statusCode:200}).as('getresponse')
 
})

describe( 'BigBank Application Under Test',()=>
{
  
  it('Testing Minimum Range of Loan Amount and Period',()=>
  {

   inputAmount().click().clear()  //amount input
   inputAmount().type('10000')

   inputPeriod().click().clear() //period
   inputPeriod().type('12') 
   
   outResult().click()
  
   cy.wait('@getresponse')
  
   outResult().then(($el)=>
  {
    
    const amount=$el.text().replace('SEK\n','').replace('\u00A0','')
    const amt=parseFloat(amount.replace(',', '.'))
    expect(amt).to.be.lessThan(1000)
    expect(amt).to.be.greaterThan(500)
    
  })
 })

 it('Testing Middle Range of Loan Amount and Period',()=>
 {

  inputAmount().click().clear()  //amount input
  inputAmount().type('125000')

  inputPeriod().click().clear() //period
  inputPeriod().type('72') 
  
  outResult().click()
 
  cy.wait('@getresponse')
 
  outResult().then(($el)=>
  {
   
   const amount=$el.text().replace('SEK\n','').replace('\u00A0','')
   const amt=parseFloat(amount.replace(',', '.'))
  // expect(amt).to.equal(2430.44)
   expect(amt).to.be.lessThan(2500)
   expect(amt).to.be.greaterThan(2000)
   
   })

  })

  it('Testing Maximum Range of Loan Amount and Period',()=>
  {
 
   inputAmount().click().clear()  //amount input
   inputAmount().type('250000')
 
   inputPeriod().click().clear() //period
   inputPeriod().type('144') 
   
   outResult().click()
  
   cy.wait('@getresponse')
  
   outResult().then(($el)=>
   {
    
    const amount=$el.text().replace('SEK\n','').replace('\u00A0','')
    const amt=parseFloat(amount.replace(',', '.'))
   // expect(amt).to.equal(3195.63)
    expect(amt).to.be.lessThan(3500)
    expect(amt).to.be.greaterThan(3000)
    
    })
 
   })
 
  it('Negative Scenario for Loan Amount Should Fail',()=>
  {
  

    cy.log("Minimum Acceptable Amount of Loan is 10000 SEK")
    
  
     inputAmount().click().clear()  //amount input
     inputAmount().type('2000')
     
     outResult().click()

     inputAmount().should('have.value', '2000')
  
  
  })

  it('Negative Scenario for Loan Period Should Fail',()=>
  {
    cy.log("Minimum Acceptable Period of Loan is 12 Months")

     inputPeriod().click().clear() //period
     inputPeriod().type('5')

     outResult().click()

     inputPeriod().should('have.value','5')

  })

  it('Negative Scenario for Loan Amount with 0 Should Fail',()=>
  {
  

    cy.log("Minimum Acceptable Amount of Loan is 10000 SEK")
    
  
     inputAmount().click().clear()  //amount input
     inputAmount().type('0')
     
     outResult().click()

     inputAmount().should('have.value', '0')
  })

  it('Negative Scenario for Loan Period 0 Should Fail',()=>
  {
    cy.log("Minimum Acceptable Period of Loan is 12 Months")

     inputPeriod().click().clear() //period
     inputPeriod().type('0')

     outResult().click()

     inputPeriod().should('have.value','0')

  })

  it('Negative Scenario for Loan Amount with float Should Fail',()=>
  {
  
    cy.log("Minimum Acceptable Amount of Loan is 10000 SEK")
    
  
     inputAmount().click().clear()  //amount input
     inputAmount().type('0.123')
     
     outResult().click()

     inputAmount().should('have.value', '0.123')
  })

  it('Negative Scenario for Loan Period float Should Fail',()=>
  {
    cy.log("Minimum Acceptable Period of Loan is 12 Months")

     inputPeriod().click().clear() //period input
     inputPeriod().type('0.6')

     outResult().click()

     inputPeriod().should('have.value','0.6')

  })

  it('Negative Scenario for Loan Amount with below 0 Should Fail',()=>
  {
    cy.log("Minimum Acceptable Amount of Loan is 10000 SEK")
    
  
     inputAmount().click().clear()  //amount input
     inputAmount().type('-10000')
     
     outResult().click()

     inputAmount().should('have.value', '-10000')
  })

  it('Negative Scenario for Loan Amount with above max Should Fail',()=>
  {
    cy.log("Maximum Acceptable Amount on Loan is 250000 SEK")
    
  
     inputAmount().click().clear()  //amount input
     inputAmount().type('300000')
     
     outResult().click()

     inputAmount().should('have.value', '300000')
  })



  it('Negative Scenario for Loan Period below 0 Should Fail',()=>
  {
    cy.log("Minimum Acceptable Period of Loan is 12 Months")

     inputPeriod().click().clear() //period
     inputPeriod().type('-12')

     outResult().click()

     inputPeriod().should('have.value','-12')

  })

  it('Negative Scenario for Loan Period above max Should Fail',()=>
  {
    cy.log("Maximum Acceptable Period of Loan is 144 Months")

     inputPeriod().click().clear() //period
     inputPeriod().type('150')

     outResult().click()

     inputPeriod().should('have.value','150')

  })
  
  
  it('Checking Save Functionality of Calculator',()=>
  {
    //cy.log("Checking Save Functionality of Calculator")

    inputAmount().click().clear()  //amount input
    inputAmount().type('175000')
    inputPeriod().click().clear() //period
    inputPeriod().type('30')

    outResult().click()
    
    savecalculator().click()

    amountlabel().should('contain','175000')

  })

})