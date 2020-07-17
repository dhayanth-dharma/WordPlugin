import client from "../../client/client";

class OperationPhaseService {
	getAll({ projectId }) {
		return client.get(`/operation-phases/projects/${projectId}`);
	}

	getOperationModel({ projectId }) {
		return client.get(`/operation-phases/projects/${projectId}/model`);
	}

	importModelToProject({ projectId }) {
		return client.put(`/operation-phases/projects/${projectId}/models`);
	}
}

export default new OperationPhaseService();
