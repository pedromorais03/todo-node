const express = require('express')
const router = express.Router()

const Task = require('../models/Task')


router.post('/', async (req, res) => {
   const { title } = req.body

   if(!title){
      return res.status(400).json({ message: 'Você deve inserir o título da tarefa' })
   }

   const task = new Task({ title })
   await task.save()
   res.status(201).json(task)
})

router.get('/', async (req, res) => {
   const tasks = await Task.find();
   res.status(200).json(tasks);
})

router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { completed } = req.body;
   const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
   res.status(200).json(task);
})

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   await Task.findByIdAndDelete(id);
   res.status(200).json({ message: 'Tarefa removida' });
})
 