import { Link, redirect, useNavigate } from "react-router-dom"
import { ContainerAuth, ContainerEnterInputs } from "./styles"
import { ArrowLeft, Loader2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { api } from "../../service/api"
import { toast } from "sonner"
import { isObjectEmpty, localStorage } from "../../utils"

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Informe um email válido!' }),
  password: z.string()
})
type ILoginUser = z.infer<typeof loginUserSchema>

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ILoginUser>({ resolver: zodResolver(loginUserSchema) })

  const navigate = useNavigate()

  useEffect(() => {
    if (isObjectEmpty(errors)) return

    Object.values(errors).forEach((error) => toast.error(error.message))
  }, [errors])

  const handleSendLogin = async (data: ILoginUser) => {
    setIsLoading(true)

    api.post('api/account/authenticate', {
      email: data.email,
      password: data.password
    })
      .then(response => {
        reset({
          email: '',
          password: ''
        })

        localStorage.setItem('token', response.data.token)

        navigate('/home')
      })
      .catch((error: AxiosError<any>) => {
        console.error(error)
        const message = error.response?.data.message as string

        if (message)
          toast.error(message)
        else
          toast.error('Erro ao tentar fazer o login')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <ContainerAuth>
      <ContainerEnterInputs>
        <input
          type="text"
          placeholder="Digite seu email"
          {...register('email')} />

        <input
          type="password"
          placeholder="Digite sua senha"
          {...register('password')} />

        <button
          disabled={isLoading}
          onClick={handleSubmit(handleSendLogin)}>
          {isLoading ? (
            <Loader2 className="animation-loader" size={15} />
          ) : (
            <span>Entrar</span>
          )}
        </button>
      </ContainerEnterInputs>

      <Link to='/'>
        <ArrowLeft />
      </Link>
    </ContainerAuth>
  )
}