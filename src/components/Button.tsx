import { ReactNode, useEffect, useState } from 'react'

/*
Указываем типы для ButtonProps
*/

type ButtonProps = {
    children: ReactNode
    onClick: () => void
}

/*
Экспортируем компонент Button, для последующего использования в хедере
В пропсы передаем дочерний элемент children
Когда кнопка нажата, состояние isPressing устанавливает значение true
*/

export function Button({ children, onClick }: ButtonProps) {

/*
Используем хук для отслеживания состояния кнопки
*/

    const [isPressing, setIsPressing] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsPressing(false)
        }, 250)

        return () => clearTimeout(timeout)
    }, [isPressing])

    return (
        <button
            className='Button'
            onClick={() => {
                setIsPressing(true)
                onClick()
            }}
            style={isPressing ? {opacity: 0.8} : {}}
            >
                {children}
            </button>
    )
}