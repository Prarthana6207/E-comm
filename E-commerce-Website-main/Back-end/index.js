const express = require("express");
require("./db/config");
const product = require("./db/product");
const User = require("./db/user");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "no user found" });
  }
});

app.post("/add-product", async (req, resp) => {
  let Product = new product(req.body);
  let result = await Product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let Products = await product.find();

  if (Products.length > 0) {
    resp.send(Products);
  } else {
    resp.send({ result: "no product found" });
  }
});

app.delete("/product/:id", async (req, resp) => {
  // resp.send("working")
  const result = await product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  const result = await product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "no product found" });
  }
});

app.put("/product/:id", async (req, resp) => {
  let result = await product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

app.listen(5000);
