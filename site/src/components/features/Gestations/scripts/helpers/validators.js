export const isValidateDate = (d) => !isNaN(new Date(d).getTime());
export const inputSanitize = (input) => input.replace(/[<>"'`]/g, "");
