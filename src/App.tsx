import { useState } from 'react'
import { Toaster } from 'sonner'
import './App.css'
import ListOfUsers from './component/ListOfUsers'
import CreateNewUser from './component/createNewUser'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>Proyecto Redux + Vite</h1>
      <ListOfUsers/>
      <CreateNewUser />
      <Toaster richColors/>
    </div>
  )
}

export default App
