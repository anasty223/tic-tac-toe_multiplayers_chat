import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
const app = express();

app.use(cors());
app.use(express.json());
const api_key = "duh9vykpu5fj";
const api_secret =
  "eym92ajr3d29a7trwkkh39xjnr272hp969buv37a3spbf3fhnvyq5qe6kr2h9ubk";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "PUT");
  res.header("Access-Control-Allow-Headers", "Content-type,Accept");
  if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "PUT");
  res.header("Access-Control-Allow-Headers", "Content-type,Accept");
  if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not found" });
    // const token = serverClient.createToken(userId);
    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
// const api_key = "duh9vykpu5fj";
// const api_secret =
  // "eym92ajr3d29a7trwkkh39xjnr272hp969buv37a3spbf3fhnvyq5qe6kr2h9ubk";