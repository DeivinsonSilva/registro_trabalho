import { useState } from 'react'
import api from '../services/api'

function RegistroForm({ onRegistroSalvo }) {
  const [form, setForm] = useState({
    trabalhador: '',
    fazenda: '',
    servico: '',
    producao: '',
    preco: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
      setForm({ trabalhador: '', fazenda: '', servico: '', producao: '', preco: '' })
      onRegistroSalvo?.()
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Trabalhador:</label>
      <input name="trabalhador" value={form.trabalhador} onChange={handleChange} required />

      <label>Fazenda:</label>
      <input name="fazenda" value={form.fazenda} onChange={handleChange} required />

      <label>Serviço:</label>
      <input name="servico" value={form.servico} onChange={handleChange} required />

      <label>Produção:</label>
      <input name="producao" type="number" value={form.producao} onChange={handleChange} required />

      <label>Preço:</label>
      <input name="preco" type="number" value={form.preco} onChange={handleChange} required />

      <button type="submit">Salvar</button>
    </form>
  )
}

export default RegistroForm
