import React, { useEffect, useState } from 'react'
import Suggestions from './suggestions'

import { SUGGESTIONS } from './constants'

const CellInput = ({ cellValue, onEditFinish }) => {

    const inputRef = React.createRef()
    const [value, setValue] = useState(cellValue)

    const [showSuggestions, setShowSuggestions] = useState(false)

    const onBlur = () => onEditFinish({
        value: inputRef.current.value
    })

    const onKeyPress = event => {

        console.log('cell press')

        if (event.which === 13 || [13].indexOf(event.keyCode) > -1) {
            onBlur()
            // Return on pressing enter
            return
        }

        console.log(String.fromCharCode(event.keyCode))
        if (event.currentTarget.value.trim()[0] === '=') {
            setShowSuggestions(true)
        } else {
            setShowSuggestions(false)
        }
    }

    const onKeyDown = event => {
        console.log('cell down')
        if ([27].indexOf(event.keyCode) > -1) {
            onBlur()
            return
        }
    }

    // On mounting the component, focus it 
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return <div className="editable-input" >
        <input ref={inputRef}
            className={showSuggestions ? 'command-input' : ''}
            type="text"
            onBlur={onBlur}
            defaultValue={value}
            onKeyPressCapture={onKeyPress}
            onKeyDownCapture={onKeyDown}
            onChange={e => setValue(e.currentTarget.value)}
        ></input>
        {
            showSuggestions && <Suggestions value={value} />
        }
    </div >
}

export default CellInput