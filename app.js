const express = require('express')
const bodyParser = require('body-parser')
let items = ["Buy Food", "Cook Food", "Eat Food"]
const app = express()
const port = 2000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    let today = new Date();
    let currentDay = today.toLocaleString('en-us', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    res.render('list', {
        currentDOTW: currentDay,
        newListItems: items
    });

})

app.post("/", function (req, res) {
    let item = req.body.newItem;
    items.push(item)

    res.redirect('/')

})

app.listen(port, function () {
    console.log("server started on port " + port)
})