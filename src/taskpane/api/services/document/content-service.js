import client from "../../client/client";

class ContentService {
	getImage({ docId, contentId }) {
		return client.get(`/documents/${docId}/contents/${contentId}/image`, {
			config: { responseType: "arraybuffer" },
		});
	}

	getTable({ docId, contentId }) {
		return client.get(`/documents/${docId}/contents/${contentId}/table`, {
			config: { responseType: "arraybuffer" },
		});
	}

	getDocumentClauses({ docId }) {
		return client.get(`/documents/${docId}/contents/clauses`);
	}
}

export default new ContentService();
