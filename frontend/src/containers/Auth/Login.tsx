import { Link } from "react-router-dom"
import { ContainerAuth, ContainerEnterInputs } from "./styles"
import { ArrowLeft } from "lucide-react"

export const Login = () => {

  return (
    <ContainerAuth>
      <ContainerEnterInputs>
        <input type="text" placeholder="Digite seu email" />

        <input type="password" placeholder="Digite sua senha" />

        <button>Entrar</button>
      </ContainerEnterInputs>

      <Link to='/'>
        <ArrowLeft />
      </Link>
    </ContainerAuth>
  )
}