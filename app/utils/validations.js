// Constants
const EMAIL_REGEX = '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$';
const EMAIL_NOT_VALID_ERROR_MESSAGE = 'The email is not valid.';
const TEXT_EMPTY_ERROR_MESSAGE = 'The field is required.';

/**
 * Compose function for validation methods.
 *
 * @param  {...any} fns
 */
export const compose = (...fns) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    data => data
  );

/**
 * Email pure function validator to be used in the compose method.
 *
 * @param {*} data
 */
export const emailValidator = data => {
  if (data.error || isEmailValid(data.text)) {
    return data;
  }

  return { error: true, errorMessage: EMAIL_NOT_VALID_ERROR_MESSAGE };
};

/**
 * Empty text pure function validator to be used in the compose method.
 *
 * @param {*} data
 */
export const emptyTextValidator = data => {
  if (data.error || !isTextEmpty(data.text)) {
    return data;
  }

  return { error: true, errorMessage: TEXT_EMPTY_ERROR_MESSAGE };
};

const isEmailValid = email => {
  return isTextEmpty(email) ? true : EMAIL_REGEX.test(email);
};

const isTextEmpty = text => {
  return text === '';
};
