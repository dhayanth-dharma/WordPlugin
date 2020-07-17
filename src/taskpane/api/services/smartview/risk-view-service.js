import client from "../../client/client";

class RiskViewService {
	getContents({ projectId, docId }, { page = 0 }) {
		return client.get(`/smartview/risks/projects/${projectId}/documents/${docId}`, { params: { page: page } });
	}

	search({ projectId, docId }, { risk }) {
		return client.get(`/smartview/risks/projects/${projectId}/documents/${docId}`, { params: { risk: risk } });
	}
}

export default new RiskViewService();
