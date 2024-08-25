import './index.css'

const SkillCard = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails
  return (
    <>
      <li className="skill-list-item">
        <img src={imageUrl} className="skill-img" alt={name} />
        <p className="skill-name">{name}</p>
      </li>
    </>
  )
}
export default SkillCard
