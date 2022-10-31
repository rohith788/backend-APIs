const { application } = require('express')
const express = require('express')
const app = express() //importing and using express to use server functionalities with node js
const PORT = 5000 //hosting the application on port 8000


var totalPoints = 0
var pointsPerPayer = {}
var transactions = []
app.use(express.json())
//function to split the data time value to a more useable format
var time_date = (date_time) => {
    var split_data = date_time.split("T")
    console.log(split_data)
    split_data[1].slice(split_data[1].length - 1)
    date = split_data[0].split()
    return split_data
}

app.post('/addPoints', 
    (req, res) => 
    {   //storing the data in variables
        var payer = req.body.payer
        var points = req.body.points
        var transactionTime = req.body.timestamp
        
        //checking in the buyer already exists
        if (payer in pointsPerPayer) {
            // checking if the points are going into -ve
            if (pointsPerPayer[payer] + points < 0){return res.status(400).json({ error: "Unable to add transaction", reason: "Payer Points is turing Negative"})}
            else { 
                pointsPerPayer[payer] += points 
                totalPoints += points
                transactions.push({'payer': payer, 'points': points, 'time': transactionTime})
                transactions = transactions.sort((a, b) => {
                    return (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0);
                })
                }
        }//if buyer dosnt exist
        else {
            // checking if the points are going into -ve
            if (points >= 0) {
                pointsPerPayer[payer] = points
                totalPoints += points
                transactions.push({'payer': payer, 'points': points, 'time': transactionTime})
                transactions = transactions.sort((a, b) => {
                    return (a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0);
                })
            }
            else return res.status(400).json({ error: "Unable to add transaction", reason: "User has no payer points to spend"})
        }
        console.log(transactions)
        res.status(200).json({ success: "success", transaction: req.body})
    }
)

app.post('/spendPoints', (req, res) => {
    var pointsToSpend = parseInt(req.body.points)
    if (pointsToSpend <= 0) res.status(400).json({ error: "Unable to perform transaction", reason: "there are no points or is -ve"})
    if (pointsToSpend > totalPoints) res.status(400).json({ error: "Unable to perform transaction", reason: "user does not have enough points"})
    var points_spent = {}
    var counter = 0
    var indexes = []
    while (pointsToSpend > 0){
        var payer = transactions[counter]['payer']
        var points = transactions[counter]['points']
        if (points === pointsToSpend){
            if (payer in points_spent) points_spent[payer] += pointsToSpend
            else points_spent[payer] = pointsToSpend
            pointsPerPayer[payer] -= pointsToSpend
            pointsToSpend = 0
            indexes.push(counter)
        }
        else if (points > pointsToSpend){
            if (payer in points_spent) points_spent[payer] += pointsToSpend
            else points_spent[payer] = pointsToSpend
            transactions[counter]['points'] -= pointsToSpend
            pointsPerPayer[payer] -= pointsToSpend
            pointsToSpend = 0
        }
        else{
            console.log(pointsToSpend)
            points_spent[payer] = points
            pointsToSpend -= points
            pointsPerPayer[payer] -= points
            indexes.push(counter)
        }
        counter++
    }
    totalPoints -= pointsToSpend
    for( let i = indexes.length - 1; i >= 0; i--){
        transactions.splice(i, 1)
    }
    console.log(points_spent)
    res.status(200).json(points_spent)
})

app.get('/', (req, res) => res.send(pointsPerPayer)) // display the total points remaining for the user

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)) //setting up server on the port 