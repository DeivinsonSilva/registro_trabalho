const express = require('express')
const router = express.Router()
const prisma = require('../db')

// GET todos os registros
router.get('/', async (req, res) => {
  try {
    const registros = await prisma.registro.findMany({
      include: {
        trabalhador: true,
        fazenda: true,
        servico: true,
      },
      orderBy: { data: 'desc' }
    })
    res.json(registros)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST novo registro
router.post('/', async (req, res) => {
  const { trabalhador, fazenda, servico, producao, preco } = req.body
  try {
    // cria ou conecta trabalhador, fazenda, serviço
    const t = await prisma.trabalhador.upsert({
      where: { nome: trabalhador },
      update: {},
      create: { nome: trabalhador }
    })

    const f = await prisma.fazenda.upsert({
      where: { nome: fazenda },
      update: {},
      create: { nome: fazenda }
    })

    const s = await prisma.servico.upsert({
      where: { nome: servico },
      update: {},
      create: { nome: servico }
    })

    const total = producao * preco

    const novo = await prisma.registro.create({
      data: {
        producao,
        preco,
        total,
        trabalhadorId: t.id,
        fazendaId: f.id,
        servicoId: s.id
      }
    })

    res.json(novo)
  } catch (err) {
  console.error("Erro ao salvar registro:", err)
  res.status(500).json({ error: err.message || "Erro desconhecido" })
}

})

module.exports = router
