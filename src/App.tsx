import { QueryClient, QueryClientProvider } from 'react-query'
import { Main } from './Main'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Main />
      </div>
    </QueryClientProvider>
  )
}

export default App
