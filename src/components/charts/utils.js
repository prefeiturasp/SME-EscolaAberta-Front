import echarts from "echarts";
import ecStat from "echarts-stat";
import { getIndicesAnos, getMetaAnos } from "../../services/idep";

const roundNumber = number => {
  return parseFloat(Number(number).toFixed(2));
};
export const HISTOGRAMTYPE = {
  FINAL: "histograma_final",
  INICIAL: "histograma_inicial"
};

export const getHistogramOption = async (
  codEOL,
  type = HISTOGRAMTYPE.INICIAL
) => {
  const meta = await getIndicesAnos(codEOL, type);

  const { indices, indice_da_escola, erro } = meta;
  if (!indices && !indice_da_escola) {
    return `Erro: ${erro}`;
  }

  let bins = ecStat.histogram(indices);
  const colorAll = "#75BCFC";
  let colorSelected = "#FFBC0A";
  if (type !== HISTOGRAMTYPE.INICIAL) colorSelected = "#FF6C7B";

  let interval;
  let min = Infinity;
  let max = -Infinity;

  let data = echarts.util.map(bins.data, (item, index) => {
    let x0 = roundNumber(bins.bins[index].x0);
    let x1 = roundNumber(bins.bins[index].x1);
    interval = roundNumber(x1 - x0);
    min = roundNumber(Math.min(min, x0));
    max = roundNumber(Math.max(max, x1));
    return [x0, x1, roundNumber(item[1])];
  });

  const renderItem = (params, api) => {
    let yValue = api.value(2);
    let start = api.coord([api.value(0), yValue]);
    let size = api.size([api.value(1) - api.value(0), yValue]);
    let style = api.style();

    if (indice_da_escola >= api.value(0) && indice_da_escola <= api.value(1)) {
      style.fill = colorSelected;
      style.textStroke = colorSelected;
    } else {
      style.fill = colorAll;
      style.textStroke = colorAll;
    }

    return {
      type: "rect",
      shape: {
        x: start[0] + 1,
        y: start[1],
        width: size[0] - 2,
        height: size[1]
      },
      style: style
    };
  };

  let histogramOption = {
    toolbox: {
      feature: {
        saveAsImage: { show: true, name: "metas", title: "Salvar" }
      }
    },
    color: colorAll,
    grid: {
      top: 80,
      containLabel: true
    },
    xAxis: [
      {
        type: "value",
        min: min,
        max: max,
        interval: interval,
        name: "IDEP",
        nameLocation: "middle",
        nameGap: 30
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "Número de escolas",
        nameLocation: "middle",
        nameGap: 30
      }
    ],
    series: [
      {
        name: "height",
        type: "custom",
        renderItem: renderItem,
        label: {
          normal: {
            show: true,
            position: "insideTop"
          }
        },
        encode: {
          x: [0, 1],
          y: 2,
          tooltip: 2,
          label: 2
        },
        data: data
      }
    ]
  };
  return histogramOption;
};

let metaOption = {
  color: ["#75BCFC", "#5E239D"],

  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross"
    }
  },
  grid: {
    right: "20%"
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true, name: "histograma", title: "Salvar" }
    }
  },
  legend: {
    data: ["Alcançado", "Meta"]
  },
  xAxis: [
    {
      type: "category",
      axisTick: {
        alignWithLabel: true
      },
      data: [],
      name: "Anos",
      nameLocation: "middle",
      nameGap: 30
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "Meta",
      min: 0,
      max: 10,
      position: "left",
      nameLocation: "middle",
      nameGap: 30
    }
  ],
  series: [
    {
      name: "Alcançado",
      type: "bar",
      data: []
    },
    {
      name: "Meta",
      type: "line",
      data: []
    }
  ]
};

const getAnosFinal = r => {
  return [r.ano_final.indices.anos[0]].concat(r.ano_final.metas.anos);
};

const getMetaFinal = r => {
  return [r.ano_final.indices.indices[0]].concat(r.ano_final.metas.metas);
};

const getValorAlcancadoFinal = r => {
  return [r.ano_final.indices.indices[0]].concat([0, 0, 0, 0, 0]);
};

export const getMetasFinaisOption = async codEol => {
  const meta = await getMetaAnos(codEol);
  if (meta.erro) return meta.erro;
  metaOption.series[0].data = getValorAlcancadoFinal(meta);
  metaOption.series[1].data = getMetaFinal(meta);
  metaOption.xAxis[0].data = getAnosFinal(meta);
  metaOption.parametros = meta.ano_final.parametros;
  metaOption.parametros.indice = meta.ano_final.indices.indices[0];
  metaOption.color[0] = "#1B80D4";
  metaOption.color[1] = "#FF6C7B";
  return metaOption;
};

const getAnosInicial = r => {
  return [r.ano_inicial.indices.anos[0]].concat(r.ano_inicial.metas.anos);
};
const getMetaInicial = r => {
  return [r.ano_inicial.indices.indices[0]].concat(r.ano_inicial.metas.metas);
};
const getValorAlcancadoInicial = r => {
  return [r.ano_inicial.indices.indices[0]].concat([0, 0, 0, 0, 0, 0]);
};

export const getMetasIniciaisOption = async codEol => {
  const meta = await getMetaAnos(codEol);
  if (meta.erro) return meta.erro;
  metaOption.series[0].data = getValorAlcancadoInicial(meta);
  metaOption.series[1].data = getMetaInicial(meta);
  metaOption.xAxis[0].data = getAnosInicial(meta);
  metaOption.parametros = meta.ano_inicial.parametros;
  metaOption.parametros.indice = meta.ano_inicial.indices.indices[0];
  return metaOption;
};
