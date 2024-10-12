const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const redis  = require('redis')

const taskRoutes = require('./routes/tasks')
const app = express()
const port = process.env.PORT || 3000

const client = redis.createClient()

client.on('error', (err) => console.log('Erro de cliente Redis', err))

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api/tasks', taskRoutes)

// mongoose.connect(process.env.URI_MONGO, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// }).then(() => console.log('MongoDB conectado')).catch((err) => console.log(err))

// rotas da aplicação
app.get('/', (req, res) => {
   res.send('API funcionando')
})

app.listen(port, () => console.log(`Servidor na porta ${port}`))