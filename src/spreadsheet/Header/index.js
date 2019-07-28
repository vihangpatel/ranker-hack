import React from 'react'
import sheetImage from './sheet.png'

const dummyMenuName = ['File', 'Edit', 'View', 'Insert', 'Format', 'Data', 'Tools']

const Header = () => {

    return <header>
        <div className="logo-container">
            <img src={sheetImage} />
        </div>
        <div className="menu-container">
            <div className="sheet-name-container">
                Untitled Spreadsheet
            </div>
            <div className="menu">
                {
                    dummyMenuName.map(menu =>
                        <span className="menu-item" key={menu}>{menu}</span>
                    )
                }
            </div>
        </div>
        <div className="action-items">
            <div className="button">
                Save
            </div>
            <div className="button">
                Clear
            </div>
        </div>
    </header>
}

export default Header