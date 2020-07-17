import client from "../../client/client";

class RiskService {
	listRoot() {
		return client.get(`/risks`);
	}

	getChildren({ riskId }) {
		return client.get(`/risks/${riskId}/children`);
	}

	getTree() {
		return client.get(`/risks/tree`);
	}

	getEnabledCards({ riskId, projectId }) {
		return client.get(`/risks/${riskId}/projects/${projectId}/cards/active`);
	}

	getRiskDocuments({ riskId, projectId }) {
		return client.get(`/risks/${riskId}/projects/${projectId}`);
	}

	getRiskProject({ projectId }) {
		return client.get(`/risks/projects/${projectId}`);
	}
}

export default new RiskService();
