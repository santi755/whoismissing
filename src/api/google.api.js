import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../config/credentials.json' assert {type: "json"}

let googleId = "1T3RK_IvLwX4kiRgHUTC7hc2zpHfNT-XO-Bymnhy_n80"

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
