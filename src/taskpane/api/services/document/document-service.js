import client from "../../client/client";

class DocumentService {
	getPage({ docId }, { page = 1 }) {
		console.log(page);
		return client.get(`/documents/${docId}`, {
			config: { responseType: "arraybuffer" },
			params: { page: page },
		});
	}

	delete({ docId }) {
		return client.delete(`/documents/${docId}`);
	}

	extract({ docId }) {
		return client.post(`/documents/${docId}/extract`);
	}

	retryExtract({ docId }) {
		return client.post(`/documents/${docId}/retry`);
	}

	// PRECEDENCE
	updatePrecedence({ docId }, payload) {
		return client.patch(`/documents/${docId}/precedence`, { payload: payload });
	}

	listPrecedences() {
		return client.get(`/documents/precedence`);
	}
	getDocumentPhysicalDetails({ docId }) {
		return client.get(`/documents/${docId}/details`);
	}
}

export default new DocumentService();
