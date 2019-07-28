
import React, { useEffect } from 'react'
import Cell from '../spreadsheet/Cell'
import Header from '../spreadsheet/Header'

import { convertToABCD } from './utils'

const Sheet = ({ cols, rows }) => {


    const colArray = [...Array(cols)]


    return <div className='sheet-body'>
        <Header />
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
                            <td className="index-col"><div>{rowIndex}</div></td>
                            {
                                colArray.map((__, colIndex) => {
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