import client from "../client/client";

class TaskService {
	getPriorities() {
		return client.get(`/tasks`);
	}

	create(payload) {
		return client.post(`/tasks`, { payload: payload });
	}

	getAllByInfoId({ infoId }) {
		return client.get(`/tasks/information/${infoId}`);
	}

	getAllByProject({ projectId }) {
		return client.get(`/tasks/projects/${projectId}`);
	}

	nextStep({ taskId }) {
		return client.patch(`/tasks/${taskId}`);
	}

	updateStatus({ taskId }, payload) {
		return client.put(`/tasks/${taskId}`, { payload: payload });
	}

	getComments({ taskId }) {
		return client.get(`/tasks/${taskId}/comments`);
	}

	comment({ taskId }, payload) {
		return client.post(`/tasks/${taskId}/comments`, { payload: payload });
	}
}

export default new TaskService();
