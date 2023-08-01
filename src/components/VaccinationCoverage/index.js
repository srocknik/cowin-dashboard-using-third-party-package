// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationList} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart
      data={vaccinationList}
      width={1000}
      height={300}
      margin={{
        top: 5,
      }}
    >
      <XAxis
        dataKey="vaccineDate"
        tick={{
          stroke: 'gray',
          strokeWidth: 1,
        }}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{
          stroke: 'gray',
          strokeWidth: 0,
        }}
      />
      <Legend
        wrapperStyle={{
          padding: 30,
        }}
      />
      <Bar dataKey="dose1" name="dose1" fill="#5a8dee" barSize="20%" />
      <Bar dataKey="dose2" name="dose2" fill="#f54394" barSize="20%" />
    </BarChart>
  )
}

export default VaccinationCoverage
