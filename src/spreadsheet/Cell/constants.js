export const SUGGESTIONS = [
    {
        command: '=SUM(value1, [value2...])',
        autoComplete: 'Sum of a series of numbers or cells',
        regex: /=sum((.?)*)/g
    },
    {
        command: '=AVERAGE(value1, [value2...])',
        autoComplete: 'Numerical average value in a dataset, ignoring text',
        regex: /=average((.?)*)/g

    }
]
const d = SUGGESTIONS[0].regex.exec("=sum(A1:A10,20,30)")
console.log(d[1])