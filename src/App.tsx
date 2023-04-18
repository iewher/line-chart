import './style/styles.css'

import Header from './components/Header'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
import { inc } from './components/utils'
import { useState } from 'react'

type Flavor = 'svg'

/*
Указываем типы для ChartProps
*/

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

    const firstData = Array.from({ length: 24 }, (_, i) => ({
        x: `${i.toString().padStart(2, '0')}:00`,
        y: Math.round(Math.random() * 100),
      }));

      const secondData = firstData.map((point) => ({
        x: point.x,

        /*
        Теперь вторая линия на графике не может уйти в отрицательное значение
        */

        y: Math.max(0, point.y - 20), 
      }));
      
    const data = [
        { id: `км/ч`, data: firstData },
        { id: `км/ч-2`, data: secondData }
      ];

    /*
    Проверяю поступившие данные
    Кидаю бряку в консоли на return <ResponsiveLine data={data} {...props} />
    Выдает все правильно
    */

    console.log(data)

    return <ResponsiveLine data={data} {...propsLine} colors={['green', 'red']}/>
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

    return (
        <div className='App'>
            <Header onButtonClick={() => setIteration(inc)} />
            <div className='Chart'> 
                <div className='text'>
                    <div className='HeaderInChart'> 
                        <h2>Средняя скорость</h2>
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