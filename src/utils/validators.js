export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // Min 6 chars, 1 letter, 1 number
  return password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password);
};