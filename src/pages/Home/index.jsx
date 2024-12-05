import BarChart from "@/components/BarCharts";

export default function Home() {
  return (
    <div>
      <BarChart
        title={"前端技术栈掌握程度"}
        xData={["Vue", "React", "Angular", "Node", "Express"]}
        yData={[120, 200, 150, 80, 70]}
      ></BarChart>
    </div>
  );
}
