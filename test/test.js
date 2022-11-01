const server  =  require('../index')
const API = 'http://localhost:5000'
const { expect } = require('chai')
const chai = require('chai')
const chaiHTTP = require('chai-http')

chai.should()

chai.use(chaiHTTP)

describe('Points API',  () => {

  // POST call for addPoints
  describe(" add points transactions", () => {
    it("This should succeed ", (done) => {
      const transaction = {"payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z"}
      chai.request(API)
          .post("/addPoints")
          .send(transaction)
          .end((err, res) => {
            res.should.have.status(200)
            expect(res.body.transaction).to.deep.equal(transaction)
          done()
          })
    })
    
    describe(" add points transactions", () => {
        it("This should succeed ", (done) => {
          const transaction = { "payer": "UNILEVER", "points": 200, "timestamp": "2022-10-31T11:00:00Z" }
          chai.request(API)
              .post("/addPoints")
              .send(transaction)
              .end((err, res) => {
                res.should.have.status(200)
                expect(res.body.transaction).to.deep.equal(transaction)
              done()
              })
        })
    })
    describe(" add points transactions", () => {
        it("This should succeed ", (done) => {
            const transaction = { "payer": "DANNON", "points": -200, "timestamp": "2022-10-31T15:00:00Z" }
            chai.request(API)
                .post("/addPoints")
                .send(transaction)
                .end((err, res) => {
                res.should.have.status(200)
                expect(res.body.transaction).to.deep.equal(transaction)
                done()
                })
        })
    })
    describe(" add points transactions", () => {
        it("This should succeed ", (done) => {
            const transaction = { "payer": "MILLER COORS", "points": 10000, "timestamp": "2022-11-01T14:00:00Z" }
            chai.request(API)
                .post("/addPoints")
                .send(transaction)
                .end((err, res) => {
                res.should.have.status(200)
                expect(res.body.transaction).to.deep.equal(transaction)
                done()
                })
        })
    })
    describe(" add points transactions", () => {
        it("This should succeed ", (done) => {
            const transaction = { "payer": "DANNON", "points": 1000, "timestamp": "2022-11-02T14:00:00Z" }
            chai.request(API)
                .post("/addPoints")
                .send(transaction)
                .end((err, res) => {
                res.should.have.status(200)
                expect(res.body.transaction).to.deep.equal(transaction)
                done()
                })
        })
    })

    it("This should fail", (done) => {
      const transaction = {"p": "DANNON", "p": 300, "t": "2020-10-31T10:00:00Z", "extra": "extra"}
      chai.request(API)
          .post("/addPoints")
          .send(transaction)
          .end((err, res) => {
            res.should.have.status(400)
          done()
          })
    })
    
  })

  
  //POST call to spend the points
  describe("Spend user points ", () => {
      it("Should spend points available", (done) => {
          const spend = {"points":  5000}
          const response  = [
            { "payer": "DANNON", "points": -100 },
            { "payer": "UNILEVER", "points": -200 },
            { "payer": "MILLER COORS", "points": -4700 }
            ]
            
          chai.request(API)
          .post("/spendPoints")
          .send(spend)
          .end((err, res) => {
              res.should.have.status(200)
              expect(res.body).to.deep.equal(response)
              done()
            })
        })
    })
    describe("Spend user points ", () => {
        it("Should fail", (done) => {
            const spend = {"sdf":  's0'}
            chai.request(API)
            .post("/spendPoints")
            .send(spend)
            .end((err, res) => {
                res.should.have.status(400)
                done()
              })
          })
      })

    // GET call to get current points
    describe("Get current points", () => {
      it("Should display all the points by payer", (done) => {
        const points = {"DANNON": 1000,
            "UNILEVER" : 0,
            "MILLER COORS": 5300}            
        chai.request(API)
          .get("/")
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            expect(res.body).to.deep.equal(points)
          done()
          })
      })
    })

})






