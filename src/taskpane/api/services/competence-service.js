import client from "../client/client";

class CompetenceService {
	getAllByProject({ projectId }) {
		return client.get(`/competences/projects/${projectId}`);
	}

	getAllByProjectAsTree({ projectId }) {
		return client.get(`/competences/projects/${projectId}/tree`);
	}

	getModelsByProject({ projectId }) {
		return client.get(`/competences/projects/${projectId}/models`);
	}

	getProjectModels({ projectId }) {
		return client.get(`/competences/projects/${projectId}/project-model`);
	}

	importModelToProject({ projectId, modelId }) {
		return client.put(`/competences/projects/${projectId}/models/${modelId}`);
	}
}

export default new CompetenceService();
