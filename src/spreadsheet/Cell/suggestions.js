import React from 'react'

import { SUGGESTIONS } from './constants'



const Suggestions = ({ value }) => {

    console.log(SUGGESTIONS.filter(_ => _.command
        .toLowerCase().indexOf(value.toLowerCase()) > -1))

    return <div className="autosuggestion-box">
        {SUGGESTIONS.filter(_ => _.command
            .toLowerCase().indexOf(value.toLowerCase()) > -1)
            .map(_ => <div className="command-palette">
                <div className="command">{_.command}</div>
                <div className="command-description">{_.autoComplete}</div>
            </div>)
        }
    </div>
}

export default Suggestions