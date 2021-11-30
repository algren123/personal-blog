export const europeanDate = (date) => {
  return date.split('-').reverse().join('-');
};

export const link = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/'
    : '';
};
