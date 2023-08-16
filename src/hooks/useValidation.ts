import React from "react";

const useValidation = (value: string) => {
  const [isPassed, setIsPassed] = React.useState(false);

  const validatePassword = React.useCallback(() => {
    const validation =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/;
    setIsPassed(validation.test(value));
  }, [value]);

  React.useEffect(() => {
    validatePassword();
  }, [value, validatePassword]);

  return { isPassed };
};

export default useValidation;
