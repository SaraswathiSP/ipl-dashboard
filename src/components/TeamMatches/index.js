import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

const TeamMatches = props => {
  const [latestMatch, setlatestMatch] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  useEffect(() => {
    getTeamMatchDetails()
  }, [])

  const getTeamMatchDetails = async () => {
    const {match} = props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(each => getFormattedData(each)),
    }

    setlatestMatch(formattedData)
    setIsLoading(false)
  }

  const getClassName = () => {
    const {match} = props
    const {params} = match
    const {id} = params
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'

      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  const renderTeamMatches = () => {
    const {recentMatches} = latestMatch
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(each => (
          <MatchCard key={each.id} matchDetails={each} />
        ))}
      </ul>
    )
  }

  const renderLatestMatches = () => {
    const {teamBannerUrl, latestMatchDetails} = latestMatch
    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {renderTeamMatches()}
      </div>
    )
  }

  return (
    <div className={`team-matches-container ${getClassName()}`}>
      {isLoading ? (
        <div data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        renderLatestMatches()
      )}
    </div>
  )
}

export default TeamMatches
