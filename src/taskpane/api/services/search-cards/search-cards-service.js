import client from "../../client/client";

class SearchCardService {
	getResultSearchCard({ searchCardId }) {
		return client.get(`/searchcard/${searchCardId}`);
	}

	excludeInformationOnSearchCard({ searchCardId }, payload) {
		return client.post(`/searchcard/${searchCardId}`, { payload: payload });
	}

	deleteSearchCard({ searchCardId }) {
		return client.delete(`/searchcard/${searchCardId}`);
	}

	renameSearchCard({ searchCardId }, name) {
		return client.patch(`/searchcard/${searchCardId}`, { payload: name });
	}

	getAllSearchCards({ projectId }) {
		return client.get(`/searchcard/projects/${projectId}`);
	}

	createSearchCard({ projectId }, name) {
		return client.post(`/searchcard/projects/${projectId}`, { payload: name });
	}
}

export default new SearchCardService();
