import client from "../client/client";

class DirectoryService {
	create({ projectId }, payload) {
		return client.post(`/directories/projects/${projectId}`, { payload: payload });
	}

	moveDocument({ docId }, payload) {
		return client.post(`/directories/documents/${docId}`, { payload: payload });
	}

	moveDirectory({ dirId }, payload) {
		return client.post(`/directories/${dirId}`, { payload: payload });
	}

	delete({ dirId }) {
		return client.delete(`/directories/${dirId}`);
	}
}

export default new DirectoryService();
