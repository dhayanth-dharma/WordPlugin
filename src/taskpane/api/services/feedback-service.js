import client from "../client/client";

class FeedbackService {
	getJiraTypes() {
		return client.get(`/feedback/jira`);
	}

	reportJira(file, payload) {
		return client.upload(`/feedback/jira`, file, { payload: payload });
	}
}

export default new FeedbackService();
