const setAdminToken = () => {
  localStorage.setItem('adminToken', token);
};

const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

const removeAdminToken = () => {
  localStorage.removeItem('adminToken');
};

export { setAdminToken, getAdminToken, removeAdminToken };
