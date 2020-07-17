import client from "../../client/client";

class SmartViewService {
	getRedressment({ projectId, docId }, { page = 0 }) {
		return client.get(`/smartview/redressment/projects/${projectId}/documents/${docId}`, {
			params: { page: page },
		});
	}
}

export default new SmartViewService();
