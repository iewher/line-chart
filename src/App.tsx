import './style/styles.css'

import Header from './components/Header'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
import { inc } from './components/utils'
import { useState } from 'react'
import Select from 'react-select'

type Flavor = 'svg'

type ChartProps = {
    flavor: Flavor
    iteration: number
}

/*
Передаем пропсы для ChartLine
*/

const propsLine = {
    enableSlices: 'x',
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    curve: 'monotoneX'
} as const

/*
Передаем пропсы для ChartPie
*/

const propsPie = {
    cornerRadius: 10,
    innerRadius: 0.9,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    padAngle: 0.5,
    enableRadialLabels: true,
    enableArcLabels: false
}

function ChartLine({ flavor }: ChartProps) {
    const data = [
        {
    /*
    Создаю цикл, который генерирует время по X
    Этот цикл создает массив с одним обьектом, содержащим массив данных для графика
    Внутри этого массива мы передаем значение 24, что означает, что он создаст 24 обьекта, и каждый из них со свойствами x, y
    Изначально я написал, так:
    { x: '00:00', y: Math.round(Math.random() * 100)},
    { x: '01:00', y: Math.round(Math.random() * 100)},
    { x: '02:00', y: Math.round(Math.random() * 100)},
    ...
    { x: '23:00', y: Math.round(Math.random() * 100)},
    */
          id: `км/ч`,
          data: Array.from({ length: 24 }, (_, i) => ({
            x: `${i.toString().padStart(2, '0')}:00`,
            y: Math.round(Math.random() * 100)
          }))
        }
      ];

    /*
    Проверяю поступившие данные
    Кидаю бряку в консоли на return <ResponsiveLine data={data} {...props} />
    Выдает все правильно
    */

    console.log(data)

    return <ResponsiveLine data={data} {...propsLine} />
}

function ChartPie({ flavor }: ChartProps) {
  
  /*
  Созздаем массив data, в который передаем типы машин, и генерируем случайные значение для каждого из них
  */

  const data = ['Легковые', 'Мотоц./велос-ды', 'Грузовые', 'Автобусы', 'Автопоезда'].map((id) => ({
    id,
    value: Math.round(Math.random() * 100)
  }));

    console.log(data)



    return (
      <>
          <ResponsivePie data={data} {...propsPie} />
          <div className='Legend'>
              <ul>
                  {data.map((item) => (
                      <li key={item.id}>
                          {item.id}: {item.value}
                      </li>
                  ))}
              </ul>
          </div>
      </>
    )
  }

export default function App() {
    const [flavor, setFlavor] = useState<Flavor>('svg')
    const [iteration, setIteration] = useState(inc)
    const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(null)

    const handleChange = (option: any) => {
        setSelectedOption(option)
    }

    const options = [
        {value: '1', label: 'Направление 1'},
        {value: '2', label: 'Направление 2'},
        {value: '3', label: 'Направление 3'},
        {value: '4', label: 'Направление 4'},
        {value: '5', label: 'Направление 5'}
    ]

    return (
        <div className='App'>
            <Header onButtonClick={() => setIteration(inc)} />
            <div className='Chart'> 
                <div className='text'>
                    <div className='HeaderInChart'> 
                        <h2>Средняя скорость</h2>
                    </div>
                    <div className='Directions'>
                        <h2>Направления:</h2>
                        <Select options={options} value={selectedOption} onChange={handleChange} />
                    </div>
                </div>
                <div className='chart-container'>
                    <ChartLine {...{ flavor, iteration }} />
                </div>
            </div>
            <div className='Pie'>
                <ChartPie {...{ flavor, iteration }} />
            </div>
        </div>
    )
}


