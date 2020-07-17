import client from "../../client/client";

class QAService {
	/*Gets all questions on a document*/
	getAllQuestionsOnDocument({ documentId }) {
		return client.get(`/qa/documents/${documentId}`);
	}

	/*Gets all questions on information*/
	getAllQuestionsOnInformation({ infoId }) {
		return client.get(`/qa/information/${infoId}`);
	}

	/*Get all questions on project*/
	getGeneralQuestions({ projectId }) {
		return client.get(`/qa/projects/${projectId}`);
	}

	/*Add new question*/
	createQuestion({ projectId }, payload) {
		return client.post(`/qa/projects/${projectId}`, { payload: payload });
	}

	/*Gets all draft questions in project grouped by documents and requirements (Left side of QA page)*/
	getIdentifiableDraftedQuestions({ projectId }) {
		return client.get(`/qa/projects/${projectId}/questions`);
	}

	/*Deletes questions completely by leader or manager*/
	deleteQuestions({ projectId }, payload) {
		return client.patch(`/qa/projects/${projectId}/questions`, { payload: payload });
	}

	/*Updates the content of question*/
	updateQuestion({ projectId, questionId }, payload) {
		return client.patch(`qa/projects/${projectId}/questions/${questionId}`, { payload: payload });
	}
}

export default new QAService();
