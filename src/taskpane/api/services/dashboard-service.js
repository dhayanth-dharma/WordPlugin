import client from "../client/client";

class DashboardService {
	/*
	 * USER
	 */
	getUserTasks({ projectId }) {
		return client.get(`/dashboard/users/me/projects/${projectId}/tasks`);
	}

	getUserRisks({ projectId }) {
		return client.get(`/dashboard/users/me/projects/${projectId}/risks`);
	}

	getUserRequirements({ projectId }) {
		return client.get(`/dashboard/users/me/projects/${projectId}/requirements`);
	}

	/*
	 * PROJECT
	 */
	getProjectTasks({ projectId }) {
		return client.get(`/dashboard/projects/${projectId}/tasks`);
	}

	getProjectDocuments({ projectId }) {
		return client.get(`/dashboard/projects/${projectId}/documents`);
	}

	getProjectRisks({ projectId }) {
		return client.get(`/dashboard/projects/${projectId}/risks`);
	}

	getProjectRequirements({ projectId }) {
		return client.get(`/dashboard/projects/${projectId}/requirements`);
	}

	/*
	 * COMPANY
	 */
	getCompanyProjects({ companyId }) {
		return client.get(`/dashboard/companies/${companyId}/projects`);
	}
}

export default new DashboardService();
