//custom hook for validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useValidate = (form) => {
  let hasError = false;
  const newErrorStates = {
    username: null,
    password: null,
    email: null,
    confirmPassword: null,
  };

  //username validation
  if (!form.username.trim()) {
    newErrorStates.username = "Username is required";
    hasError = true;
  } else if (form.username.length <= 3) {
    newErrorStates.username = "Username too short";
    hasError = true;
  } else {
    newErrorStates.username = null;
  }

  //email
  // email doesnt exist in form during login.
  if ("email" in form) {
    if (!form.email.trim()) {
      newErrorStates.email = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(form.email)) {
      newErrorStates.email = "Invalid email address";
      hasError = true;
    } else {
      newErrorStates.email = null;
    }
  }

  //password validation
  if (!form.password.trim()) {
    newErrorStates.password = "Password is required";
    hasError = true;
  } else if (form.password.length < 6) {
    newErrorStates.password = "Password too short";
    hasError = true;
  } else if (!passwordRegex.test(form.password)) {
    newErrorStates.password = "Include A-Z, a-z, 0-9 & symbol";
    hasError = true;
  } else {
    newErrorStates.password = null;
  }

  //confirm password
  //confirm password doesnt exists in form while logging in
  if ("confirmPassword" in form) {
    if (!form.confirmPassword) {
      newErrorStates.confirmPassword = "Confirm your password";
      hasError = true;
    } else if (form.confirmPassword !== form.password) {
      newErrorStates.confirmPassword = "Passwords do not match";
      hasError = true;
    } else {
      newErrorStates.confirmPassword = null;
    }
  }
  return { hasError, newErrorStates };
};

export default useValidate;
