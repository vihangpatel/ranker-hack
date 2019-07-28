

class SheetData {

    constructor() {

        this.cellMeta = {}
        this.depsMap = {}
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
            const { type, cells, staticVal, staticArgsCount } = matchingCellMeta.command
            switch (type) {
                case "SUM":
                    {
                        value = (cells || []).reduce((result, cellId) => {
                            const evaluatedVal = cellId !== id ? +this.getCellValue(cellId) : 0
                            result = result + (!isNaN(evaluatedVal) ? evaluatedVal : 0)
                            return result
                        }, +staticVal)
                        break;
                    }
                case "AVERAGE":
                    {
                        value = (cells || []).reduce((result, cellId) => {
                            const evaluatedVal = cellId !== id ? +this.getCellValue(cellId) : 0
                            result = result + (!isNaN(evaluatedVal) ? evaluatedVal : 0)
                            return result
                        }, +staticVal)

                        value = value / ((cells || []).length + staticArgsCount)
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
}

window._test = new SheetData()

// Return singleton instance
export default window._test