

class SheetData {

    constructor() {

        this.cellMeta = {}
    }

    setCellValue(id, option = {}) {
        !this.cellMeta && (this.cellMeta = {})
        this.cellMeta[id] = { ...option }
        console.log(this.cellMeta[id])
    }

    evaluateCell(id) {
        const matchingCellMeta = this.cellMeta[id]

        if (!matchingCellMeta) {
            return ''
        }

        let value = ''
        if (matchingCellMeta && matchingCellMeta.command) {
            const { type, cells } = matchingCellMeta.command
            switch (type) {
                case "SUM":
                    {
                        value = (cells || []).reduce((result, cellId) => {
                            result = result + +this.getCellValue(cellId)
                            return result
                        }, 0)
                        break;
                    }
                case "AVERAGE":
                    {
                        value = (cells || []).reduce((result, cellId) => {
                            result = result + +this.getCellValue(cellId)
                            return result
                        }, 0)

                        value = value / (cells || []).length
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

    sum(id) {

    }

    average() {

    }

    getCellValue(id) {

        return this.evaluateCell(id)
    }
}

// Return singleton instance
export default new SheetData()