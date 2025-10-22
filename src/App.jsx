import { useState, useEffect } from 'react'
import Carousel from './components/Carousel'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-4xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          <h1 className="text-6xl font-bold text-white text-center mb-12">
            AGM Analytics Dashboard
          </h1>
          {data && <Carousel data={data} />}
        </div>
      </div>
      <footer className="py-4 text-center text-white/60 text-sm">
        Powered by Nonfiction!
      </footer>
    </div>
  )
}

export default App
