import client from "../../client/client";

class AnalyticalService {
	create(payload) {
		return client.post(`/analytical-axes`, { payload });
	}
	get({ analyticalAxeId }) {
		return client.get(`/analytical-axes/${analyticalAxeId}`);
	}
	update({ analyticalAxeId }, payload) {
		return client.patch(`/analytical-axes/${analyticalAxeId}`, { payload });
	}
	delete({ analyticalAxeId }) {
		return client.delete(`/analytical-axes/${analyticalAxeId}`);
	}
}

export default new AnalyticalService();
