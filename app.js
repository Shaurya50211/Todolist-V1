const express = require('express')
const bodyParser = require('body-parser')
let items = []
let workItems = []
const app = express()
const port = 2000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))

app.get("/", function (req, res) {
    let today = new Date();
    let currentDay = today.toLocaleString('en-us', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    res.render('list', {
        listTitle: currentDay,
        newListItems: items
    });

})

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect('/')
    }

})

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
})

app.get("/about", function (req, res) { 
    res.render("about")
 })

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item)
    res.redirect("/work")
  })

app.listen(port, function () {
    console.log("server started on port " + port)
})