import client from "../../client/client";

class SearchCardKeywordService {
	getResultsOnSavedKeywords({ keywordId }) {
		return client.get(`/keyword/${keywordId}`);
	}
	deleteKeyword({ keywordId }) {
		return client.delete(`/keyword/${keywordId}`);
	}
	projectSearch({ searchCardId }, { keyword }) {
		return client.get(`/keyword/searchcard/${searchCardId}/search`, { params: { keyword: keyword } });
	}
	getSavedKeywords({ searchCardId }) {
		return client.get(`/keyword/searchcard/${searchCardId}`);
	}
	saveKeyword({ searchCardId }, payload) {
		return client.post(`/keyword/searchcard/${searchCardId}`, { payload: payload });
	}
}

export default new SearchCardKeywordService();
