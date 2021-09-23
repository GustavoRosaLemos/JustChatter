export const getSessionParam = (param: string): string | null => sessionStorage.getItem(param);

export const saveSessionParam = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const clearSessionParams = (): void => {
  sessionStorage.clear();
};
