const csv = require('csvtojson')
const form = date=>("00"+date).slice(-2)
const _ = require("fxjs/Strict")

const setType = data => {
    for(const key in data){
        if(key == 'time')data[key]=new Date(data[key])
        else data[key]=Number(data[key])
    }
    return data
}
module.exports = () => {
    return{
        async readCSV(filePath) {
            const ret = _.go(
                await csv().fromFile(filePath),
                _.map(setType),
                _.takeAll,
            );
            return ret()
        },
        getDate() {
            const d = new Date()
            return `${d.getFullYear()}-${form(d.getMonth()+1)}.${form(d.getDate())}:${form(d.getSeconds())}`
        }
    }
}