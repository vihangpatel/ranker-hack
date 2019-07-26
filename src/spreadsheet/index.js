import React, { Component } from 'react'
import Sheet from './Sheet'

import './css/index.css'


const COLS = 26
const ROWS = 100

class SpreadSheet extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="sheet-table">
        
            <table>
                <tbody></tbody>
               
            </table>
            <Sheet cols={COLS} rows={ROWS}/>
        </div>
    }
}

export default SpreadSheet