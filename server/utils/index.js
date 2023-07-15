const fs = require('fs')
const path = require('path')

const filepath = path.join(__dirname, '../', 'data', 'data.json')

module.exports = {
  getData,
  writeData,
  getById
}

function getData (filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      try {
        const parseData = JSON.parse(data)
        resolve(parseData)
      } catch (err) {
        console.error(err)
        return new Error('Oh no! Unable to parse the data!')
      }
    })
  })
}

async function getById (id, filepath) {
  const data = await getData(filepath)
  try {
    const details = data.puppies.find(puppy => puppy.id === id)
    return details
  } catch (err) {
    console.error(err)
    return new Error('Oh no! Unable to grab by ID!')
  } 
}

async function writeData (updatedData) {
  const data = await getData(filepath)
    
    const editThisPuppy = data.puppies.find(puppy => puppy.id === updatedData.id)
    if (!editThisPuppy) {
      console.error('Unable to find data')
      return new Error('Oh no! ID was not found!')
    }

    const { name, breed, owner, image} = updatedData
    
    const updatedPuppies = {
      ...data
    }

    // const updatedPuppyTest = Object.assign(editThisPuppy, { name, breed, owner, image })
    // console.log(updatedPuppyTest)

    const stringifyData = JSON.stringify(updatedPuppies,  null, 2)

    fs.writeFile(filepath, stringifyData, 'utf8', (err) => {
      if (err) {
        console.error('Unable to write to that file')
        return new Error('Oh no! That file does not want to be written to!')
      }
      return stringifyData
    })
}

// function addData (data, cb) {
//   const newPuppy = {
//     ...data
//   }
//   const newPuppyData = JSON.stringify(newPuppy, null, 2)

//   fs.writeFile(filepath, newPuppyData, 'utf8', (err) => {
//     if (err) {
//       console.error('Unable to write to that file')
//       cb(new Error('Oh no! That file does not want to be written to!'))
//       return 
//     }
//     cb()
//   })
// }
