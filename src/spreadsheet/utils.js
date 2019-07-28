export const navigateSheet = ({ id, keyCode }) => {
    const td = document.querySelector(`#cell-${id}`);
    const { row, col } = breakId(id);
    let nexttd = null;
    const idMap = {
        37: `${row}-${col - 1}`,
        38: `${row - 1}-${col}`,
        39: `${row}-${col + 1}`,
        40: `${row + 1}-${col}`
    };
    if (td && row.toString() && col.toString()) {
        nexttd = document.querySelector(`td#cell-${idMap[keyCode]}`);
        nexttd && nexttd.focus();
    }
};

export const highlightCell = ({ id, bHighlight }) => {

    const cellToHightlight = document.querySelector(`#cell-${id}`)
    const innerCellDiv = cellToHightlight && cellToHightlight.children && cellToHightlight.children[0]

    if (innerCellDiv) {
        if (bHighlight) {
            innerCellDiv.parentNode.style.border = `2px dashed ${getRandomColor()}`
            innerCellDiv.parentNode.style['box-shadow'] = '1px 1px 5px 0px rgba(0,0,0,0.75);'
        } else {
            innerCellDiv.parentNode.style.border = '1px solid rgba(0,0,0,0.2)'
            innerCellDiv.parentNode.style['box-shadow'] = 'none'
        }

        return true
    }

    return false
}


export const breakId = id => {
    const [row, col] = (typeof id === "string"
        ? id.replace("cell", "")
        : ""
    ).split("-");
    return { row: +row, col: +col };
};

const availableSymbols = [...Array(26)].map((_, __) =>
    String.fromCharCode(65 + __)
); // Get all the symbols from A,B,C,D ... Z
const TARGET_BASE = availableSymbols.length;

const cache = {};

export const convertToABCD = row => {
    let output = "";

    // Cache the row to Char Column calculation
    if (cache[row]) {
        return cache[row];
    }

    do {
        const divisionedRow = row / TARGET_BASE;
        const isExactInteger =
            divisionedRow === parseInt(divisionedRow, 10) && divisionedRow != 0;
        const modulo = isExactInteger
            ? 0
            : Math.max(row % TARGET_BASE, 0);
        output = availableSymbols[modulo] + output;
        row =
            row % TARGET_BASE === 0
                ? parseInt(divisionedRow, 10) - 1
                : parseInt(divisionedRow, 10) - 1;
    } while (row >= 0);

    // cache to avoid calculation next time
    cache[row] = output;

    return output;
};

export const handleRange = (startCellId, endCellId) => {
    const startCell = extractCellId(startCellId);
    const endCell = extractCellId(endCellId);

    if (!startCell || !endCell) {
        return []
    }

    let sx = convertToIndex(startCell.col);
    let sy = +startCell.row - 1;

    let ex = convertToIndex(endCell.col);
    let ey = +endCell.row - 1;

    if (sx > ex) {
        // swap cols
        let t = sx;
        sx = ex;
        ex = t;
    }

    if (sy > ey) {
        let t = sy;
        sy = ey;
        ey = t;
    }

    const selectedCells = [];

    for (let i = sy; i <= ey; i++) {
        for (let j = sx; j <= ex; j++) {
            selectedCells.push(`${i}-${j}`);
        }
    }

    return selectedCells;
};

export const convertToIndex = str => {
    let i = str.length - 1,
        j = 0,
        result = 0;
    do {
        result =
            result +
            (availableSymbols.indexOf(str[i].toUpperCase()) + 1) *
            Math.pow(TARGET_BASE, j);
        i--;
        j++;
    } while (i >= 0);

    return result - 1;
};

export const getIndexFromZero = index => Math.max(0, +index - 1);


export const extractCellId = cellId => {
    const CELL_ID_REGEX = new RegExp(/((^[a-zA-Z]+)([0-9]+)$)/g);
    const regexMatch = CELL_ID_REGEX.exec(cellId);
    if (regexMatch && regexMatch[2] && regexMatch[3]) {
        return {
            row: regexMatch[3],
            col: regexMatch[2]
        };
    }

    return null;
};



export const parseCell = str => {

    const CELL_ID_REGEX = "((^[a-zA-Z]+)([0-9]+)$)";
    const EXPRESSION_REGEX = "^=\s*(sum|power|average|pow)\s*\((.*)\)"
    const parsedOp = new RegExp(EXPRESSION_REGEX, 'g').exec(str.toLowerCase().replace(/\s*/g, ""))


    // for e.g. sum operation 
    /**
     * cellValue = {
     *    text: "=sum(B1:C5,10,20)",
     *    command: {
     *        "type": "sum",
     *        "cells": ['1-1', '1-2','1-3','1-4', ...],
     *        "staticVal": 24
     *    }
     * }
     */
    let cellValue = {
        text: str
    }

    str = str.toUpperCase()

    // for e.g. parsedOp =>[ "=sum(A10:A11,A10,20,30)", "sum" , "(A10:A11,A10,20,30)" ]
    if (parsedOp && parsedOp[1] && parsedOp[2]) {

        const args = parsedOp[2]
            .replace(/\(|\)/g, "")
            .split(",")

        let results = []

        console.log(parsedOp[1])

        switch (true) {
            case ['sum', 'average'].indexOf(parsedOp[1]) > -1: {
                results = args
                    .reduce(
                        (result, _) => {
                            let range = _.split(":");


                            if (!!new RegExp(CELL_ID_REGEX.toString(), 'gm').exec(_)) {
                                result.cells = result.cells.concat(handleRange(_, _))
                            }

                            switch (true) {
                                // evaluate range
                                case range && range.length >= 2: {
                                    result.cells = result.cells.concat(
                                        handleRange(range[0], range[1])
                                    );
                                    break;
                                }

                                default: {
                                    if (!isNaN(_)) {
                                        result.staticVal.push(_);
                                    }
                                }
                            }

                            return result;
                        },
                        { cells: [], staticVal: [] }
                    );
                break
            }

            case parsedOp[1] === 'pow':
            case parsedOp[1] === 'power': {
                console.log(args)
                // it needs only 2 arguments, mapped with base and exponent
                if (args.length === 2) {
                    results = args.reduce((result, _, index) => {
                        if (!!new RegExp(CELL_ID_REGEX.toString(), 'gm').exec(_)) {
                            // If it is cell, extract cell id in different result
                            const { row, col } = extractCellId(_)
                            let x = convertToIndex(col);
                            let y = +row - 1;

                            result.cells.push(`${y}-${x}`)
                            index === 0 ? result.expoCel = `${y}-${x}` : result.baseCel = `${y}-${x}`
                        }
                        if (!isNaN(_)) {
                            // If it is number, extract it in number
                            index === 0 ? result.expo = _ : result.base = _
                        }
                        return result

                    }, { cells: [] })
                } else {
                    results = { error: 'error' }
                }
            }
        }




        cellValue.command = {
            type: parsedOp[1].toUpperCase(),
            ...results
        }
    }
    return cellValue;
}

export const getRandomColor = () => '#' + '0123456789abcdef'.split('').map(function (v, i, a) {
    return i > 5 ? null : a[Math.floor(Math.random() * 16)]
}).join('');