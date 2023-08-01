// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationCoverageList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
    fetchStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getUpdated7DaysData = data => {
    const updatedData = data.map(each => ({
      dose1: each.dose_1,
      dose2: each.dose_2,
      vaccineDate: each.vaccine_date,
    }))

    return updatedData
  }

  getData = async () => {
    this.setState({fetchStatus: apiStatus.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    const data = await response.json()
    const last7DaysVaccination = data.last_7_days_vaccination
    const vaccinationByAge = data.vaccination_by_age
    const vaccinationByGender = data.vaccination_by_gender
    const updatedLast7DaysList = this.getUpdated7DaysData(last7DaysVaccination)

    if (response.ok === true) {
      this.setState({
        vaccinationCoverageList: updatedLast7DaysList,
        vaccinationByAgeList: vaccinationByAge,
        vaccinationByGenderList: vaccinationByGender,
        fetchStatus: apiStatus.success,
      })
    }
    if (response.status === 404) {
      this.setState({fetchStatus: apiStatus.failure})
    }
  }

  renderVaccinationData = () => {
    const {vaccinationCoverageList} = this.state

    return (
      <div className="vaccination-card">
        <h1 className="vaccination-card-heading">Vaccination Coverage</h1>
        <VaccinationCoverage vaccinationList={vaccinationCoverageList} />
      </div>
    )
  }

  renderVaccinationByGender = () => {
    const {vaccinationByGenderList} = this.state

    return (
      <div className="vaccination-card">
        <h1 className="vaccination-card-heading">Vaccination By Gender</h1>
        <VaccinationByGender genderList={vaccinationByGenderList} />
      </div>
    )
  }

  renderVaccinationByAge = () => {
    const {vaccinationByAgeList} = this.state

    return (
      <div className="vaccination-card">
        <h1 className="vaccination-card-heading">Vaccination By Age</h1>
        <div className="pie-chart-container">
          <VaccinationByAge ageList={vaccinationByAgeList} />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-view-heading">Something went wrong</h1>
    </div>
  )

  renderAllVaccinationDetails = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case 'INPROGRESS':
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )
      case 'SUCCESS':
        return (
          <div>
            {this.renderVaccinationData()}
            {this.renderVaccinationByGender()}
            {this.renderVaccinationByAge()}
          </div>
        )
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="cowin-logo"
          />
          <p className="logo-text">Co-WIN</p>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <div className="vaccination-all-card-container">
          {this.renderAllVaccinationDetails()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
