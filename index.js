const { application } = require('express')
const express = require('express')
const app = express() //importing and using express to use server functionalities with node js
const PORT = 5000 //hosting the application on port 8000


var totalPoints = 0
var pointsPerPayer = {}
var transactions = []
app.use(express.json())
// //function to split the data time value to a more useable format
// var time_date = (date_time) => {
//     var split_data = date_time.split("T")
//     console.log(split_data)
//     split_data[1].slice(split_data[1].length - 1)
//     date = split_data[0].split()
//     return split_data
// }


var addNegPoints = (points, payer) => {//function to add a negative points tranaction
    var pvePoitns = Math.abs(points) // getting the absolute points to avoid confucion during later steps
    var indexes = [] // using array to store indexes becase we cannot delete the element form the array furing the transaction
    var c = transactions.length - 1
    while (pvePoitns > 0){
        var payerForThisTransaction = transactions[c]['payer']
        var pointsForThisTransaction = transactions[c]['points']
        if (payerForThisTransaction === payer ){//searching for the payer
        if(pvePoitns === pointsForThisTransaction){//condition for tranaction points equal to point we need to remove
                pvePoitns = 0// the points have been used up
                indexes.push(c)//adding index to delete
            }
            else if(pvePoitns < pointsForThisTransaction){
                transactions[c]['points'] -= pvePoitns
                pvePoitns = 0
            }
            else{
                pvePoitns -= pointsForThisTransaction
                indexes.push(c)
            }
        }
        c--
    }
    //updating totals
    totalPoints += points
    pointsPerPayer[payer] += points
    for (let i = indexes.length - 1; i >= 0; i--){
        transactions.splice(i,1)
    }

}

app.post('/addPoints', 
    (req, res) => 
    {   //storing the data in variables
        var payer = req.body.payer
        var points = req.body.points
        var transactionTime = req.body.timestamp
        
        if (points === 0) res.status(400).json({ error: "Unable to add transaction", reason: "Points is 0"})
        
        else if (points < 0) addNegPoints(points, payer)

        else{
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
        }
        console.log(transactions)
        res.status(200).json({ success: "success", transaction: req.body})
    }
)

app.post('/spendPoints', (req, res) => {
    if(transactions.length === 0) res.status(400).json({error: "no points to spend"})
    if (req.body.points) var pointsToSpend = parseInt(req.body.points) // getiing the input
    else res.status(400).json({ error: "Unable to perform transaction", reason: "points not provided"})
    //error messages for edge cases
    if (pointsToSpend <= 0) res.status(400).json({ error: "Unable to perform transaction", reason: "there are no points or is -ve"})
    if (pointsToSpend > totalPoints) res.status(400).json({ error: "Unable to perform transaction", reason: "user does not have enough points"})
    var points_spent = {}
    var counter = 0
    var indexes = []
    //loop until all the points are spent
    while (pointsToSpend > 0){
        var payer = transactions[counter]['payer']
        var points = transactions[counter]['points']
        if (points === pointsToSpend){//condition in the points in that transaction is perfectly equal to the number of points we need to spend
            if (payer in points_spent) points_spent[payer] += pointsToSpend//update the payer/points spent
            else points_spent[payer] = pointsToSpend
            pointsPerPayer[payer] -= pointsToSpend//upating the spent points
            pointsToSpend = 0//all the points have been assigned
            indexes.push(counter)//storing index to delete the element later
        }
        else if (points > pointsToSpend){//condition if the tranaction has more points than we need to spend
            if (payer in points_spent) points_spent[payer] += pointsToSpend//update the payer/points spent
            else points_spent[payer] = pointsToSpend
            transactions[counter]['points'] -= pointsToSpend//updating the points for the transaction
            pointsPerPayer[payer] -= pointsToSpend//upating the spent points
            pointsToSpend = 0//all the points have been assigned
        }
        else{//condition where the points for the tranaction is less then the needed point 
            points_spent[payer] = points//update the payer/points spent
            pointsToSpend -= points//upadtin the points to see how much more we have to spend
            pointsPerPayer[payer] -= points //upating the spent points
            indexes.push(counter)//storing index to delete the element later
        }
        counter++
    }
    totalPoints -= pointsToSpend // updating the total points left for the user 
    for( let i = indexes.length - 1; i >= 0; i--){//loop to delete the tranactions used 
        transactions.splice(i, 1)
    }
    var points_spent_array = []
    for( const key in points_spent){
        points_spent_array.push( {'payer' : key , 'points' : (points_spent[key] * (-1))})
    }
    res.status(200).json(points_spent_array)
})

app.get('/', (req, res) => res.send(pointsPerPayer)) // display the total points remaining for the user

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)) //setting up server on the port 