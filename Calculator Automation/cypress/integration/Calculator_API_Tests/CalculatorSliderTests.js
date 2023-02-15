
const slideAmountValue=()=>cy.get('#header-calculator-amount > .relative > .bb-slider__vue-slider > .vue-slider-rail > .vue-slider-dot > .vue-slider-dot-handle')
const slidePeriodValue=()=>cy.get('#header-calculator-period > .relative > .bb-slider__vue-slider > .vue-slider-rail > .vue-slider-dot > .vue-slider-dot-handle')

const inputAmount=()=>cy.get('input[name="calculator-amount"]')
const inputPeriod=()=>cy.get('input[name="calculator-period"]')

beforeEach(()=>{
 
  cy.visit('https://web-loan-application-test.bigbank.se/?amount=85000&period=120&interestRate=10.95&lang=sv&bbsource=google&bbchannel=organic')
  cy.get('.bb-edit-amount > .bb-icon--rotated-up').click()

})

describe('Amount Slider Tests',() =>
{

 it('Amount value Increment',()=>
 {
  
  slideAmountValue().click().type('{rightArrow}{rightArrow}').trigger('change')
  inputAmount().should('have.value','85 100')
  cy.log('Test is failing due to some bug') 
})
 
 it('Amount value Decrement',()=>
 {

  slideAmountValue().click().type('{leftArrow}{leftArrow}').trigger('change')
  inputAmount().should('have.value','84 900')
  cy.log('Test is failing due to some bug') 
 })

})

describe('Period Slider Tests', ()=>
{

  it('Period value Increment',()=>
  {
 
   slidePeriodValue().click().type('{rightArrow}{rightArrow}').trigger('change')
   inputPeriod().should('have.value','122')
 
  })
 
 
  it('Period value Decrement',()=>
  {
 
   slidePeriodValue().click().type('{leftArrow}{leftArrow}').trigger('change')
   inputPeriod().should('have.value','118')
 
  })

})