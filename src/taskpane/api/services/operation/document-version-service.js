import client from "../../client/client";

class DocumentVersionService {
	getStatus() {
		return client.get(`/documents-out/versions/status`);
	}

	create(payload) {
		return client.post(`/documents-out/versions`, { payload: payload });
	}

	update({ versionId }, payload) {
		return client.patch(`/documents-out/versions/${versionId}`, { payload: payload });
	}

	send({ versionId }) {
		return client.post(`/documents-out/versions/${versionId}`);
	}

	delete({ versionId }) {
		return client.delete(`/documents-out/versions/${versionId}`);
	}

	addNotice({ versionId }, payload) {
		return client.post(`/documents-out/versions/${versionId}/notices`, { payload: payload });
	}
}

export default new DocumentVersionService();
