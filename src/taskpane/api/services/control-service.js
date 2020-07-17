import client from "../client/client";

class ControlService {
	getErrorsByProject({ projectId }) {
		return client.get(`/control/projects/${projectId}`);
	}

	getErrorCountersByProject({ projectId }) {
		return client.get(`/control/projects/${projectId}/counters`);
	}

	getErrorsByDocument({ docId }) {
		return client.get(`/control/documents/${docId}`);
	}

	getErrorCountersByDocument({ docId }) {
		return client.get(`/control/documents/${docId}/counters`);
	}
}

export default new ControlService();
