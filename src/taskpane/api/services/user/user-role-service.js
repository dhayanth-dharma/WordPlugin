import client from "../../client/client";

class UserRoleService {
	getRoleOnDocument({ userId, projectId }) {
		return client.get(`/users/${userId}/roles/projects/${projectId}`);
	}

	addRoleOnDocument({ userId, projectId }, payload) {
		return client.post(`/users/${userId}/roles/projects/${projectId}`, { payload: payload });
	}

	updateOnProject({ userId, projectId }, payload) {
		return client.patch(`/users/${userId}/roles/projects/${projectId}`, { payload: payload });
	}

	removeRoleOnDocument({ userId, projectId }, payload) {
		return client.put(`/users/${userId}/roles/projects/${projectId}`, { payload: payload });
	}

	addRoleCompany({ userId, companyId }, role) {
		return client.patch(`/users/${userId}/roles/companies/${companyId}`, { payload: role });
	}

	removeRoleOnCompany({ userId, companyId }, role) {
		return client.delete(`/users/${userId}/roles/companies/${companyId}`, { params: role });
	}
}

export default new UserRoleService();
