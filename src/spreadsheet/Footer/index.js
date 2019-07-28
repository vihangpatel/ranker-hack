import React from 'react'

const Footer = ({ changeSheetDimension }) => {

    const rowRef = React.createRef()
    const colRef = React.createRef()



    return <footer>
        <div className="row-col-inputs">
            <div className="input-container">
                <div>Rows: </div>
                <div><input ref={rowRef} /></div>
            </div>
            <div className="input-container">
                <div>Cols: </div>
                <div><input ref={colRef} /></div>
            </div>
            <div className="small-button">Apply</div>
        </div>
        <div className="love-statement">
            Made with <span>♥</span> for HackerRank Assignment
        </div>
    </footer>
}

export default Footer