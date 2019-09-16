import React, { PureComponent } from "react";
import { PieChart, Pie } from "recharts";

const data01 = [
  { name: "Group A", value: 30 }
];
const data02 = [
  { name: "A1", value: 500 }
];

export class DoisNiveisChart extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/w6wsrc52/";

  render() {
    return (
      <PieChart width={600} height={600}>
        <Pie
          data={data01}
          dataKey="value"
          cx={200}
          cy={200}
          outerRadius={60}
          fill="#8884d8"
          label
        />
        <Pie
          data={data02}
          dataKey="value"
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={90}
          fill="#82ca9d"
          label
        />
      </PieChart>
    );
  }
}

export default DoisNiveisChart;
