const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");
app.use(cors());

app.use(express.json());
app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);

// localhost:1000/api/v1/signup
// localhost:1000/api/v2/createtask

app.use("/",(req, res) => {
    res.send("hello backend");
});

const port = 1000;

app.listen(port, () => {
    console.log("server started");
});

