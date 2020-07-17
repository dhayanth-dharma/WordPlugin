import client from "../client/client";

class SowService {
	getMatrix({ projectId }) {
		return client.get(`/sow/projects/${projectId}`);
	}

	getStatus({ projectId }) {
		return client.get(`/sow/projects/${projectId}/status`);
	}

	setPartnerRole({ projectId }, payload) {
		return client.patch(`/sow/projects/${projectId}`, { payload: payload });
	}

	removePartnerRole({ projectId }, payload) {
		return client.put(`/sow/projects/${projectId}`, { payload: payload });
	}

	getTree({ projectId }) {
		return client.get(`/sow/projects/${projectId}/tree`);
	}

	assignSowToWholeDocument({ projectId, documentId }, payload) {
		return client.post(`/sow/projects/${projectId}/documents/${documentId}`, { payload: payload });
	}

	removeSowToWholeDocument({ projectId, documentId }, payload) {
		// return client.delete(`/sow/projects/${projectId}/documents/${documentId}`, { payload: payload });
		return client.patch(`/sow/projects/${projectId}/documents/${documentId}`, {
			payload: { op: "DELETE", ...payload },
		});
	}

	getSowAssignedToWholeDocument({ documentId }) {
		return client.get(`/sow/documents/${documentId}`);
	}
}

export default new SowService();
