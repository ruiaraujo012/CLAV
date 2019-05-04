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
	if (Array.isArray(jsonData)) response = this.arr({ jsonData }, containers)
	else response += this.obj(jsonData, containers)
	return response
}
