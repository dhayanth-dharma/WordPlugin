import client from "../../client/client";

class CardService {
	getByProject({ projectId }) {
		return client.get(`/risks/cards/projects/${projectId}`);
	}

	create({ projectId }, payload) {
		return client.post(`/risks/cards/projects/${projectId}`, { payload: payload });
	}

	addTrigger({ cardId }, payload) {
		return client.post(`/risks/cards/${cardId}/triggers`, { payload: payload });
	}

	getHistory({ cardId, projectId }) {
		return client.get(`/risks/cards/${cardId}/projects/${projectId}/history`);
	}

	assignUser({ cardId, projectId, userId }) {
		return client.put(`/risks/cards/${cardId}/projects/${projectId}/users/${userId}`);
	}

	comment({ cardId, projectId }, payload) {
		return client.post(`/risks/cards/${cardId}/projects/${projectId}/comments`, { payload: payload });
	}

	validate({ cardId, projectId }) {
		return client.put(`/risks/cards/${cardId}/projects/${projectId}`);
	}

	changeScore({ cardId, projectId }, payload) {
		return client.patch(`/risks/cards/${cardId}/projects/${projectId}/score`, { payload: payload });
	}
}

export default new CardService();
