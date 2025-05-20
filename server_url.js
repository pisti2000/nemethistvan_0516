
const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());


const port = 3000;
const Url = "https://jsonplaceholder.typicode.com/users";


app.get("/", async (req, res) => {
  try {
    const users = await axios.get(Url);
    res.json(users.data);
  } catch (error) {
    res.status(500).json({ message: "Hiba történt a felhasználók lekérésekor." });
  }
});


app.post("/users", async (req, res) => {
  const user = req.body;

  if (!user.id) {
    return res.status(400).json({ message: "Kérlek, adj meg egy 'id' mezőt!" });
  }

  try {
    const response = await axios.post(Url, user);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Nem sikerült hozzáadni a felhasználót." });
  }
});


app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const newInfo = req.body;

  try {
    const response = await axios.put(`${Url}/${userId}`, newInfo);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Nem sikerült frissíteni a felhasználót." });
  }
});


app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await axios.delete(`${Url}/${userId}`);
    res.json({ message: `A(z) ${userId} azonosítójú felhasználó törölve lett.` });
  } catch (error) {
    res.status(500).json({ message: "Nem sikerült törölni a felhasználót." });
  }
});


app.listen(port, () => {
  console.log(`A szerver elindult a ${port}-as porton.`);
});
