import './index.css'

const JobCards = props => {
  const {jobDetails} = props
  console.log(jobDetails)
  return (
    <div className="job-card-con">
      <h1 className="h">{jobDetails.title}</h1>
    </div>
  )
}

export default JobCards
