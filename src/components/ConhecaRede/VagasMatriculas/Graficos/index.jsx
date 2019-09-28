import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from "recharts";

const COLORS = ["#196CBD", "#47D3CB", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class GraficoVagasMatriculasSME extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rContainerHeight: 250,
      vAlignLegenda: "top",
      alignLegenda: "right",
      marginLegenda: {
        marginTop: "65px",
        marginLeft: "0px"
      }
    };
  }

  render() {
    const { dados, titulo } = this.props;
    return (
      <React.Fragment>
        <div className="mx-3 my-5">
          <h3 className="fonte-16 border-top border-bottom font-weight-light py-3">
            {titulo || "VAGAS TOTAIS"}
          </h3>
        </div>
        <ResponsiveContainer
          className="mx-auto my-2"
          width="75%"
          height={this.state.rContainerHeight}
        >
          <PieChart width={400} height={400}>
            <Pie
              data={dados}
              cx={100}
              cy={100}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              nameKey="dado"
              dataKey="valor"
            >
              {dados.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign={this.state.vAlignLegenda}
              iconSize={18}
              wrapperStyle={this.state.marginLegenda}
              align={this.state.alignLegenda}
            />
          </PieChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
