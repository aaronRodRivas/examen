const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { addToBlacklist } = require("../utils/accessTokenBlacklist");
const { TareasModel } = require("../models/tarea.model");

//create
router.post("/task/create", async (req, res) => {
    try {
        if (req.body) {
            const task = await TareasModel.create({
                nombre: req.body.nombre,
                comentario: req.body.comentario,
                activa: req.body.activa
            });
            res.status(201).json({ message: "Task created!", task });
        } else {
            console.error(error);
            res.status(500).json({ message: "Error on body" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Create Task Error" });
    }
});

//read
router.get("/task/read", async (req, res) => {
    try {
        const task = await TareasModel.findAll();
        res.status(201).json({ message: "Read OK!", task });
    } catch (error) {
        res.status(500).json({ message: "Read Task Error" });
    }
});



//update
router.put("/task/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, comentario, activa } = req.body;
        const task = await TareasModel.findByPk(id);
        if (!task) return res.status(400).json({ message: "task with id " + id + " not found" })
        task.nombre = nombre;
        task.comentario = comentario;
        task.activa = activa;
        await task.save();
        res.status(201).json({ message: "Update OK!", task });
    } catch (error) {
        res.status(500).json({ message: "Edit Task Error" });
    }
});

//delete
router.delete("/task/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await TareasModel.findByPk(id);
      if (!task) return res.status(400).json({ message: "task with id " + id +  " not found"})
      await task.destroy();
      res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Delete Task Error" });
    }
  });


/*

// CRUD Sequelize
// GET
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users })
  } catch (error) {
    res.status(500).json({ message: "Error en MySQL" });
  }
});
// POST
router.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en MySQL" });
  }
});
// PUT
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(400).json({ message: "user with id " + id +  " not found"})
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en MySQL" });
  }
});
// DELETE
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(400).json({ message: "user with id " + id +  " not found"})
    await user.destroy();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en MySQL" });
  }
});

*/

module.exports = router;