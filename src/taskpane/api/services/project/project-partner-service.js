import client from "../../client/client";

class ProjectPartnerService {
	get({ projectId }) {
		return client.get(`/projects/${projectId}/partners`);
	}

	create({ projectId }, payload) {
		return client.post(`/projects/${projectId}/partners`, { payload: payload });
	}

	addExisting({ projectId }, payload) {
		return client.put(`/projects/${projectId}/partners`, { payload: payload });
	}

	remove({ projectId, partnerId }) {
		return client.delete(`/projects/${projectId}/partners/${partnerId}`);
	}
}

export default new ProjectPartnerService();
