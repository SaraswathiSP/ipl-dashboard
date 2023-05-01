import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageUrl} = teamDetails
  return (
    <Link to={`/team-matches/${id}`} className="link">
      <li className="team-item">
        <img src={teamImageUrl} alt={`${name}`} className="team-logo" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
