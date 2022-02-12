import accessGooggleSheet from '../api/google.api';

const GetUsersFromDrive = async () => {
  const sheetData = await accessGooggleSheet();

  sheetData.forEach((data) => {
    console.log('****************** DATA => ', data.QUIERO);
  });

  return [
    'SA',
  ];
};

export default GetUsersFromDrive;
