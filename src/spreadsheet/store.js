import preloadedData from '../data'
import { DEBUG } from './utils';


class SheetData {

    constructor(props) {

        // These could have been made private
        this.cellMeta = props.cellMeta || {}
        this.depsMap = props.depsMap || {}
    }

    getCellMeta(id) {
        return this.cellMeta[id]
    }

    removeListener(id) {
        // Remove old references before the cell update
        const matchingCellMeta = this.cellMeta[id]  // Points to the value before update

        if (!matchingCellMeta) {
            // If no cells
            return false
        }

        const { command } = matchingCellMeta
        const depsMap = { ...this.depsMap }

        if (command && command.cells instanceof Array) {
            // Remove all dependent cells
            this.depsMap = Object.keys(depsMap).reduce((result, dependentCellId) => {
                // Remove the current cell id
                result[dependentCellId] = (depsMap[dependentCellId] || []).filter(_ => _.trim() !== id)
                return result
            }, {})

            return true
        }

        return false
    }

    addEventListener(id) {
        // Push the listener
        const { command } = this.cellMeta[id]
        const depsMap = { ...this.depsMap }

        if (command && command.cells instanceof Array) {
            // Add all dependent cells
            this.depsMap = (command.cells || []).reduce((result, dependentCellId) => {

                // if cell is referring to itself ignore
                if (dependentCellId === id) {
                    return result
                }

                // Add the current cell id
                !result[dependentCellId] && (result[dependentCellId] = [])
                result[dependentCellId].push(id)
                return result
            }, depsMap)
        }
    }

    executeEventListeners(id) {
        const dependentCellId = this.depsMap[id]

        // If any dependency is there   
        if (dependentCellId instanceof Array) {
            for (let i = 0; i < dependentCellId.length; i++) {

                // If the same id is there, exclude it
                if (dependentCellId[i] === id) {
                    continue;
                }
                // Get the meta information of the cell which is dependent on the current id
                const targetCellMeta = this.cellMeta[dependentCellId[i]]

                // null check
                if (targetCellMeta && targetCellMeta.callback) {
                    // call the set state method of the cell to update the value
                    targetCellMeta.callback()
                }

                // chain if any event listener is chained
                this.executeEventListeners(dependentCellId[i])
            }
        }
    }


    setCellValue(id, option = {}) {
        this.removeListener(id)
        !this.cellMeta && (this.cellMeta = {})
        this.cellMeta[id] = { ...option }
        this.addEventListener(id)
        this.executeEventListeners(id)
        console.log(this.cellMeta[id], this.depsMap)
    }

    evaluateCell(id) {
        const matchingCellMeta = this.cellMeta[id]

        if (!matchingCellMeta) {
            return ''
        }

        let value = ''
        if (matchingCellMeta && matchingCellMeta.command) {
            const { type, cells, staticVal } = matchingCellMeta.command
            switch (type) {
                case "SUM":
                    {

                        value = (cells || []).reduce((result, cellId) => {
                            const evaluatedVal = cellId !== id ? +this.getCellValue(cellId) : 0
                            result = result + (!isNaN(evaluatedVal) ? evaluatedVal : 0)
                            return result
                        }, staticVal.reduce((sum, val) => sum + +val, 0))


                        if (cells.length === 0 && staticVal.length === 0) {
                            value = '#ERROR'
                        }

                        break;
                    }
                case "AVERAGE":
                    {
                        value = (cells || []).reduce((result, cellId) => {
                            const evaluatedVal = cellId !== id ? +this.getCellValue(cellId) : 0
                            result = result + (!isNaN(evaluatedVal) ? evaluatedVal : 0)
                            return result
                        }, staticVal.reduce((sum, val) => sum + +val, 0))

                        value = value / ((cells || []).length + staticVal.length)

                        // If static args count is zero, or no cells are there 
                        if (staticVal.length === 0 && cells && cells.length === 0) {
                            value = '#ERROR'
                        }
                        break;
                    }
                case "POW":
                case "POWER": {
                    const { expoCel, baseCel, expo, base, error } = matchingCellMeta.command
                    console.log(matchingCellMeta.command)
                    if (error || expoCel === id || baseCel === id) {
                        value = '#ERROR'
                    } else {
                        let expoVal = expoCel ? +this.getCellValue(expoCel) : expo
                        let baseVal = baseCel ? +this.getCellValue(baseCel) : base

                        value = Math.pow(+expoVal, +baseVal)
                    }
                    break;
                }
                default:
                    break;
            }
        } else {
            value = matchingCellMeta.text
        }

        return value
    }


    getCellValue(id) {

        return this.evaluateCell(id)
    }

    serialize() {
        writeToDisk({
            cellMeta: this.cellMeta,
            depsMap: this.depsMap
        })
    }

    clear(commitToDisk) {
        this.cellMeta = {}
        this.depsMap = {}

        // If commit is passed as true, put it on disk
        commitToDisk && writeToDisk(null)
    }
}


const writeToDisk = data => {
    try {
        localStorage.setItem('sheet', JSON.stringify(data))
        return true
    } catch (e) {
        return false
    }
}

const readFromDisk = () => {
    try {
        return JSON.parse(localStorage.getItem('sheet')) || {}
    } catch (e) {
        return {}
    }
}

let dataToLoad = readFromDisk()

if (Object.keys(dataToLoad).length === 0) {
    // if the user is landing for first time, show hime preloaded data
    dataToLoad = preloadedData
}

const singletonInstance = new SheetData(dataToLoad)

if (DEBUG) {

    // expose store in singleton fashion
    window.__store = singletonInstance
}

// Return singleton instance
export default singletonInstance