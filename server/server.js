const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const AuthenticationRoutes = require("./route/authenticationRoutes");
const ProductRoutes = require("./route/productRoutes");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const version = "v1" ;
app.use(`/${version}/auth`, AuthenticationRoutes);
app.use(`/${version}/product`, ProductRoutes);

//Test API
app.get("/", async (req, res) => {
    res.send("Live You've made the right choice by choosing Our Team!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
