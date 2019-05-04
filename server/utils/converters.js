exports.obj = (jsonData, containers) => {
	let xml = ''

	const blockContainer = containers[0]

	xml += `<${blockContainer}>`

	Object.keys(jsonData).forEach((key) => {


		if (Array.isArray(jsonData[key])) {
			containers.splice(0, 1)

			if (jsonData[key].length > 0) {
				const newContainers = [...containers]
				jsonData[key].forEach((array) => {
					xml += this.obj({ array }, newContainers)
				})
			} else {
				containers.splice(0, 1)
			}
		} else if (typeof jsonData[key] === 'object') {
			containers.splice(0, 1)
			xml += this.obj(jsonData[key], containers)
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
	if (Array.isArray(jsonData)) response = this.arr({ jsonData }, containers)
	else response += this.obj(jsonData, containers)
	return response
}
