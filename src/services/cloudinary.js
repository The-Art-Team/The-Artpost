// const cUser = 'dzskmm2e8';
// const FETCH_URL = `https://res.cloudinary.com/${cUser}/image/upload`;

// export const getUrl = (fileName, options = '') => {
//   return `${FETCH_URL}/${options}/${fileName}`;
// };

const { protocol } = window.location;
const PROJECT_NAME = 'dzskmm2e8';
const FETCH_URL = `${protocol}//res.cloudinary.com/${PROJECT_NAME}/image/fetch`;

export const getUrl = (url, options = '') => {
  return `${FETCH_URL}/${options}/${encodeURIComponent(url)}`;
};