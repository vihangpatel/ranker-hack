

class SheetData {

    constructor() {

        this.cellMeta = {}
    }

    setCellValue(id, value, option = {}) {
        !this.cellMeta && (this.cellMeta = {})
        this.cellMeta[id] = {
            text: value,
            command: {
                ...(option.command ? {
                    type: option.command.type,
                    cells: [...option.command.cells]
                } : {})
            }
        }
    }

    evaluateCell(id) {
        const matchingCellMeta = this.cellMeta[id]
        let value = ''
        if (matchingCellMeta && matchingCellMeta.command) {
            const { type, cells } = matchingCellMeta.command
            switch (type) {
                case "SUM":
                    {
                        (cells || []).map(_ => 1)
                    }
                case "AVERAGE":
                    {

                    }
                default:
                    break;
            }
        } else {
            value = matchingCellMeta.value
        }

        return value
    }

    sum(id) {

    }

    average() {

    }

    getCellValue(id) {

        const matchingCellMeta = this.cellMeta[id]


    }
}

// Return singleton instance
export default new SheetData()