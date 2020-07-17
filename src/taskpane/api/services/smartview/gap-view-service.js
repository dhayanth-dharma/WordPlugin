import client from "../../client/client";

class GapViewService {
	getRootClauses({ docId }) {
		return client.get(`/smartview/gap/documents/${docId}`);
	}

	getUsers({ docId }) {
		return client.get(`/smartview/gap/documents/${docId}/users`);
	}

	getClause({ projectId, docId, clauseId }) {
		return client.get(`/smartview/gap/projects/${projectId}/documents/${docId}/clauses/${clauseId}`);
	}

	getReviews({ projectId, docId, infoId }) {
		return client.get(`/smartview/gap/projects/${projectId}/documents/${docId}/information/${infoId}`);
	}

	getHistory({ projectId, docId, infoId }) {
		return client.get(`/smartview/gap/projects/${projectId}/documents/${docId}/information/${infoId}/history`);
	}
}

export default new GapViewService();
