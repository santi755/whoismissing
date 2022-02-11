import { accessGoggleSheet } from '../api/google.api.js'
import people from '../../config/people.json';

const GetUsersFromFile = () => {
    accessGoggleSheet().then(sheetData => {
        console.log("Google sheetData => ", sheetData)
    })

    return people
}

export {
    GetUsersFromFile
}