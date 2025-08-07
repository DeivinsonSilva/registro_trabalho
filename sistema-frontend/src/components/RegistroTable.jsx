import { useEffect, useState } from 'react'
import api from '../services/api'

function RegistroTable({ atualizar }) {
  const [registros, setRegistros] = useState([])

  const carregar = async () => {
    try {
      const res = await api.get('/api/registros')
      setRegistros(res.data)
    } catch (err) {
      console.error("Erro ao carregar registros:", err)
    }
  }

  useEffect(() => {
    carregar()
  }, [atualizar])

  return (
    <table border="1" style={{ marginTop: '2rem', width: '100%' }}>
      <thead>
        <tr>
          <th>Trabalhador</th>
          <th>Fazenda</th>
          <th>Serviço</th>
          <th>Produção</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((r) => (
          <tr key={r.id}>
            <td>{r.trabalhador?.nome}</td>
            <td>{r.fazenda?.nome}</td>
            <td>{r.servico?.nome}</td>
            <td>{r.producao}</td>
            <td>{r.preco}</td>
            <td>{r.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RegistroTable
