import client from "../../client/client";

class RegisterService {
	update({ cardId }, payload) {
		return client.patch(`/risks/card-register/${cardId}`, { payload: payload });
	}

	validate({ cardId }) {
		return client.put(`/risks/card-register/${cardId}`);
	}

	changeScore({ cardId }, payload) {
		return client.patch(`/risks/card-register/${cardId}/score`, { payload: payload });
	}
}

export default new RegisterService();
