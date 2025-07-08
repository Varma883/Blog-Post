import React from 'react'
import Sidebar from './components/Sidebar'
import Posts from './pages/Posts'

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      
        <Posts />
      
    </div>
  )
}

export default App
