
import React from 'react'
import Cell from '../spreadsheet/Cell'

const Sheet = ({ cols, rows }) => {

    return <table className='sheet-body'>
        <tbody>
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

}

export default Sheet