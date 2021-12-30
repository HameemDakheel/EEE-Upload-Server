import axios from "axios";

export default async function checkToken() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post("http://192.168.0.10/user/check-token", {
      token,
    });
    if (!res.data.error && res.data.decode) {
      return { isValid: true, user: res.data.decode };
    }
  } catch (e) {
    console.log(e);
    return { isValid: false, user: {} };
  }
}
