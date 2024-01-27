import React, { useState } from "react";
import Header from "./components/header/header";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import "./style/styles.css";

type Flavor = "svg";

type ChartProps = {
  flavor: Flavor;
  iteration: number;
};

const propsLine = {
  enableSlices: "x",
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
  curve: "monotoneX",
} as const;

const propsPie = {
  cornerRadius: 10,
  innerRadius: 0.9,
  margin: { top: 80, right: 120, bottom: 80, left: 120 },
  padAngle: 0.5,
  enableRadialLabels: true,
  enableArcLabels: false,
};

function ChartLine({ flavor }: ChartProps) {
  const firstData = Array.from({ length: 24 }, (_, i) => ({
    x: `${i.toString().padStart(2, "0")}:00`,
    y: Math.round(Math.random() * 100),
  }));

  const secondData = firstData.map((point) => ({
    x: point.x,
    y: Math.max(0, point.y - 20),
  }));

  const data = [
    { id: `км/ч`, data: firstData },
    { id: `км/ч-2`, data: secondData },
  ];

  return (
    <ResponsiveLine data={data} {...propsLine} colors={["green", "red"]} />
  );
}

function ChartPie({ flavor }: ChartProps) {
  const data = [
    "Легковые",
    "Мотоц./велос-ды",
    "Грузовые",
    "Автобусы",
    "Автопоезда",
  ].map((id) => ({
    id,
    value: Math.round(Math.random() * 100),
  }));

  return (
    <>
      <ResponsivePie data={data} {...propsPie} />
      <div className="Legend">
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.id}: {item.value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function App() {
  const [flavor, setFlavor] = useState<Flavor>("svg");
  const [iteration, setIteration] = useState<number>(0);

  return (
    <div className="App">
      <Header iteration={iteration} setIteration={setIteration} />
      <div className="Chart">
        <div className="text">
          <div className="HeaderInChart">
            <h2>Средняя скорость</h2>
          </div>
        </div>
        <div className="chart-container">
          <ChartLine {...{ flavor, iteration }} />
        </div>
      </div>
      <div className="Pie">
        <ChartPie {...{ flavor, iteration }} />
      </div>
    </div>
  );
}
