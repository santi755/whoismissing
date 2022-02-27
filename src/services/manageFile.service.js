import accessGooggleSheet from '../api/google.api';

const GetUsersFromDrive = async () => {
  const sheetCells = await accessGooggleSheet();

  let date = new Date();
  let today = date.getDate().toString();

  const options = { year: 'numeric', month: 'long'};

  let thisMonth = (date.toLocaleDateString('es-AR', options)).replace('de ', '');

  // Number of possible names in this month (rows)
  const POSSIBLEROWS = 8;
  let possibleNames = POSSIBLEROWS;

  // Position of day inside array of dates
  let pos = -1;
  let names = [];

  sheetCells.forEach((cell) => {
    // Names row
    if (possibleNames >= 0 && pos > 0) {
      if (cell[pos]) {
        names.push(cell[pos]);
      }
      possibleNames--;
    }

    // Day row
    if (POSSIBLEROWS-1 === possibleNames) {
      pos = cell.indexOf(today);
    }

    // Month row
    if (cell[0] == thisMonth && possibleNames > 0) {
      possibleNames--;
    }
  });

  return names;
};

export default GetUsersFromDrive;
