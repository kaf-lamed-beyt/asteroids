import React from "react"

// API Endpoint && key
const asteroid_key = "7UpN204mxX9ABjxG3j8quPfoLak8N2WGyZBaY741"
const asetroid_endpoint = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${asteroid_key}`
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      asteroids: [],
      isLoading: false,
    }
  }

  // fetch data from NASA's NEoW API
  componentDidMount() {
    // get loading key
    this.setState({
      isLoading: true
    })

    fetch(asetroid_endpoint)
      .then((response) => response.json)
      .then((data) =>
        this.setState({
          asteroids: data.asteroids,
        })
      )
  }

  render() {
    const { asteroids, isLoading } = this.state

    // perform react conditional rendering
    // by displaying either a loader or text indicating that data is being fetched
    isLoading ? <p>Loading...</p> : 'err'

    return (
      <div className='app__base asteroids'>
        <h3>Reveal your approaches Oh! ye asteroids 🤣 </h3>
        {asteroids.map(asteroid => {
          return (
            <div key={asteroid.ObjectID}>
              <h2>{asteroid.name}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}
