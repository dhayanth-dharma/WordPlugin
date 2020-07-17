import client from "../../client/client";

class RiskContentService {
	delete({ contentId }) {
		return client.delete(`/risks/contents/${contentId}`);
	}

	deleteFromContents({ riskIds, contentIds }) {
		return client.patch(`/risks/contents`, {
			payload: { op: "DELETE", riskIds, contentIds },
		});
	}

	deleteFromProject({ projectId }) {
		return client.delete(`/risks/contents/projects/${projectId}`);
	}

	extract({ projectId }) {
		return client.get(`/risks/contents/projects/${projectId}`);
	}

	assignContent(payload) {
		return client.post(`/risks/contents/tag`, { payload: payload });
	}
}

export default new RiskContentService();
