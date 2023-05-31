function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.first_name === "") {
    error.first_name = "İsim boş";
  } else {
    error.first_name = "";
  }

  if (values.last_name === "") {
    error.last_name = "İsim boş";
  } else {
    error.last_name = "";
  }

  if (values.mail === "") {
    error.mail = "İsim boş";
  } else if (!email_pattern.test(values.mail)) {
    error.mail = "mail eşleşmedi";
  } else {
    error.mail = "";
  }

  if (values.user_password === "") {
    error.user_password = "şifre boş";
  } else if (!password_pattern.test(values.user_password)) {
    error.user_password = "şifre eşleşmedi";
  } else {
    error.user_password = "";
  }

  if (values.role === "") {
    error.role = "Kullanıcı tipi belirtiniz";
  }else {
    error.role = "";
  }

  return error;
}
export default Validation;
