import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tours from './components/Tours'

const URL = 'https://course-api.com/react-tours-project'

function App() {

  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }


  const fetchTours = async () => {
    setLoading(true)
    try {
      const response = await fetch(URL)
      const data = await response.json()

      setLoading(false)
      setTours(data)

    } catch (error) {
      setLoading(false)
      console.log(error)
    }

  }


  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) {
    return (
      <main>
        <h2>LOADING...</h2>
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <h2>No Data</h2>
        <button className='btn' onClick={() => fetchTours()}>Refresh</button>
      </main>
    )
  }



  return (
    <>
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>

    </>
  )
}

export default App
