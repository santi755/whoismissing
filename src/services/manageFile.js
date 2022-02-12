import accessGoggleSheet from '../api/google.api';
import people from '../../config/people.json';

const GetUsersFromFile = () => {
  accessGoggleSheet().then((sheetData) => {
    sheetData.forEach((data) => {
      console.log(data);
      
    });
  });

  return people;
};

export {
  GetUsersFromFile,
  people,
};
