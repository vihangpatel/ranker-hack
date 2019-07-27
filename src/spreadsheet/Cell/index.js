import React, { useState } from 'react'
import CellInput from './input'

import { navigateSheet, parseCell, highlightCell } from '../utils'
import sheetDataInstance from '../store'


const Cell = ({ id, cellValue }) => {

    const tdRef = React.createRef()
    const [value, setValue] = useState(cellValue)
    const [editable, setEditable] = useState(false)


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
            case event.keyCode === 9: {
                setEditable(false)
                return
            }
            case !editable && [37, 38, 39, 40].indexOf(event.keyCode) > -1: {
                navigateSheet({ id, keyCode: event.keyCode })
                event.preventDefault()
                return
            }

            case [13].indexOf(event.keyCode) > -1 || event.which === 13: {
                if (!editable) {
                    setEditable(true)
                }
                return
            }

            case ([46].indexOf(event.keyCode) > -1): {
                setValue('')
                return
            }

            case ([16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 45].indexOf(event.keyCode) > -1): {
                return
            }

            case (event.keyCode === 8): {
                setValue(value.substr(0, value.length - 1))
                return
            }

            default: {

                if (!editable) {
                    setValue(value + String.fromCharCode(event.keyCode))
                    setEditable(true)
                }
            }
        }

        !editable && event.keyCode === 32 && event.preventDefault()
    }

    const onEditFinish = ({ value, keyCode = 40 }) => {
        setValue(value)
        setEditable(false)
        commitValueToStore({ value })
        navigateSheet({ id, keyCode })

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

    const onFocus = () => {
        console.log('td focus')
        commitValueToStore({ value })
    }

    const onBlur = () => {
        editable && setEditable(false)
        console.log('td blur')
        highlightCells(true)
    }


    return <td tabIndex={0} id={`cell-${id}`} ref={tdRef}
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