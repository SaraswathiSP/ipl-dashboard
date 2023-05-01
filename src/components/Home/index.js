import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

const Home = () => {
  const [teamsData, setTeamsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const apiUrl = 'https://apis.ccbp.in/ipl'

  const getTeamsMatches = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedMatches = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    setTeamsData(updatedMatches)
    setIsLoading(false)
  }

  useEffect(() => {
    getTeamsMatches()
  }, [])

  return (
    <div className="home-route-container">
      <div className="teams-list-container">
        <div className="ipl-dashboard-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
        </div>

        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="teams-list">
            {teamsData.map(each => (
              <TeamCard key={each.id} teamDetails={each} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
