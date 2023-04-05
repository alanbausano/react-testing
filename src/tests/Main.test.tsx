import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Main } from '../Main'
import { usersApi } from '../hooks/api'

const queryClient = new QueryClient()

it('handleSubmit function adds new user to list', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
  const input = screen.getByLabelText('User')
  const button = screen.getByText('Enviar')
  fireEvent.change(input, { target: { value: 'Brad Pitt' } })
  fireEvent.click(button)
  const newUser = await screen.findByText('Brad Pitt')
  expect(newUser).toBeInTheDocument()
})

it('should delete user when X button is clicked', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
  const input = screen.getByLabelText('User')
  const button = screen.getByText('Enviar')
  fireEvent.change(input, { target: { value: 'John Cusimano' } })
  fireEvent.click(button)
  const userItem = await screen.findByText('John Cusimano')
  const deleteButton = await screen.findByText('X')
  fireEvent.click(deleteButton)
  expect(userItem).not.toBeInTheDocument()
})

it('test_api_fetch_users_displays_users_in_list', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
  const listItems = await screen.findByTestId('unordered-list')
  expect(listItems).toBeInTheDocument()
  expect(listItems).toHaveLength(10)
})
