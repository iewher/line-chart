import './style/styles.css'

import Header from './components/Header'
import { ResponsiveLine } from '@nivo/line'
import { inc } from './components/utils'
import { generateDrinkStats } from '@nivo/generators'
import { useState } from 'react'

type Flavor = 'svg'

type ChartProps = {
    flavor: Flavor
    iteration: number
}

console.clear()

const props = {
    enableSlices: 'x',
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
} as const

function Chart({ flavor }: ChartProps) {
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
          id: 'Скорость',
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

    return <ResponsiveLine data={data} {...props} />
}

export default function App() {
    const [flavor, setFlavor] = useState<Flavor>('svg')
    const [iteration, setIteration] = useState(inc)

    return (
        <div className='App'>
            <Header onButtonClick={() => setIteration(inc)} />
            <div className='Chart'>
                <Chart {...{ flavor, iteration }} />
            </div>
        </div>
    )
}