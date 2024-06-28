const setAdminToken = (token) => {
  localStorage.setItem('token', token);
};

const getAdminToken = () => {
  return localStorage.getItem('token');
};

const removeAdminToken = () => {
  localStorage.removeItem('token');
};

export { setAdminToken, getAdminToken, removeAdminToken };
