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
    slimeType: String,
    color: String,
    image: String,
})

const Slimes = mongoose.model("Slimes", SlimesSchema)

const FoodsSchema = new mongoose.Schema({
    name: String,
    maxHarvest: String,
    foodType: String,
    decayTime: String,
    favoriteOf: String,
    image: String,
})

const Foods = mongoose.model("Foods", FoodsSchema)

const ToysSchema = new mongoose.Schema({
    name: String,
    favoriteOf: String,
    price: String,
    image: String,
})

const Toys = mongoose.model("Toys", ToysSchema)

///////////////////////////////
// MiddleWare
////////////////////////////////

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

///////////////////////////////
// ROUTES
////////////////////////////////

app.get("/slimes", async (req, res) => {
    try {
        res.json(await Slimes.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.post("/slimes", async (req, res) => {
    try {
        res.json(await Slimes.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.delete("/slimes/:id", async (req, res) => {
    try {
        res.json(await Slimes.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.put("/slimes/:id", async (req, res) => {
    try {
        res.json(await Slimes.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error);
    }
})

app.get("/foods", async (req, res) => {
    try {
        res.json(await Foods.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.post("/foods", async (req, res) => {
    try {
        res.json(await Foods.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})

app.delete("/foods/:id", async (req, res) => {
    try {
        res.json(await Foods.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.put("/foods/:id", async (req, res) => {
    try {
        res.json(await Foods.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error);
    }
})

app.get("/toys", async (req, res) => {
    try {
        res.json(await Toys.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.post("/toys", async (req, res) => {
    try {
        res.json(await Toys.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})

app.delete("/toys/:id", async (req, res) => {
    try {
        res.json(await Toys.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.put("/toys/:id", async (req, res) => {
    try {
        res.json(await Toys.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
        res.status(400).json(error);
    }
})








app.listen(PORT, () => console.log(`We are up and running on PORT ${PORT}`));
