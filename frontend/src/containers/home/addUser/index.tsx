import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { api } from "../../../service/api"
import { useEffect } from "react"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "sonner"
import { isObjectEmpty } from "../../../utils"
import { useCurrentUser } from "../../../hooks/useUser"

export interface IInvitationAddUserProps {
  isActiveAddUser: boolean
}

const invitationAddUserSchema = z.object({
  emailFriend: z.string().email({ message: 'Necessario o email' })
})
type invitationAddUser = z.infer<typeof invitationAddUserSchema>

export const InvitationAddUser = ({ isActiveAddUser }: IInvitationAddUserProps) => {
  const { user } = useCurrentUser()

  const { register, handleSubmit, resetField, formState: { errors } } = useForm<invitationAddUser>({
    resolver: zodResolver(invitationAddUserSchema)
  })

  useEffect(() => {
    if (isObjectEmpty(errors)) return

    Object.values(errors).forEach((error) => toast.error(error.message))
  }, [errors])

  const invitationAddUserApi = async (data: invitationAddUser) => {
    const response = await api.post('api/account/add_friend', {
      email: user?.email,
      emailFriend: data.emailFriend
    })

    if (response.status === 200) {
      return response.data
    } else {
      return response?.data.message
    }
  }

  const handleInvitationAddUSer = async (data: invitationAddUser) => {
    toast.promise(invitationAddUserApi(data), {
      loading: 'Carregando...',
      success: (response: AxiosResponse) => {
        resetField('emailFriend')

        return 'Convite enviado com sucesso!'
      },
      error: (error: AxiosError<any>) => {
        const message = error.response?.data.message

        return message
      },
    })
  }

  return (
    <div className={`container-add-user ${isActiveAddUser && 'active-content-add-user'}`}>
      <div className="content-input">
        <label htmlFor="email">Email do usuário</label>
        <div className="content-send">
          <input
            type="text"
            id="email"
            placeholder="Digite o email"
            {...register('emailFriend')} />

          <button onClick={handleSubmit(handleInvitationAddUSer)}>
            <Send />
          </button>
        </div>
      </div>
    </div>
  )
}