import client from "../../client/client";

class ValidatorService {
	getContents({ projectId, docId }, { page = 0 }) {
		return client.get(`/smartview/validator/projects/${projectId}/documents/${docId}`, { params: { page: page } });
	}

	getGap({ projectId, docId }) {
		return client.get(`/smartview/validator/projects/${projectId}/documents/${docId}/gap`);
	}

	validate({ projectId, docId, infoId }, payload) {
		return client.post(`/smartview/validator/projects/${projectId}/documents/${docId}/information/${infoId}`, {
			payload: payload,
		});
	}

	remove({ projectId, docId, infoId }) {
		return client.delete(`/smartview/validator/projects/${projectId}/documents/${docId}/information/${infoId}`);
	}

	searchByStatus({ projectId, docId }, { target = "" }) {
		return client.get(`quickaccess/val/projects/${projectId}/documents/${docId}/filter`, {
			params: { target: target },
		});
	}

	validateAll({ projectId, docId }) {
		return client.post(`/smartview/validator/projects/${projectId}/documents/${docId}`);
	}
}
export default new ValidatorService();
