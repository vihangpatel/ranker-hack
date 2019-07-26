
import React, { useEffect } from 'react'
import Cell from '../spreadsheet/Cell'

import { convertToABCD } from './utils'

const Sheet = ({ cols, rows }) => {

    const bodyRef = React.createRef()
    const headRef = React.createRef()

    useEffect(() => { setTimeout(adjustHeaderHeight, 100) }, [])

    const adjustHeaderHeight = () => {
        if (bodyRef.current && headRef.current) {
            const tds = [...bodyRef.current.querySelectorAll('tr:first-child td')]
            const ths = [...headRef.current.querySelectorAll('tr:first-child th')]


            // First adjust head colgroups
            ths.map((th, index) => {
                th.style.width = `${tds[index].getBoundingClientRect().width}px`
                return th.style.width
            })


        }
    }

    return <div className='sheet-body'>
        <div className="sticky-header">
            <table>
                <thead ref={headRef}>
                    <tr>
                        {

                            [...Array(cols)].map((_, colIndex) => <th key={colIndex} id={`th-${colIndex}`}>{convertToABCD(colIndex)}</th>)
                        }
                    </tr>
                </thead>
            </table>
        </div>
        <div className="sheet-area">
            <table>
                <tbody ref={bodyRef}>
                    {[...Array(rows)].map((_, rowIndex) => {


                        return <tr key={rowIndex}   >
                            {
                                [...Array(cols)].map((__, colIndex) => {
                                    const id = `${rowIndex}-${colIndex}`
                                    return <Cell
                                        key={id}
                                        id={id}
                                        cellValue="" />
                                })
                            }
                        </tr>
                    }
                    )}
                </tbody>
            </table>
        </div>
    </div>

}

export default Sheet