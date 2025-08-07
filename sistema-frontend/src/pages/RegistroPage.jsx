import { useState } from 'react'
import RegistroForm from '../components/RegistroForm'
import RegistroTable from '../components/RegistroTable'

function RegistroPage() {
  const [atualizar, setAtualizar] = useState(false)

  const recarregarTabela = () => setAtualizar(!atualizar)

  return (
    <>
      <RegistroForm onRegistroSalvo={recarregarTabela} />
      <RegistroTable atualizar={atualizar} />
    </>
  )
}

export default RegistroPage
