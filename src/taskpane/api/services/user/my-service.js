import client from "../../client/client";

class MyService {
	getDetails() {
		return client.get(`users/me`);
	}

	getCompanies() {
		return client.get(`users/me/companies`);
	}
	getOperations() {
		return client.get(`users/me/operations`);
	}

	getCompanyDetails({ companyId }) {
		return client.get(`users/me/companies/${companyId}`);
	}

	getProjects() {
		return client.get(`users/me/projects`);
	}

	getProjectDetails({ projectId }) {
		return client.get(`users/me/projects/${projectId}`);
	}

	getDocumentsInProject({ projectId }) {
		return client.get(`users/me/projects/${projectId}/documents`);
	}

	getDocumentDetails({ docId }) {
		return client.get(`users/me/documents/${docId}`);
	}

	updateProfile() {
		return client.patch(`users/me`);
	}

	changePassword(payload) {
		return client.patch(`users/me/password`, { payload: payload });
	}
}

export default new MyService();
