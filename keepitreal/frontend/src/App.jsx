import { useState } from 'react'
import './App.css'
import SubmitData from "./pages/submission_page"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <SubmitData />
    </div>
  )
}

export default App
