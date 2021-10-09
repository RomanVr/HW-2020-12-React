export const isLoggedIn = (): boolean => {
  const isLogged = localStorage.getItem("login");
  return Boolean(isLogged);
};

export const logout = (nameUser: string): void => {
  localStorage.removeItem(nameUser);
};

export const login = (nameUser: string): void => {
  localStorage.setItem("login", nameUser);
};
