import client from "../client/client";

class PhaseService {
	getAllByProject({ projectId }) {
		return client.get(`/phases/projects/${projectId}`);
	}

	getModelsByProject({ projectId }) {
		return client.get(`/phases/projects/${projectId}/models`);
	}

	importModelToProject({ projectId, modelId }) {
		return client.put(`/phases/projects/${projectId}/models/${modelId}`);
	}
}

export default new PhaseService();
