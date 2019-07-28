
import React, { useEffect } from 'react'
import Cell from '../spreadsheet/Cell'

import { convertToABCD } from './utils'

const Sheet = ({ cols, rows }) => {




    return <div className='sheet-body'>
        <div className="sheet-header">
            <table>
                <tbody>
                    
                </tbody>
            </table>
        </div>
        <div className="sheet-area">
            <table>
                <tbody>
                    <tr>
                        {

                            [...Array(cols)].map((_, colIndex) => <th key={colIndex} id={`th-${colIndex}`}>{convertToABCD(colIndex)}</th>)
                        }
                    </tr>
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