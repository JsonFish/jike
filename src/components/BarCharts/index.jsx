import * as echarts from "echarts";
import { useEffect, useRef } from "react";
const BarChart = ({ title, xData, yData }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yData,
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  }, [title, xData, yData]);
  return (
    <div>
      <div className="w-96 h-60" ref={chartRef}></div>
    </div>
  );
};
export default BarChart;
