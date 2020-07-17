import client from "../../client/client";

class ProjectUserService {
	getUsers({ projectId }) {
		return client.get(`/projects/${projectId}/users`);
	}

	create({ projectId }, payload) {
		return client.post(`/projects/${projectId}/users`, { payload: payload });
	}

	remove({ projectId, userId }) {
		return client.delete(`/projects/${projectId}/users/${userId}`);
	}

	addExistingUser({ projectId, userId }) {
		return client.put(`/projects/${projectId}/users/${userId}`);
	}
}

export default new ProjectUserService();
