

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

const availableSymbols = [...Array(26)].map((_, __) => String.fromCharCode(65 + __)) // Get all the symbols from A,B,C,D ... Z
const TARGET_BASE = availableSymbols.length

const cache = {}

export const convertToABCD = row => {
    let output = ''

    // Cache the row to Char Column calculation
    if (cache[row]) {
        return cache[row]
    }

    do {
        const divisionedRow = row / TARGET_BASE
        const isExactInteger = divisionedRow === parseInt(divisionedRow) && divisionedRow !== 0
        const modulo = isExactInteger ? TARGET_BASE : Math.max(row % TARGET_BASE, 0)
        output = availableSymbols[modulo] + output
        row = row % TARGET_BASE === 0 ? parseInt(divisionedRow) - 1 : parseInt(divisionedRow)
    } while (row > 0)

    // cache to avoid calculation next time
    cache[row] = output

    return output
}