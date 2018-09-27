const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let r in rules) {
    switch (r) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[r]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[r]);
        break;
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(val);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};

const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
  return val === checkValue;
};

const notEmptyValidator = (val) => {
  return val.trim() !== '';
}

export default validate;
