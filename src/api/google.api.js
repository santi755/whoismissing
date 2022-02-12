import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../config/credentials.json';

const googleId = process.env.FILE_SPREAD_ID;

const accessGooggleSheet = async () => {
  const document = new GoogleSpreadsheet(googleId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();

  const sheet = document.sheetsByIndex[0];
  const sheetData = await sheet.getRows();

  return sheetData;
};

export default accessGooggleSheet;
