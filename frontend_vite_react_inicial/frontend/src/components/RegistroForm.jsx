import { useState } from 'react'
import api from '../services/api'

function RegistroForm({ onRegistroSalvo }) {
  const [form, setForm] = useState({
    nome: '',
    fazenda: '',
    servico: '',
    producao: '',
    preco: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post('/api/registros', {
        ...form,
        producao: parseFloat(form.producao),
        preco: parseFloat(form.preco)
      })

      alert('Registro salvo!')
      setForm({ nome: '', fazenda: '', servico: '', producao: '', preco: '' })
      onRegistroSalvo?.()
    } catch (error) {
      console.error('Erro ao salvar registro:', error)
      alert('Erro ao salvar registro.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
      <input name="fazenda" value={form.fazenda} onChange={handleChange} placeholder="Fazenda" required />
      <input name="servico" value={form.servico} onChange={handleChange} placeholder="Serviço" required />
      <input name="producao" type="number" value={form.producao} onChange={handleChange} placeholder="Produção" required />
      <input name="preco" type="number" value={form.preco} onChange={handleChange} placeholder="Preço" required />
      <button type="submit">Salvar</button>
    </form>
  )
}

export default RegistroForm
