import React, { Component } from 'react'
import Sheet from './Sheet'

import './css/index.css'




class SpreadSheet extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="sheet-table">
        
            <table>
                <tbody></tbody>
               
            </table>
            <Sheet/>
        </div>
    }
}

export default SpreadSheet