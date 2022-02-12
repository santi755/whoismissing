import accessGoggleSheet from '../api/google.api';

const GetUsersFromDrive = () => {
  accessGoggleSheet().then((sheetData) => {
    sheetData.forEach((data) => {
      console.log(data);
    });
  });

  return [
    'SA',
  ];
};

export default GetUsersFromDrive;
