export const getDownloadTokenFromLocalStorage = (setId: number) => {
    return localStorage.getItem(`downloadToken${setId}`);
};

export const saveDownloadTokenToLocalStorage = (setId: number, token?: string) => {
    if (!token) return;
    localStorage.setItem(`downloadToken${setId}`, token);
};
