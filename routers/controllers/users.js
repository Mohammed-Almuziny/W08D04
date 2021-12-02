const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const usersModel = require("./../../db/models/users");

const SALT = Number(process.env.SALT);
const SECRET = process.env.SECRETKEY;

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const savedEmail = email.toLowerCase();
    const savedPassword = await bcrypt.hash(password, SALT);

    const newUser = new usersModel({
      name,
      email: savedEmail,
      password: savedPassword,
      role,
    });

    newUser
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const logIn = (req, res) => {
  try {
    const { nameOrEmail, password } = req.body;

    const savedEmail = nameOrEmail.toLowerCase();

    console.log(nameOrEmail);

    usersModel
      .findOne({
        $or: [{ name: nameOrEmail }, { email: savedEmail }],
        isDel: false,
      })
      .then(async (result) => {
        if (result) {
          if (result.email === savedEmail || result.name === nameOrEmail) {
            const savedPassword = await bcrypt.compare(
              password,
              result.password
            );

            if (savedPassword || result.name === nameOrEmail) {
              const payload = {
                role: result.role,
                id: result._id,
              };

              const options = {
                expiresIn: "60m",
              };

              const token = await jwt.sign(payload, SECRET, options);

              res.status(200).json({ result, token });
            } else {
              res.status(400).json({ message: "invalid email or password" });
            }
          } else {
            res.status(400).json({ message: "invalid email or password" });
          }
        } else {
          res.status(404).json({ message: "email dose not exist" });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllUsers = (req, res) => {
  try {
    usersModel.find({ isDel: false }).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = (req, res) => {
  try {
    usersModel
      .findByIdAndUpdate(req.params.id, { isDel: true })
      .then((result) => {
        if (!result.isDel) res.status(200).json(result);
        else res.status(404).json({ message: "user dose not exist" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register, logIn, getAllUsers, deleteUser };
