import accessGooggleSheet from '../api/google.api';

const GetUsersFromDrive = async () => {
  const sheetCells = await accessGooggleSheet();

  const date = new Date();
  const today = date.getDate().toString();
  const options = { year: 'numeric', month: 'long' };
  const thisMonth = (date.toLocaleDateString('es-ES', options)).replace('de ', '');

  // Number of possible names in this month (rows)
  const POSSIBLEROWS = 8;
  let possibleNames = POSSIBLEROWS;

  // Position of day inside array of dates
  let pos = -1;
  const names = [];

  sheetCells.forEach((cell) => {
    if (possibleNames >= 0 && pos > 0) {
      if (cell[pos]) {
        names.push(cell[pos]);
      }
      possibleNames -= 1;
    }

    // Day row
    if (POSSIBLEROWS - 1 === possibleNames) {
      pos = cell.indexOf(today);
    }

    // Month row
    if (cell[0] === thisMonth && possibleNames > 0) {
      possibleNames -= 1;
    }
  });

  return names;
};

export default GetUsersFromDrive;
