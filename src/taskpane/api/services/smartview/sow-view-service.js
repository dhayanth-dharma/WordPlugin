import client from "../../client/client";

class SowViewService {
	deleteContents({ projectId, docId }, payload) {
		return client.patch(`/smartview/sow/projects/${projectId}/documents/${docId}`, {
			payload: { op: "DELETE", ...payload },
		});
	}

	assignContent({ projectId, docId }, payload) {
		return client.post(`/smartview/sow/projects/${projectId}/documents/${docId}/tag`, { payload: payload });
	}

	getContents({ projectId, docId }, { page = 0 }) {
		return client.get(`/smartview/sow/projects/${projectId}/documents/${docId}`, { params: { page: page } });
	}

	getTaggedContents({ projectId, competenceId }) {
		return client.get(`/smartview/sow/projects/${projectId}/competences/${competenceId}`);
	}
}

export default new SowViewService();
