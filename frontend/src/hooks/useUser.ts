import { useQuery } from "@tanstack/react-query"
import { api } from "../service/api"
import { IUser } from "../contexts/userContext"
import { AxiosResponse } from "axios"

export const useCurrentUser = () => {
  const { isLoading, error, data } = useQuery<IUser>({
    queryKey: ['current_user'],
    queryFn: async () => {
      const response: AxiosResponse<IUser> = await api.get('api/account/current_user')

      return response.data
    },
  })

  return { user: data, loading: isLoading, error }
}