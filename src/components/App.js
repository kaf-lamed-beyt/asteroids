import React from "react"
import Loader from "./loader"

// API Endpoint && key
const asteroid_key = "7UpN204mxX9ABjxG3j8quPfoLak8N2WGyZBaY741"
const asetroid_endpoint = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${asteroid_key}`
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asteroids: [],
      isLoading: false,
      error: null,
    }
  }

  // fetch data from NASA's NEoW API
  componentDidMount() {
    // get loading key
    this.setState({
      isLoading: true,
    })

    fetch(asetroid_endpoint)
      .then((response) => response.json())
      .then((data) =>
        //console.log(data.near_earth_objects)
        this.setState({
          asteroids: data.near_earth_objects,
          isLoading: false,
        })
      )
      .catch((error) => {
        this.setState({
          error,
          isLoading: true,
        })
      })
  }

  render() {
    const { asteroids, isLoading } = this.state

    // perform react conditional rendering
    // by displaying either a loader or text indicating that data is being fetched
    if (isLoading) {
      return <Loader />
    }

    return (
      <div className='app__base asteroids'>
        <h1>Asteroids</h1>
        <div className='asteroids-base'>
          {asteroids &&
            asteroids.map((asteroid) => {
              return (
                <div
                  key={asteroid.id}
                  className='asteroids-info'
                  data-aos='zoom-in'
                >
                  <h3>Name: {asteroid.name}</h3>
                  <p>Absolute Magnitude: {asteroid.absolute_magnitude_h}</p>
                  <div className='estimated-diameters'>
                    <h3> Estimated Diameters</h3>
                    <div className='flex-diam'>
                      <div className='min'>
                        <p>
                          Min Diameter:{" "}
                          {`${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                            2
                          )}Km`}
                        </p>
                      </div>
                      <div className='max'>
                        <p>
                          Max Diameter:{" "}
                          {`${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                            2
                          )}Km`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className='nasa-url btn'>
                    <a href={asteroid.nasa_jpl_url} target='__blank'>
                      NASA URL
                    </a>
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
