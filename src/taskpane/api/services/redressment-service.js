import client from "../client/client";

class RedressmentService {
	redress({ docId }, payload) {
		return client.post(`/redressment/documents/${docId}`, { payload: payload });
	}

	move({ docId }, payload) {
		return client.post(`/redressment/documents/${docId}/move`, { payload: payload });
	}

	group({ docId }, payload) {
		return client.post(`/redressment/documents/${docId}/group`, { payload: payload });
	}

	split({ docId }, payload) {
		console.log("WARNING - Method unimplemented !");
		return client.post(`/redressment/documents/${docId}/split`, { payload: payload });
	}
}

export default new RedressmentService();
