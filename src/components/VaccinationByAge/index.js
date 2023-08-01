// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {ageList} = props
  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="40%"
        data={ageList}
        startAngle={0}
        endAngle={360}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Telugu" fill="#64c2a6" />
        <Cell name="Hindi" fill="#a3df9f" />
        <Cell name="English" fill="#5a8dee" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
      />
    </PieChart>
  )
}

export default VaccinationByAge
