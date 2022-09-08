const LOCAL_STORAGE_NAME = 'nc-frontend-theme-mode'

export const getLocalStorageData = () =>
  localStorage.getItem(LOCAL_STORAGE_NAME)

export const setLocalStorageData = (dataToSave: any) =>
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(dataToSave))
