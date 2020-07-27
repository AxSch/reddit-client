const filterData = data => {
    const filteredData = data.filter(element => element.data["over_18"] === false)
    if (filteredData.length > 0) {
        return filterData
    } else return data
        
}

export const normalizeData = data => {
    const filteredData = filterData(data)
    const normalizedData = []
    let dataObj = {}
    const flatData = {}

    filteredData.forEach(element => {
        dataObj = element.data
        normalizedData.push(dataObj)

    })

    normalizedData.forEach(item => {
        flatData[item.id] = item
    })
    return flatData

}
