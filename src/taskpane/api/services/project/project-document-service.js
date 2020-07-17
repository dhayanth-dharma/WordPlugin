import client from "../../client/client";

class ProjectDocumentService {
	getDocuments({ projectId }) {
		return client.get(`projects/${projectId}/documents`);
	}

	getDocumentsForReqMatrix({ projectId }) {
		return client.get(`projects/${projectId}/documents/reqmatrix`);
	}

	getDocumentsForGapMatrix({ projectId }) {
		return client.get(`projects/${projectId}/documents/gapmatrix`);
	}

	upload({ projectId }, file, payload) {
		return client.upload(`/projects/${projectId}/documents/zip`, file, { payload: payload });
	}
}

export default new ProjectDocumentService();
