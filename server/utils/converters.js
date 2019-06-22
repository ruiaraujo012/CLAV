const jsonexport = require('jsonexport')
const { Parser } = require('json2csv')
exports.obj = (jsonData, containers) => {
	let xml = ''

	const blockContainer = containers[0]
	xml += `<${blockContainer}>`

	Object.keys(jsonData).forEach((key) => {
		if (Array.isArray(jsonData[key])) {
			containers.splice(0, 1)
			const t = containers[0]
			xml += `<${t}>`

			if (jsonData[key].length > 0) {
				containers.splice(0, 1)
				jsonData[key].forEach((array) => {
					let obj = {}
					obj = array

					const newContainers = [...containers]
					xml += this.obj(obj, newContainers)
				})
			} else {
				containers.splice(0, 1)
				xml += `<${containers[0]}/>`
			}

			xml += `</${t}>`
		} else if (typeof jsonData[key] === 'object') {
			containers.splice(0, 1)

			let obj = {}
			obj = jsonData[key]

			xml += this.obj(obj, containers)
		} else {
			xml += `<${key}>`
			xml += jsonData[key]
			xml += `</${key}>`
		}
	})

	xml += `</${blockContainer}>`

	return xml
}

exports.arr = (jsonData, containers) => {
	let xml = ''

	const newContainers = [...containers]

	Object.keys(jsonData).forEach((key) => {
		if (Array.isArray(jsonData[key])) {
			const insideBlock = newContainers[0]

			newContainers.splice(0, 1)

			xml += `<${insideBlock}>`

			jsonData[key].forEach((array) => {
				xml += this.arr({ array }, newContainers)
			})

			xml += `</${insideBlock}>`
		} else if (typeof jsonData[key] === 'object') {
			const insideBlock = newContainers[0]

			newContainers.splice(0, 1)

			xml += `<${insideBlock}>`

			xml += this.arr(jsonData[key], newContainers)

			xml += `</${insideBlock}>`
		} else {
			xml += `<${key}>`

			xml += jsonData[key]

			xml += `</${key}>`
		}
	})

	return xml
}

exports.JSON2XML = (jsonData, containers) => {
	let response = '<?xml version="1.0" encoding="UTF-8"?>'
	if (Array.isArray(jsonData)) response += this.arr({ jsonData }, containers)
	else response += this.obj(jsonData, containers)
	return response
}

exports.csv = (array) =>{
	let final = ''
	jsonexport(array,{rowDelimiter: ';'},function(err, csv){
		if(err) return console.log(err);
		const headersList = []
		const headersListFilhos = []
		const headersfilhos = []
		let headers = csv.split("\n")[0].substring(0, csv.split("\n")[0].length - 1);
		for(i in headers.split(";")){
			headersList.push(headers.split(";")[i])
		}
		for(i in headersList){
			if(headersList[i].indexOf('.') > -1 == true){
				headersListFilhos.push(headersList[i])
			}
		}

		for(i in headersListFilhos){
			headersListFilhos[i] = headersListFilhos[i].replace("." + headersListFilhos[i].split(".").pop(-1), "")
			if(headersfilhos.includes(headersListFilhos[i]) == false ){
				headersfilhos.push(headersListFilhos[i])
			}

		}
		
		const csvFinal = (fields,fields2,data) => {
			const json2csvParser = new Parser({ fields, delimiter: ';', unwind: fields2, unwindBlank: true } )
			const csv = json2csvParser.parse(data)
			return csv
		}
		final = csvFinal(headersList,headersfilhos,array)
	});	
	return final
}

exports.JSON2CSV = (jsonData) => {
	if (!Array.isArray(jsonData)){
		var array = []
		array.push(jsonData)
	}else{
		array = jsonData
	}
	return this.csv(array)
}
