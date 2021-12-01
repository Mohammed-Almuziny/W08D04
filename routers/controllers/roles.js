const rolesModel = require("./../../db/models/roles");

const createRole = (req, res) => {
  try {
    const { role, permissions } = req.body;

    const newRole = new rolesModel({
      role,
      permissions,
    });

    newRole
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getRole = (req, res) => {
  try {
    rolesModel
      .find({})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { createRole, getRole };
