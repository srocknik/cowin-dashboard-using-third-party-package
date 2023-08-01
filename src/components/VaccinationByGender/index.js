// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {genderList} = props
  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="40%"
        data={genderList}
        startAngle={0}
        endAngle={180}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Telugu" fill="#2cc6c6" />
        <Cell name="Hindi" fill="#5a8dee" />
        <Cell name="English" fill="#f54394" />
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

export default VaccinationByGender
