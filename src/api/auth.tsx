export const isLoggedIn = (): boolean => {
  const isLogged = localStorage.getItem("login");
  return Boolean(isLogged);
};

export const getLogin = (): string | null => {
  const isLogged = localStorage.getItem("login");
  return isLogged;
};

export const logout = (): void => {
  localStorage.removeItem("login");
};

export const login = (nameUser: string): void => {
  localStorage.setItem("login", nameUser);
};
