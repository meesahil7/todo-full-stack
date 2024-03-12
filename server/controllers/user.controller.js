const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0 && user[0].password === password) {
      const token = jwt.sign({ userId: user[0]._id }, process.env.SECRET_KEY);
      res.status(200).send({ message: "Logged in successfully", token });
    } else {
      res.status(401).json({ message: "Wrong credentials" });
    }
  } catch (err) {
    console.log(err);
    res.send("Wrong credentials");
  }
};

module.exports = { loginController };
