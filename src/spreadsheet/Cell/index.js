import React, { useState } from 'react'
import CellInput from './input'

import { navigateSheet, parseCell, highlightCell } from '../utils'
import sheetDataInstance from '../store'


const Cell = ({ id, cellValue }) => {

    const tdRef = React.createRef()
    const [value, setValue] = useState(cellValue || '')
    const [editable, setEditable] = useState(false)
    const [timeStamp, setTimeStamp] = useState(Date.now())

    // Just to avoid linting problems
    void timeStamp

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
        console.log('\n\n\n td down ', event.keyCode)
        switch (true) {

            // on tab clicked, set editable state to false
            case event.keyCode === 9: {
                setEditable(false)
                return
            }

            // If navigation keys, up, down, left, right arrows are clicked
            case !editable && [37, 38, 39, 40].indexOf(event.keyCode) > -1: {
                navigateSheet({ id, keyCode: event.keyCode })
                event.preventDefault() // Prevent default to browser
                return
            }

            // On press, make it editable, show input box
            case [13].indexOf(event.keyCode) > -1 || event.which === 13: {
                if (!editable) {
                    setEditable(true)
                }
                return
            }

            // Delete clicked
            case ([46].indexOf(event.keyCode) > -1): {
                console.log('delete clicked')
                onEditFinish({ value: '' })
                // After deleting focus the current cell because edit finish moves to next cell
                tdRef.current.focus()
                return
            }

            // various keys like ctrl, shift
            case ([16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 45].indexOf(event.keyCode) > -1): {
                return
            }

            // backspace clicked
            case (event.keyCode === 8): {
                if (!editable) {
                    onEditFinish({ value: '' })
                    tdRef.current.focus()
                }
                return
            }

            default: {

                if (!editable) {
                    setValue(String.fromCharCode(event.keyCode))
                    setEditable(true)
                }
            }
        }

        !editable && event.keyCode === 32 && event.preventDefault()
    }

    const onEditFinish = ({ value: newValue, keyCode = 40 }) => {
        highlightCells(value, false)
        setValue(newValue)
        setEditable(false)
        commitValueToStore({ value: newValue })
        navigateSheet({ id, keyCode })
        highlightCells(newValue, true)
    }

    const highlightCells = (value, bHighlight) => {
        const { command } = parseCell(value)

        if (command && command.cells instanceof Array) {
            command.cells.map(id => highlightCell({ id, bHighlight }))
        }
    }

    const commitValueToStore = ({ value }) => {

        const parsedValuesObj = {
            ...parseCell(value),
            callback: () => setTimeStamp(Date.now())
        }

        sheetDataInstance.setCellValue(id, parsedValuesObj)
    }


    const parsedValue = parseCell(value)

    const onFocus = () => {
        highlightCells(value, true)
    }

    const onBlur = () => {
        highlightCells(value, false)
    }


    return <td tabIndex={0} id={`cell-${id}`} ref={tdRef}
        onBlur={onBlur}
        onFocus={onFocus}
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