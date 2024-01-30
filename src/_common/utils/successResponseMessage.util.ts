import { translateThis } from './translate-this';

export const findOneSuccess = (message: string, data: any) => {
  return { message, data };
};

export const createSuccess = (message: string): { message: string } => {
  return { message };
};

export const updateSuccess = (message: string): { message: string } => {
  return { message };
};

export const deleteSuccess = (message: string): { message: string } => {
  return { message };
};
//---------------- Refactor with translation ------------------------//

export const findOneSuccessTranslated = (message: string, data: any) => {
  return { message: translateThis(message), data };
};

export const createSuccessTranslated = (
  message: string,
): { message: string } => {
  return { message: translateThis(message) };
};

export const updateSuccessTranslated = (
  message: string,
): { message: string } => {
  return { message: translateThis(message) };
};

export const deleteSuccessTranslated = (
  message: string,
): { message: string } => {
  return { message: translateThis(message) };
};

//---------------- Refactor with common translation ------------------------//

interface IData {
  [key: string]: any;
}

export const findOneSuccessAutoTranslated = (
  data: IData | IData[] | Promise<IData>,
): { message: string; data: {} } => {
  return { message: translateThis('default.findOne'), data };
};

export const findAllSuccessAutoTranslated = (data: any) => {
  return { message: translateThis('default.find'), data };
};

export const findAllPagenteSuccessAutoTranslated = () => {
  return { message: translateThis('default.find') };
};

export const createSuccessAutoTranslated = (message?: string) => {
  return { message: translateThis('default.create') };
};

export const updateSuccessAutoTranslated = (message?: string) => {
  return { message: translateThis('default.update') };
};

export const restoreSuccessAutoTranslated = () => {
  return { message: translateThis('default.restore') };
};

export const deleteSuccessAutoTranslated = (message?: string) => {
  return { message: translateThis('default.delete') };
};

export const notFoundErrorAutoTranslated = () => {
  return { message: translateThis('default.not_found') };
};

export const cantSaveErrorAutoTranslated = () => {
  return { message: translateThis('default.cannot_be_saved') };
};

export const updateErrorAutoTranslated = () => {
  return { message: translateThis('default.cannot_be_update') };
};

export const deleteErrorAutoTranslated = () => {
  return { message: translateThis('default.cannot_be_remove') };
};

export const defaultErrorAutoTranslated = () => {
  return { message: translateThis('default.general_error') };
};

/************************************** just message */
export const notFoundErrorAutoTranslatedString = () => {
  return translateThis('default.not_found');
};

export const defaultErrorAutoTranslatedString = () => {
  return translateThis('default.general_error');
};

export const updateErrorAutoTranslatedString = () => {
  return translateThis('default.cannot_be_update');
};
export const cantSaveErrorAutoTranslatedString = () => {
  return translateThis('default.cannot_be_saved');
};
