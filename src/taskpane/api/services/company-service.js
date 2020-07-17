import client from "../client/client";

class CompanyService {
	search({ filter }) {
		return client.get(`/companies/search`, { params: { filter: filter } });
	}
	get({ companyId }) {
		return client.get(`/companies/${companyId}`);
	}
	createBu({ companyId }, payload) {
		return client.post(`/companies/${companyId}`, { payload: payload });
	}

	/*
	 * USER
	 */
	createUser({ companyId }, payload) {
		return client.post(`/companies/${companyId}/users`, { payload: payload });
	}
	addExistingUser({ companyId, userId }) {
		return client.put(`/companies/${companyId}/users/${userId}`);
	}
	getUsers({ companyId }) {
		return client.get(`/companies/${companyId}/users`);
	}
	searchUser({ companyId }, { filter }) {
		return client.get(`/companies/${companyId}/users/search`, { params: { filter: filter } });
	}

	/*
	 * PROJECT
	 */
	createProject({ companyId }, payload) {
		return client.post(`/companies/${companyId}/projects`, { payload: payload });
	}
	changeToOperation({ companyId, projectId }) {
		return client.patch(`/companies/${companyId}/projects/${projectId}`);
	}
	getProjectsByLanguage({ companyId }) {
		return client.get(`/companies/${companyId}/projects/languages`);
	}

	/*
	 * ANALYTICAL AXE
	 */
	getAllDrafts({ companyId }) {
		return client.get(`/companies/${companyId}/analytical-axes/drafts`);
	}
	getAxesAsTree({ companyId, draftId }) {
		return client.get(`/companies/${companyId}/analytical-axes/drafts/${draftId}/tree`);
	}
	upgradeVersion({ companyId, draftId }, versionName) {
		return client.post(`/companies/${companyId}/analytical-axes/drafts/${draftId}`, {
			payload: { versionName },
		});
	}
	searchByKeywords({ companyId, language }, payload) {
		return client.put(`/companies/${companyId}/analytical-axes/${language}/search`, { payload });
	}
}

export default new CompanyService();
