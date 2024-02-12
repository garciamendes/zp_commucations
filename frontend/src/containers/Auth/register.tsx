import { Link } from "react-router-dom"
import { ContainerAuth, ContainerEnterInputs } from "./styles"
import { ArrowLeft } from "lucide-react"
import { useContext, useState } from "react"
import { api } from "../../service/api"
import { toast } from "sonner"
import { ZodError, z } from "zod"
import { AxiosError } from "axios"
import { IUser, UserContext } from "../../contexts/userContext"

type typeStep = 'email' | 'pass'

export const Register = () => {
  const [isStepRegister, setIsStepRegister] = useState<typeStep>('email')
  const [isLoading, setIsLoading] = useState(false)
  const [emailForm, setEmailForm] = useState('')

  const { user, setStateUser } = useContext(UserContext)

  const createUser = async () => {
    const createUser = z.object({
      email: z.string().email()
    })

    const { email } = createUser.parse({ email: emailForm })

    try {
      setIsLoading(true)
      const response = await api.post('api/account', {
        email
      })

      return response.data
    } catch (error) {
      const err = error as AxiosError
      throw err.response?.data
    }
  }

  // const definePassword = async () => {}

  const handleCreateUser = async () => {
    toast.promise(createUser, {
      loading: 'Carregando...',
      success: (data: IUser) => {
        setEmailForm('')
        setIsLoading(false)
        setIsStepRegister('pass')
        setStateUser(data)
        return 'Usuário criado com sucesso'
      },
      error: (error) => {
        if (error instanceof ZodError) {
          return 'Preencha com um email válido'
        }

        return error?.message
      },
    })
  }

  return (
    <ContainerAuth>
      <ContainerEnterInputs>
        {isStepRegister === 'email' ? (
          <input
            type="text"
            placeholder="Digite um email"
            value={emailForm}
            onChange={event => setEmailForm(event.target.value)} />
        ) : (
          <>
            <strong>{user.email}</strong>
            <input type="password" placeholder="Digite sua senha" />
            <input type="password" placeholder="Confirme sua senha" />
          </>
        )}

        {isStepRegister === 'email' ? (
          <button disabled={isLoading} onClick={handleCreateUser}>Definir senha</button>
        ) : (
          <button onClick={() => setIsStepRegister('email')}>Cadastrar</button>
        )}
      </ContainerEnterInputs>

      <Link to='/'>
        <ArrowLeft />
      </Link>
    </ContainerAuth>
  )
}