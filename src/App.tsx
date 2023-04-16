import './style/styles.css'

import Header from './components/Header'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
import { inc } from './components/utils'
import { useState } from 'react'
import { generateProgrammingLanguageStats } from '@nivo/generators'

type Flavor = 'svg'

type ChartProps = {
    flavor: Flavor
    iteration: number
}

const propsLine = {
    enableSlices: 'x',
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
} as const

const propsPie = {
    cornerRadius: 5,
    innerRadius: 0.6,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    padAngle: 0.5,
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
    const data = generateProgrammingLanguageStats(true, 9).map(
      ({ label, ...data }) => ({
        id: label,
        ...data,
      })
    )
  
    return <ResponsivePie data={data} {...propsPie} />
  }

export default function App() {
    const [flavor, setFlavor] = useState<Flavor>('svg')
    const [iteration, setIteration] = useState(inc)

    return (
        <div className='App'>
            <Header onButtonClick={() => setIteration(inc)} />
            <div className='Chart'>
                <ChartLine {...{ flavor, iteration }} />
            </div>
            <div className='Pie'>
                <ChartPie {...{ flavor, iteration }} />
            </div>
        </div>
    )
}