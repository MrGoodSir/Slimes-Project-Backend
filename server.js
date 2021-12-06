///////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();

const { PORT = 3001, DATABASE_URL } = process.env;

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////

mongoose.connect(DATABASE_URL);

mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You rae disconnected from MongoDB"))
  .on("error", (error) => console.log(error));


///////////////////////////////
// MODELS
////////////////////////////////

const SlimesSchema = new mongoose.Schema({
    name: String,
    dietType: String,
    favFood: String,
    favToy: String,
    image: String,
    slimeType: String,
    color: String,
})

const Slimes = mongoose.model("Slimes", SlimesSchema)

///////////////////////////////
// MiddleWare
////////////////////////////////

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

///////////////////////////////
// ROUTES
////////////////////////////////

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/home", async (req, res) => {
    console.log("hello haylie faggot")
    // try {
    //     res.json(await Slimes.find({}));
    // } catch (error) {
    //     res.status(400).json(error);
    // }
});

app.get("/home/slimes", async (req, res) => {
    try {
        res.json(await Slimes.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.post("/home/slimes", async (req, res) => {
    try {
        res.json(await Slimes.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.delete("home/slimes/:id", async (req, res) => {
    try {
        res.json(await Slimes.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.put("/home/slimes/:id", async (req, res) => {
    try {
        res.json(await Slimes.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error);
    }
})

app.get("/home/foods", async (req, res) => {
    try {
        res.json(await Foods.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.post("/home/foods", async (req, res) => {
    try {
        res.json(await Foods.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})

app.delete("/home/foods/:id", async (req, res) => {
    try {
        res.json(await Foods.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.put("/home/foods/:id", async (req, res) => {
    try {
        res.json(await )
    }
})

app.get("/home/toys", async (req, res) => {
    try {
        res.json(await Toys.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.post("/home/toys", async (req, res) => {
    try {
        res.json(await Toys.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})








app.listen(PORT, () => console.log(`We are up and running on PORT ${PORT}`));
