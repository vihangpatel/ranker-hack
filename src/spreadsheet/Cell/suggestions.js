import React from 'react'

import { SUGGESTIONS } from './constants'



const Suggestions = ({ value }) => {

    return <div className="autosuggestion-box">
        {SUGGESTIONS.filter(_ => _.command
            .toLowerCase().indexOf(value.toLowerCase()) > -1)
            .map(_ =>
                <div key={_.command} className="command-palette">
                    <div className="command">{_.command}</div>
                    <div className="command-description">{_.autoComplete}</div>
                </div>)
        }
    </div>
}

export default Suggestions