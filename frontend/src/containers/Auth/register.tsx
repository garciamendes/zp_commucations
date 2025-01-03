import { Link, useNavigate } from "react-router-dom"
import { ContainerAuth, ContainerEnterInputs } from "./styles"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { api } from "../../service/api"
import { toast } from "sonner"
import { z } from "zod"
import { AxiosError, AxiosResponse } from "axios"
import { IUser } from "../../contexts/userContext"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { isObjectEmpty, localStorage } from "../../utils"

type typeStep = 'email' | 'pass'

const createUserSchema = z.object({
  email: z.string().email({ message: 'Necessário um email válido!' })
})

type ICreateUser = z.infer<typeof createUserSchema>

const definePasswordUserSchema = z.object({
  password: z.string(),
  confirm_password: z.string()
})
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: 'As senhas não são iguais',
    path: ['confirm_password']
  })
type IDefinePassword = z.infer<typeof definePasswordUserSchema>

export const Register = () => {
  const [isStepRegister, setIsStepRegister] = useState<typeStep>('email')
  const [isLoading, setIsLoading] = useState(false)
  const {
    register: registerEmail,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm<ICreateUser>({
    resolver: zodResolver(createUserSchema)
  })
  const {
    register: registerDefinePassword,
    handleSubmit: handleSubmitDefinePassword,
    reset: resetDefinePassword,
    formState: {
      errors: defineErrors
    }
  } = useForm<IDefinePassword>({
    resolver: zodResolver(definePasswordUserSchema)
  })

  const navigate = useNavigate()
  const email_user = localStorage.getItem('email_user')

  useEffect(() => {
    if (isObjectEmpty(errors)) return

    Object.values(errors).forEach((error) => toast.error(error.message))
  }, [errors])

  useEffect(() => {
    if (isObjectEmpty(defineErrors)) return

    Object.values(defineErrors).forEach((error) => toast.error(error.message))
  }, [defineErrors])

  const createUser = async (data: ICreateUser) => {
    try {
      setIsLoading(true)
      const response = await api.post('api/account', {
        email: data.email
      })

      return response.data
    } catch (error) {
      console.error(error)
      const err = error as AxiosError
      throw err.response?.data
    }
  }

  const handleCreateUser = async (data: ICreateUser) => {
    toast.promise(createUser(data), {
      loading: <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Loader2 size={30} />
        Carregando...
      </span>,
      success: (data: IUser) => {
        setIsLoading(false)
        localStorage.setItem('email_user', data.email)
        resetField('email')
        setIsStepRegister('pass')
        return 'Usuário criado com sucesso'
      },
      error: (error) => {
        console.error(error)

        if (!error?.message)
          return 'Erro ao tentar criar um novo usuário'

        return error?.message
      },
    })
  }

  const definePassword = async (data: IDefinePassword): Promise<any> => {
    try {
      setIsLoading(true)

      const response = await api.post('api/account/finish_account', {
        email: email_user as string,
        password: data.password,
        confirmPassword: data.confirm_password
      })

      return response
    } catch (error) {
      console.error(error)

      const err = error as AxiosError
      return err.response?.data
    }
  }

  const handleDefinePassword = async (data: IDefinePassword) => {
    toast.promise(definePassword(data), {
      loading: <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Loader2 size={30} />
        Carregando...
      </span>,
      success: (_response: AxiosResponse) => {
        setIsLoading(false)
        resetDefinePassword({
          password: '',
          confirm_password: ''
        })
        navigate('/login')

        return 'Senha definida com sucesso!'
      },
      error: (error) => {
        if (!error?.message)
          return 'Erro ao tentar criar um novo usuário'

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
            {...registerEmail('email')} />
        ) : (
          <>
            <strong>
              {email_user as string}
            </strong>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...registerDefinePassword('password')} />
            <input
              type="password"
              placeholder="Confirme sua senha"
              {...registerDefinePassword('confirm_password')} />
          </>
        )}

        {isStepRegister === 'email' ? (
          <button disabled={isLoading} onClick={handleSubmit(handleCreateUser)}>Definir senha</button>
        ) : (
          <button onClick={handleSubmitDefinePassword(handleDefinePassword)}>Cadastrar</button>
        )}
      </ContainerEnterInputs>

      <Link to='/'>
        <ArrowLeft />
      </Link>
    </ContainerAuth>
  )
}