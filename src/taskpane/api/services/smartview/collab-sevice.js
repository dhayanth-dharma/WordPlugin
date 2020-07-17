import client from "../../client/client";

class CollabService {
	updateType({ infoId }, payload) {
		return client.patch(`/smartview/information/${infoId}`, { payload: payload });
	}

	updateStatus({ infoId }, payload) {
		return client.patch(`/smartview/information/${infoId}/status`, { payload: payload });
	}

	addRisk({ infoId }, payload) {
		return client.post(`/smartview/information/${infoId}/risks`, { payload: payload });
	}

	getHistory({ infoId }) {
		return client.get(`/smartview/information/${infoId}/history`);
	}

	comment({ infoId }, payload) {
		return client.post(`/smartview/information/${infoId}/comments`, { payload: payload });
	}

	getStringContent({ infoId }) {
		return client.get(`/smartview/information/${infoId}`);
	}

	updateComment({ commentId }, payload) {
		return client.patch(`/smartview/comments/${commentId}`, { payload: payload });
	}

	getProjectRequirement({ projectId }, { page = 0 }) {
		return client.get(`/smartview/projects/${projectId}`, {
			params: { page: page },
		});
	}

	getPagesRequirement({ projectId }) {
		return client.get(`/smartview/projects/${projectId}/pages`);
	}

	updateIssueComment({ informationId }, payload) {
		return client.patch(`/smartview/information/${informationId}/issuecomment`, { payload: payload });
	}

	getIssueCommentHistory({ informationId }) {
		return client.get(`/smartview/information/${informationId}/issuecomments`);
	}

	createQuestion({ informationId }, payload) {
		return client.post(`/smartview/information/${informationId}/question`, { payload: payload });
	}
}

export default new CollabService();
