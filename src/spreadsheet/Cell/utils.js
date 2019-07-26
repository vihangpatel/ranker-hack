

export const navigateSheet = ({ id, keyCode }) => {
    const td = document.querySelector(`#cell-${id}`)
    const { row, col } = breakId(id)
    let nexttd = null
    const idMap = {
        37: `${row}-${col - 1}`,
        38: `${row - 1}-${col}`,
        39: `${row}-${col + 1}`,
        40: `${row + 1}-${col}`,
    }
    if (td && row.toString() && col.toString()) {
        nexttd = document.querySelector(`td#cell-${idMap[keyCode]}`)
        nexttd && nexttd.focus()
    }
}

export const breakId = id => {
    const [row, col] = (typeof id === 'string' ? id.replace('cell', '') : '').split('-')
    return { row: +row, col: +col }
}

