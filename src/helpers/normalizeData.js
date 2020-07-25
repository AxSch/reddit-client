export const normalizeData = (data) => {
    const filteredData = data.filter(element => element.data["over_18"] === false)
    const normalizedData = []
    let dataObj = {}
    filteredData.forEach(element => {
        dataObj = element.data
        normalizedData.push(dataObj)

    })
    return normalizedData

}
