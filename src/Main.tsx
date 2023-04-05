import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField
} from '@mui/material'
import useUsers from './hooks'
import { useState } from 'react'

export const Main = () => {
  const { data, isLoading } = useUsers()
  const [newUser, setNewUser] = useState<string | undefined>('')
  const [dataList, setDataList] = useState<any[]>([])
  const handleSubmitUser = () => {
    dataList && setDataList((prevDataList: any) => [...prevDataList, newUser])
    setNewUser('')
  }
  const handleDelete = (id: string) => {
    const newList = dataList.filter(item => item !== id)
    setDataList(newList)
  }
  return (
    <Container>
      <Box component='form' noValidate>
        <div>
          <TextField
            label='User'
            id='outlined-required'
            style={{ margin: '10px 0' }}
            value={newUser}
            onChange={e => setNewUser(e.target.value)}
            autoComplete='none'
          />
          <Button onClick={handleSubmitUser}>Enviar</Button>
        </div>
      </Box>
      <List data-testid='unordered-list'>
        {isLoading ? (
          <>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={150} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={150} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={150} />
          </>
        ) : (
          dataList?.map((user: any) => (
            <ListItem key={user}>
              <ListItemText primary={user} />
              <Button onClick={() => handleDelete(user)}>X</Button>
            </ListItem>
          ))
        )}
      </List>
      <List>
        {isLoading ? (
          <>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={150} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={150} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={150} />
          </>
        ) : (
          data?.map((user: any) => (
            <ListItem key={user.name}>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  )
}
