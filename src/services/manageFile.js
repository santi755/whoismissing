import { accessGoggleSheet } from '../api/google.api.js';
import people from '../../config/people.json';

const GetUsersFromFile = () => {
    accessGoggleSheet().then(sheetData => {
        sheetData.forEach(data => {
            console.log("data => ", data)
        })
    })

    return people
}

export {
    GetUsersFromFile
}
