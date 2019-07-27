import React, { useState } from 'react'
import CellInput from './input'

import { navigateSheet, parseCell, highlightCell } from '../utils'
import sheetDataInstance from '../store'


const Cell = ({ id, cellValue }) => {

    const tdRef = React.createRef()
    const [value, setValue] = useState(cellValue)
    const [editable, setEditable] = useState(false)
    const [editableDiv, setEditableDiv] = useState(false)


    const clickHandler = () => {
        let clicks = 0, timeout;
        return event => {
            clicks++;
            if (clicks === 1) {

                timeout = setTimeout(() => {
                    clicks = 0;
                }, 200);
            } else {
                timeout && clearTimeout(timeout);
                setEditable(true)
                clicks = 0;
            }
        };
    }


    const onKeyDown = event => {
        switch (true) {
            case !editable && [37, 38, 39, 40].indexOf(event.keyCode) > -1: {
                onEditFinish({ value })
                navigateSheet({ id, keyCode: event.keyCode })
                return
            }

            case [13].indexOf(event.keyCode) > -1 || event.which === 13: {
                if (editableDiv) {
                    onEditFinish({ value })
                    setEditableDiv(false)
                } else {
                    setValue(value + String.fromCharCode(event.keyCode))
                    tdRef.current.blur()
                    setEditable(true)
                }

                return
            }

            case ([46].indexOf(event.keyCode) > -1): {
                setValue('')
                return
            }

            case ([9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 45].indexOf(event.keyCode) > -1): {
                return
            }

            case (event.keyCode === 8): {
                setValue(value.substr(0, value.length - 1))
                return
            }

            default: {

                if (!editable) {
                    setEditableDiv(true)
                    setValue(value + String.fromCharCode(event.keyCode))
                }
            }
        }

        !editable && event.keyCode === 32 && event.preventDefault()
    }

    const onEditFinish = ({ value }) => {
        setValue(value)
        setEditable(false)
        navigateSheet({ id, keyCode: 40 })
        commitValueToStore({ value })

        setTimeout(() => highlightCells(true), 5)

    }

    const highlightCells = bHighlight => {
        const { command } = parseCell(value)

        if (command && command.cells instanceof Array) {
            command.cells.map(id => highlightCell({ id, bHighlight }))
        }
    }

    const commitValueToStore = ({ value }) => {
        sheetDataInstance.setCellValue(id, parseCell(value))

        highlightCells(false)

        console.log('commited id: ', id, ' value: ', value)
    }


    const parsedValue = parseCell(value)


    return <td tabIndex={0} id={`cell-${id}`} ref={tdRef}
        onBlur={() => commitValueToStore({ value })}
        onFocus={() => highlightCells(true)}
        onKeyDown={onKeyDown}
    >
        {
            editable ? <CellInput onEditFinish={onEditFinish} cellValue={value} /> :
                <div className="cell"
                    onClick={clickHandler()}

                >
                    {parsedValue && parsedValue.command ? sheetDataInstance.getCellValue(id) : value}
                </div>
        }

        <div className="square-handle"></div>
    </td>
}

export default Cell