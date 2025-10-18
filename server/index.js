const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://anmolpatalay_db_user:teVgGZ8PJJ7jXyOV@cluster0.47cwnvj.mongodb.net/mernperson?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Mongo Error:", err));

// 🔹 Schema & Model
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});
const Person = mongoose.model("Person", personSchema);

// 🔹 Routes
app.get("/", (req, res) => res.send("Backend is running 🚀"));

app.post("/api/person", async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    console.log("Received data:", name, age, gender); // log incoming data

    const newPerson = new Person({ name, age, gender });
    await newPerson.save();

    res.json({ message: "Person saved!", data: newPerson });
  } catch (error) {
    console.error("Save Error:", error); // log full error
    res.status(500).json({ error: "Error saving person" });
  }
});


app.get("/api/person", async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
