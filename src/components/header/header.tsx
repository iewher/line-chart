import { useState } from "react";
import SelectC from "../select/select-c";
import styles from "./button.module.scss";

interface HeaderProps {
  iteration: number;
  setIteration: (iteration: number) => void;
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const timeOptions = Array.from({ length: 168 }, (_, i) => {
  const date = new Date(Date.now() + i * 60 * 60 * 1000);
  const dateStr = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;
  const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return {
    value: `${dateStr} ${timeStr}`,
    label: `${dateStr} ${timeStr}`,
  };
});

export default function Header({ iteration, setIteration }: HeaderProps) {
  const [startInterval, setStartInterval] = useState("");
  const [endInterval, setEndInterval] = useState("");
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const handleChange = (options: any) => {
    setSelectedOption(options);
  };

  const directions = [
    "Направление 1",
    "Направление 2",
    "Направление 3",
    "Направление 4",
    "Направление 5",
  ];

  const options = directions.map((direction, index) => ({
    value: `${index + 1}`,
    label: direction,
  }));

  return (
    <div className={styles.Header}>
      <h2>Период:</h2>
      <h2 className={styles.From}>с</h2>
      <SelectC
        options={timeOptions}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />
      <h2 className={styles.To}>до</h2>
      <SelectC
        options={timeOptions}
        selectedOption={selectedOption}
        handleChange={handleChange}
      />
      <h2 className={styles.Interval}>Интервал:</h2>
      <h2>Направления:</h2>
      <div className={styles.Directions}>
        <SelectC
          options={options}
          selectedOption={selectedOption}
          handleChange={handleChange}
        />
      </div>
      <button className={styles.Button} onClick={() => setIteration(iteration)}>
        Построить
      </button>
    </div>
  );
}
