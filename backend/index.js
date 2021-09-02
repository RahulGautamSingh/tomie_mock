const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const sequelize = require("./util/database");
const { Op } = require("sequelize");
const User = require("./models/user");
const path = require("path");
const multer = require("multer");
const { resolveSoa } = require("dns");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const multipart = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("static"));
//server sync
sequelize
  .sync()
  .then(() => {
    console.log("db is ready");
  })
  .catch((err) => {
    console.log(err);
  });
//endpoint to serve images
app.get("/static/uploads/:file(*)", (req, res) => {
  console.log(file);
  let file = req.params.file;

  let fileLocation = path.join("./static/uploads" + file);
  //res.send({image: fileLocation});
  res.sendFile(`${file}`, { root: "static/uploads" });
});
//user-signup
app.post("/users", multipart.single("image"), (req, res) => {
  req.body.image = req.file.path;
  User.create(req.body)
    .then(() => {
      res.send({ msg: "User is created." });
    })
    .catch((err) => res.status(400).send({ msg: err.messsage }));
});
//reading users based on id
app.get("/users", async (req, res) => {
  let users = await User.findAll({
    where: {
      id: [1, 2, 3],
    },
  }).catch((err) => res.status(400).send({ msg: err.messsage }));

  res.send({ users: users });
});
//update user password using email
app.post("/users", async (req, res) => {
  let users = await User.update(
    { password: req.body.password },
    {
      where: {
        email: req.body.email,
      },
    }
  )
    .then(() => {
      res.send({ msg: "User updated." });
    })
    .catch((err) => res.status(400).send({ msg: err.messsage }));
});
//delete a user using name & email
app.delete("/users", async (req, res) => {
  try {
    User.destroy({
      where: {
        [Op.and]: [
          {
            name: {
              [Op.like]: req.body.name,
            },
          },
          {
            email: {
              [Op.like]: req.body.email,
            },
          },
        ],
      },
    });
    res.send({ msg: "User deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.messsage });
  }
});
const port = 3200;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
