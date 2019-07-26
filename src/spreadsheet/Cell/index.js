import React, { useState } from 'react'
import CellInput from './input'

import { navigateSheet } from './utils'


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
    }



    return <td tabIndex={0} id={`cell-${id}`} ref={tdRef}
        onKeyDown={onKeyDown}
    >
        {
            editable ? <CellInput onEditFinish={onEditFinish} cellValue={value} /> :
                <div className="cell"
                    onClick={clickHandler()}

                >
                    {value}
                </div>
        }

        <div className="square-handle"></div>
    </td>
}

export default Cell