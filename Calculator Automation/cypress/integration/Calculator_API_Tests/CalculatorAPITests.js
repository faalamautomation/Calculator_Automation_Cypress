const endpointurl='https://web-loan-application-test.bigbank.se/api/v1/loan/calculate'

class CalculatorDataAPI
{

constructor(maturity=12,amount=10000,monthlyPaymentDay=27)
{
        this.maturity= maturity
        this.amount=amount  
        this.monthlyPaymentDay=monthlyPaymentDay
}

}

const reqbody=(x)=>{ 
  const data=
      {
        "maturity":x.maturity,
        "amount": x.amount,
        "productType": "LOANSE02",
        "interestRate": 10.95,
        "monthlyPaymentDay": x.monthlyPaymentDay,
        "administrationFee": 40,
        "conclusionFee": 695,
        "currency": "SEK"
       }
   return data
}

describe('Calculate API Endpoint Test',()=>{

    it('Happy Path Scenario where amount and period are given in defined range', ()=>{
      
        let b1=new CalculatorDataAPI()
        const requestbody=reqbody(b1)

        cy.request('POST', endpointurl, requestbody).then(function(response)
        {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
             expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
             expect(response.body.apr).to.be.greaterThan(0)

        })

    })
  
    it('Happy Path Scenario where amount and period are in mid ranges', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.maturity=72
        b1.amount=125000
        const requestbody=reqbody(b1)

        cy.request('POST', endpointurl, requestbody).then(function(response)
        {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
             expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
             expect(response.body.apr).to.be.greaterThan(0)

        })

    })

    it('Happy Path Scenario where amount and period  are max', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.maturity=144
        b1.amount=250000
        const requestbody=reqbody(b1)

        cy.request('POST', endpointurl, requestbody).then(function(response)
        {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
             expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
             expect(response.body.apr).to.be.greaterThan(0)

        })

    })
  
    it('Unhappy Scenario where period is below 0', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.maturity=-12
        const requestbody=reqbody(b1)

        cy.request('POST', endpointurl, requestbody).then(function(response)
        {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body.totalRepayableAmount).equals(0)
             expect(response.body.monthlyPayment).equals(0)
             expect(response.body.apr).to.be.greaterThan(0)

        })

    })

    it('Unhappy Scenario where amount is 0', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.amount=0
        const requestbody=reqbody(b1)

        cy.request({method:'POST', url:endpointurl, requestbody,failOnStatusCode: false}).then(function(response)
        {
             
             expect(response.status).eq(400)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body[2].message).equals("should have required property 'amount'")

             //expect(response.body.error.code).eq(500)
           //  expect(response.body.monthlyPayment).equals(0)
             //expect(response.body.apr).to.be.greaterThan(0)

        })
    })

    it('Unhappy Scenario where period is 0', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.maturity=0
        const requestbody=reqbody(b1)

        cy.request({method:'POST', url:endpointurl, requestbody,failOnStatusCode: false}).then(function(response)
        {
             
             expect(response.status).eq(400)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body[0].message).equals("should have required property 'maturity'")

        })
    })


    it('Unhappy Scenario where amount and period is float', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.maturity=0.6
        b1.amount=0.98
        const requestbody=reqbody(b1)

        cy.request({method:'POST', url:endpointurl, requestbody,failOnStatusCode: false}).then(function(response)
        {
             
             expect(response.status).eq(400)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body[0].message).equals("should have required property 'maturity'")
             expect(response.body[2].message).equals("should have required property 'amount'")

        })
    })

    it('Unhappy Scenario where amount is string', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.amount="^%^&34as"
        const requestbody=reqbody(b1)

        cy.request({method:'POST', url:endpointurl, requestbody,failOnStatusCode: false}).then(function(response)
        {
             
             expect(response.status).eq(400)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body[2].message).equals("should have required property 'amount'")
             expect(response.body[14].message).equals("should match exactly one schema in oneOf")
        })
    })

    it('Unhappy Scenario where period is string', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.maturity="^%^&34as"
        const requestbody=reqbody(b1)

        cy.request({method:'POST', url:endpointurl, requestbody,failOnStatusCode: false}).then(function(response)
        {
             
             expect(response.status).eq(400)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body[0].message).equals("should have required property 'maturity'")
             expect(response.body[14].message).equals("should match exactly one schema in oneOf")
        })
    })

    it('Unhappy Scenario where monthly payment day is wrong', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.monthlyPaymentDay=1
        const requestbody=reqbody(b1)

        cy.request('POST', endpointurl, requestbody).then(function(response)
        {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
             expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
             expect(response.body.apr).to.be.greaterThan(0)
             
        })
    })


    it('Unhappy Scenario where Loan amount is above maximum', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.amount=300000
        const requestbody=reqbody(b1)

        cy.request('POST', endpointurl, requestbody).then(function(response)
        {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
             expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
             expect(response.body.apr).to.be.greaterThan(0)
             
        })
    })



    it('Unhappy Scenario where Loan period is above maximum', ()=>{
      
        let b1=new CalculatorDataAPI()
        b1.maturity=150
        const requestbody=reqbody(b1)

        cy.request('POST', endpointurl, requestbody).then(function(response)
        {
             
             expect(response.status).eq(200)
             expect(response.headers).to.include({'content-type':'application/json; charset=utf-8','server':'cloudflare'})
             expect(response.body.totalRepayableAmount).to.be.greaterThan(b1.amount)
             expect(response.body.monthlyPayment).to.be.greaterThan(b1.amount/b1.maturity)
             expect(response.body.apr).to.be.greaterThan(0)
             
        })
    })

})