type User = {
  email: string;
  name: string;
  userRole: string | null;
};

export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  localStorage.getItem('user');
};
