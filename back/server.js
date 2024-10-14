const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const redis  = require('redis')

const taskRoutes = require('./routes/tasks')
const Task = require('./models/Task')
const app = express()
const port = process.env.PORT || 3000

const client = redis.createClient()

client.on('error', (err) => console.log('Erro de cliente Redis', err))

// (async () => {
//    await client.connect()
// })()

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api/tasks', taskRoutes)

// const cache = async (req, res, next) => {
//    const tasks = await client.get('tasks')
//    if (tasks) {
//       return res.status(200).json(JSON.parse(tasks))
//    }
//    next()
// }

mongoose.connect(process.env.URI_MONGO, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado')).catch((err) => console.log(err))

// rotas da aplicação
app.get('/', (req, res) => {
   res.send('API funcionando')
})

app.get('/api/tasks', async(req, res) => {
   const tasks = await Task.find()
   await client.set('tasks', JSON.stringify(tasks))

   res.status(200).json(tasks)
})

app.listen(port, () => console.log(`Servidor na porta ${port}`))