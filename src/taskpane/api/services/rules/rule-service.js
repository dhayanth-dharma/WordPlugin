import axios from "axios";
import client from "../../client/client";

class RuleSerive {
	get({ url }) {
		return axios.get(url);
	}

	post({ url, obj }) {
		return axios.post(url, obj);
	}
	// get({ url }) {
	// 	return client.get(url);
	// }

	// create({ url, obj }) {
	// 	return client.post(url, { payload: obj });
	// }
}

export default new RuleSerive();
