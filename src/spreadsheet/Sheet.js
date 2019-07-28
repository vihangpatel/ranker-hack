
import React, { useState } from 'react'
import Cell from '../spreadsheet/Cell'
import Header from '../spreadsheet/Header'

import { convertToABCD } from './utils'
import sheetInstance from './store'

const Sheet = ({ cols, rows }) => {


    const colArray = [...Array(cols)]
    const [timeStamp, setTimeStamp] = useState(Date.now())

    const triggerRerender = () => setTimeStamp(Date.now())


    return <div className='sheet-body' key={timeStamp}>
        <Header triggerRerender={triggerRerender} />
        <div className="sheet-area">
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        {

                            colArray.map((_, colIndex) => _ === '__' ?
                                <th key={_}></th> :
                                <th key={colIndex} id={`th-${colIndex}`}>{convertToABCD(colIndex)}</th>)
                        }
                    </tr>
                    {[...Array(rows)].map((_, rowIndex) => {


                        return <tr key={rowIndex} >
                            <td className="index-col"><div>{rowIndex + 1}</div></td>
                            {
                                colArray.map((__, colIndex) => {
                                    const id = `${rowIndex}-${colIndex}`
                                    return <Cell
                                        key={id}
                                        id={id}
                                        cellValue={(sheetInstance.cellMeta[id] || {}).text} />
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