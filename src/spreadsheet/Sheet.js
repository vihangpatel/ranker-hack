
import React, { useEffect } from 'react'
import Cell from '../spreadsheet/Cell'

import { convertToABCD } from './utils'

const Sheet = ({ cols, rows }) => {

    const bodyRef = React.createRef()
    const headRef = React.createRef()

   

    return <div className='sheet-body'>
        <div className="sheet-area">
            <table>
                <thead ref={headRef}>
                    <tr>
                        {

                            [...Array(cols)].map((_, colIndex) => <th key={colIndex} id={`th-${colIndex}`}>{convertToABCD(colIndex)}</th>)
                        }
                    </tr>
                </thead>
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