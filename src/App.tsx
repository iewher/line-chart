import './style/styles.css'

import Header from './components/Header'
import { Button } from './components/Button'
import { ResponsiveLine, ResponsiveLineCanvas } from '@nivo/line'
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
    const data = generateDrinkStats(24)

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