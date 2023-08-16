import React from "react";

type ValidationType = "email" | "password";

const useValidation = (value: string, type: ValidationType) => {
  const [isPassed, setIsPassed] = React.useState(false);

  const validateEmail = React.useCallback(() => {
    const validation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return validation.test(value);
  }, [value]);

  const validatePassword = React.useCallback(() => {
    const validation =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/;
    return validation.test(value);
  }, [value]);

  React.useEffect(() => {
    if (type === "email") {
      setIsPassed(validateEmail());
    } else if (type === "password") {
      setIsPassed(validatePassword());
    }
  }, [type, value, validateEmail, validatePassword]);

  return { isPassed };
};

export default useValidation;
