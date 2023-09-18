import React from "react";

const useValidation = (emailValue: string, passwordValue: string) => {
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  const validateEmail = React.useCallback(() => {
    const validation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return validation.test(emailValue ?? "");
  }, [emailValue]);

  const validatePassword = React.useCallback(() => {
    const validation =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/;
    return validation.test(passwordValue ?? "");
  }, [passwordValue]);

  React.useEffect(() => {
    setIsEmailValid(validateEmail());
    setIsPasswordValid(validatePassword());
  }, [validateEmail, validatePassword]);

  return { isEmailValid, isPasswordValid };
};

export default useValidation;
