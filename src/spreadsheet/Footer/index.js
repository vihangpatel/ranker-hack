import React from 'react'

const MAX_ROWS = 1000
const MAX_COLS = 256

const Footer = ({ changeSheetDimension }) => {

    const rowRef = React.createRef()
    const colRef = React.createRef()


    const resizeSheet = () => {
        let cols = +colRef.current.value
        let rows = +rowRef.current.value

        changeSheetDimension && changeSheetDimension({
            cols, rows
        })
    }

    return <footer>
        <div className="row-col-inputs">
            <div className="input-container">
                <div>Rows: </div>
                <div><input ref={rowRef} type="number" min="2" max={MAX_ROWS} /></div>
            </div>
            <div className="input-container">
                <div>Cols: </div>
                <div><input ref={colRef} type="number" min="10" max={MAX_COLS} /></div>
            </div>
            <div className="small-button" onClick={() => resizeSheet()}>Apply</div>
        </div>
        <div className="love-statement">
            Made with <span>♥</span> for HackerRank by Vihang Patel
        </div>
    </footer>
}

export default Footer