import client from "../../client/client";

class TriggerService {
	addComment({ triggerId }, payload) {
		return client.post(`/risks/triggers/${triggerId}/comments`, { payload: payload });
	}

	validate({ triggerId }) {
		return client.patch(`/risks/triggers/${triggerId}`);
	}

	changeSeverity({ triggerId }, payload) {
		return client.patch(`/risks/triggers/${triggerId}`, { payload: payload });
	}
}

export default new TriggerService();
