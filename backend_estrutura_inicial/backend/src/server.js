require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const registrosRoutes = require('./routes/registro.routes')

app.use(cors())
app.use(express.json())

app.use('/api/registros', registrosRoutes)

app.get('/', (req, res) => res.send('API funcionando!'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

