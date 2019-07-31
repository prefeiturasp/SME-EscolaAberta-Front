import React, { Component } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from "recharts";

export default class VagasMatriculasChart extends Component {
  render() {
    return (
      <div>
        {this.props.dados.lenght > 0 ? (
          this.props.dados.map((dado) => {
            return (
              <ResponsiveContainer width="85%" height={250}>
                <PieChart onMouseEnter={this.onPieEnter}>
                  <Pie
                    data={dado}
                    cx={300}
                    cy={200}
                    labelLine={false}
                    // label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {/* {
                    data.map((entry, index) => <Cell fill={'#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)} />)
                  } */}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            );
          })
        ) : (null)}
      </div>
    );
  }
}
