export const asyncAuthLocalStorage = {
  login: (name: string): Promise<void> =>
    Promise.resolve().then(function () {
      localStorage.setItem("login", name);
    }),
  getUserSession: (): Promise<string | null> =>
    Promise.resolve().then(() => localStorage.getItem("login")),
  logout: (): Promise<void> =>
    Promise.resolve().then(() => localStorage.removeItem("login")),
  isLoggedIn: (): Promise<boolean> =>
    Promise.resolve().then(() =>
      Boolean(asyncAuthLocalStorage.getUserSession())
    ),
};
