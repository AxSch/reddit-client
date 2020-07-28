const filterData = data => {
    const filteredData = data.filter(element => element.data["over_18"] === false)
    if (filteredData.length > 0) {
        return filteredData
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


export const formatDate = (date) => {
     const utcDate = new Date(date * 1000)

     const day = utcDate.getDate().toString()
     const month = (utcDate.getUTCMonth() + 1).toString()
     const year = utcDate.getFullYear().toString()
     const hour = utcDate.getHours().toString()
     const minutes = utcDate.getMinutes().toString()

     const pDate = `${day}/${month}/${year}`
     const pTime = `${hour.padStart(2, '0')}:${minutes.padStart(2,'0')}`

     return {
        pDate,
        pTime,
     }

     
}
