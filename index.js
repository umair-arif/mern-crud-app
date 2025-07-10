require("dotenv").config();
console.log("✅ MONGO_URL loaded:", process.env.MONGO_URL);
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected.."))
  .catch((err) => console.log("DB Error:", err));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
app.post("/user", (req, res) => {
  const { name, email, age } = req.body;
  UserModel.create({ name, email, age })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((res) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, age } = req.body;
  UserModel.findByIdAndUpdate({ _id: id }, { name, email, age })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
