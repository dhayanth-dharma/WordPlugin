import client from "../../client/client";

class BatchService {
	/*Gets all batches with questions grouped by document and requirements (Right side of QA Page)*/
	getAll({ projectId }) {
		return client.get(`/projects/${projectId}/qa/batches`);
	}

	/*Creates/Actives a new batch by leader or manager*/
	create({ projectId }, payload) {
		return client.post(`/projects/${projectId}/qa/batches`, { payload: payload });
	}

	/*Adds draft question to Active batch by leader or manager*/
	addRequirementToActive({ projectId, batchId }, payload) {
		return client.patch(`/projects/${projectId}/qa/batches/${batchId}/questions`, { payload: payload });
	}

	/*Edits batch name by leader of project or manager*/
	renameActive({ projectId, batchId }, payload) {
		return client.patch(`/projects/${projectId}/qa/batches/${batchId}/name`, { payload: payload });
	}

	/*Changes status of batch to SENT by leader*/
	send({ projectId, batchId }) {
		return client.patch(`/projects/${projectId}/qa/batches/${batchId}/send`);
	}

	/*Changes status of batch to SENT by leader*/
	removeQuestionsFromBatch({ projectId }, payload) {
		return client.patch(`/projects/${projectId}/qa/batches/questions`, { payload: payload });
	}
}

export default new BatchService();
