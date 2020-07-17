import client from "../../client/client";

class PdfViewService {
	search({ documentId }, { filter }) {
		return client.get(`/smartview/pdf/documents/${documentId}/search`, {
			params: { filter: filter },
		});
	}

	searchInWholeProject({ projectId }, { filter }) {
		return client.get(`/smartview/pdf/projects/${projectId}/search`, {
			params: { filter: filter },
		});
	}
}

export default new PdfViewService();
