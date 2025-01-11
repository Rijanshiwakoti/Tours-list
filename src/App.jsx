import React, { useState, useEffect } from 'react'

const url = 'https://www.course-api.com/react-tours-project'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tours, setTours] = useState(null)
  const [expandedTourId, setExpandedTourId] = useState(null) // Track expanded tour

  const fetchData = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setTours(data)
      setIsLoading(false)
      if (!response.ok) throw new Error('URL did not match')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const handleReFetch = () => {
    setIsLoading(true)
    fetchData()
  }

  const handleReadMore = (id) => {
    setExpandedTourId(id === expandedTourId ? null : id) // Toggle expansion
  }

  if (isLoading) return <h2 className="loading">Loading...</h2>

  return (
    <React.Fragment>
      <h2 className="title">Our Tours</h2>
      <section className="tours">
        {tours.map((tour) => {
          const { id, name, info, image, price } = tour
          const isExpanded = id === expandedTourId

          return (
            <div key={id} className="single-tour">
              <img src={image} alt="" className="img" />
              <h3 className="title">{name}</h3>
              <p className="tour-info">
                {!isExpanded ? info.substring(0, 200) : info}{' '}
                {/* Truncate or show full info */}
                <button
                  type="button"
                  className="info-btn"
                  onClick={() => handleReadMore(id)}
                >
                  {isExpanded ? `See less` : `Read more`}
                </button>
              </p>
              <p className="tour-price">$ {price}</p>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(id)}
              >
                Not interested
              </button>
            </div>
          )
        })}
      </section>
      <button type="button" className="btn" onClick={handleReFetch}>
        Refetch
      </button>
    </React.Fragment>
  )
}

export default App
