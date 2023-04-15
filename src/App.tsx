import './styles.css'

import Header from './Header'
import { Button } from './Button'
import { ResponsiveLine, ResponsiveLineCanvas } from '@nivo/line'
import { inc } from './utils'
import { generateDrinkStats } from '@nivo/generators'
import { useState } from 'react'

type Flavor = 'svg' | 'canvas'

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
    const data = generateDrinkStats(9)

    if (flavor === 'canvas') {
        return <ResponsiveLineCanvas data={data} {...props} />
    }

    return <ResponsiveLine data={data} {...props} />
}

export default function App() {
    const [flavor, setFlavor] = useState<Flavor>('svg')
    const [iteration, setIteration] = useState(inc)

    return (
        <div className='App'>
            <Header />
            <h1>Nivo Line Template</h1>
            <h2>Fork this template</h2>
            <Button onClick={() => setIteration(inc)}>Generate Data</Button>
            <div className='Chart'>
                <Chart {...{ flavor, iteration }} />
            </div>
        </div>
    )
}