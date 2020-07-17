import client from "../client/client";

class CanvasService {
	getDocumentsPrecedence({ projectId }) {
		return client.get(`/canvas/projects/${projectId}/documents`);
	}
}

export default new CanvasService();
