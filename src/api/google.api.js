import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../config/credentials.json';

let googleId = process.env.FILE_SPREAD_ID;

const accessGoggleSheet = async () => {

    const document = new GoogleSpreadsheet(googleId);
    await document.useServiceAccountAuth(credentials);
    await document.loadInfo();

    const sheet = document.sheetsByIndex[0];
    const sheetData = await sheet.getRows();

    return sheetData;
    
}

export {
    accessGoggleSheet
}
