import { useQuery } from 'react-query'
import { usersApi } from './api'

const useUsers = () => {
  const { data, isLoading } = useQuery('users', () => usersApi.getUsers())
  return {
    data,
    isLoading
  }
}

export default useUsers
