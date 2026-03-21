import { login } from "../../../api/auth.api";

export default async function loginHelper(form) {
  const formData = new URLSearchParams();
  /*URL search params thingy is used here coz the backend application 
      accepts only url encoded stuff.. it doesnt accepts json type shit here.*/
  formData.append("username", form.username);
  formData.append("password", form.password);
  formData.append("grant_type", "password");
  formData.append("scope", "");
  formData.append("client_id", "");
  formData.append("client_secret", "");
  return await login(formData);
}
