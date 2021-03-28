const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require('cors')


const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/keeperDB", {useNewUrlParser: true, useUnifiedTopology: true}); 

const noteSchema = {
    title: String,
    content: String
}

const Note = mongoose.model("Note", noteSchema);

app.get("/", function(req, res) {
    Note.find({},(err, notes)=>  {
        res.json(notes);
    })
})

app.post("/", function(req, res) {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    })
    note.save(err => {
        if(!err) {
            res.send("Successfully saved note")
        }
    })
    
})

app.delete("/:id", (req, res) => {
    const mainID = req.params.id;
    Note.findByIdAndDelete(mainID, (err) => {
        if(!err) {
            console.log("Successfully deleted requested Note");
        } else {
            console.log(err);
        }
    })
})

app.listen(PORT, () => {
    console.log("server running on 3001")
})