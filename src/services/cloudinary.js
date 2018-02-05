const cUser = 'dph3nw8ym';
const FETCH_URL = `https://res.cloudinary.com/${cUser}/image/upload`;

export const getUrl = (fileName, options = '') => {
  return `${FETCH_URL}/${options}/${fileName}`;
};