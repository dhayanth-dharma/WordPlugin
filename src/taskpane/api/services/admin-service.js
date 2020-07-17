import client from "../client/client";

class AdminService {
	getCompanyBu({ companyId }) {
		return client.get(`/admin/companies/${companyId}/bu`);
	}
	getCompanyProjects({ companyId, projectNature }) {
		return client.get(`/admin/companies/${companyId}/projects/${projectNature}`);
	}
	getCompanyUsers({ companyId }) {
		return client.get(`/admin/companies/${companyId}/users`);
	}
	getCompanyUser({ companyId, userId }) {
		return client.get(`/admin/companies/${companyId}/users/${userId}`);
	}
	lockUser({ companyId, userId }, reason) {
		return client.post(`/admin/companies/${companyId}/users/${userId}/lock`, { payload: reason });
	}
	unlockUser({ companyId, userId }) {
		return client.delete(`/admin/companies/${companyId}/users/${userId}/unlock`);
	}
	archive({ companyId, projectId }, isActive) {
		return client.patch(`/admin/companies/${companyId}/projects/${projectId}`, { payload: `${isActive}` });
	}
}
export default new AdminService();
