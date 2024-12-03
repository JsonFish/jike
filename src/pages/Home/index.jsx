import * as echarts from "echarts";
import { useEffect, useRef } from "react";

export default function Home() {
  const chartRef = useRef(null);
  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: "category",
        data: [
          "Vue",
          "React",
          "Angular",
          "Node",
          "Express",
          "MongoDB",
          "MySQL",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div className="w-96 h-60" ref={chartRef}></div>
    </div>
  );
}
