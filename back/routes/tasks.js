const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

const Task = require('../models/Task')

router.post('/', async (req, res) => {
   const { title } = req.body
   const { description } = req.body
   const taskId = uuidv4()

   if(!title || !description){
      return res.status(400).json({ message: 'Você deve inserir o título da tarefa' })
   }

   const task = new Task({ taskId, title, description })
   await task.save()
   res.status(201).json(task)
})

router.get('/', async (req, res) => {
   const tasks = await Task.find()
   res.status(200).json(tasks)
})

router.put('/:id', async (req, res) => {
   const { id } = req.params
   const { completed } = req.body
   console.log(id, completed)
   const task = await Task.findByIdAndUpdate(id, { completed }, { new: true })
   res.status(200).json(task);
})

router.delete('/:id', async (req, res) => {
   const { id } = req.params
   await Task.findByIdAndDelete(id)
   res.status(200).json({ message: 'Tarefa removida' })
})


module.exports = router