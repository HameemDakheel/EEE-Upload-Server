import axios from 'axios'

export default function Token(action){
	const token = localStorage.getItem("token");
	if (token) {
		return checkToken(token);
	}else{
		return false;
	}

}

const checkToken = async (token) =>{
	const res = await axios.post("http://localhost:8080/check-token",{token});
	console.log(res.data);
	if (!res.data.error) {
		return true;
	}else{
		return false
	}
}