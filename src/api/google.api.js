import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../config/credentials.json' assert { type: "json" };

const googleId = process.env.FILE_SPREAD_ID;

const accessGooggleSheet = async () => {
  const document = new GoogleSpreadsheet(googleId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();

  // Sheet 1, TODO: Change for "sheet of current year" to make it work
  let year = new Date().getFullYear();
  const sheet = document.sheetsByTitle[year];
  // const sheetRows = await sheet.getRows();

  const sheetCells = await sheet.getCellsInRange("A1:Z200");

  return sheetCells;
};

export default accessGooggleSheet;
