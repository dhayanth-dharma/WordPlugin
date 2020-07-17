import client from "../../client/client";

class UserService {
	getUserProjects({ userId, companyId }) {
		return client.get(`/admin/${companyId}/${userId}/projects`);
	}

	createProjectUser({ projectId }, payload) {
		return client.post(`/projects/${projectId}/users`, { payload: payload });
	}

	addUserToCompany({ companyId }, payload) {
		return client.post(`/companies/${companyId}/users`, { payload: payload });
	}
}

export default new UserService();
