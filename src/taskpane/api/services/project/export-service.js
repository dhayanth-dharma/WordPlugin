import client from "../../client/client";

class ExportService {
	exportDocumentCSV({ projectId, docId }) {
		return client.get(`/projects/${projectId}/export/requirements/csv/documents/${docId}`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "text/csv",
			},
		});
	}

	exportProjectCSV({ projectId }) {
		return client.get(`/projects/${projectId}/export/requirements/csv`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "text/csv",
			},
		});
	}

	exportProjectXLSX({ projectId }) {
		return client.get(`/projects/${projectId}/export/requirements/xlsx`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			},
		});
	}

	exportRiskCardXLSX({ projectId }) {
		return client.get(`/projects/${projectId}/export/riskcards/xlsx`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			},
		});
	}

	exportProjectValidatorCSV({ projectId }) {
		return client.get(`/projects/${projectId}/export/requirements/val/csv`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "text/csv",
			},
		});
	}

	exportDocValidatorCSV({ projectId, docId }) {
		return client.get(`/projects/${projectId}/export/requirements/val/csv/documents/${docId}`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "text/csv",
			},
		});
	}

	exportProjectValidatorXLSX({ projectId }) {
		return client.get(`/projects/${projectId}/export/requirements/val/xlsx`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			},
		});
	}

	exportQandABatchCSV({ projectId, batchId }) {
		return client.get(`/projects/${projectId}/export/qa/batch/${batchId}/csv`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "text/csv",
			},
		});
	}

	exportBaselineDoc({ projectId, docId }) {
		return client.get(`/projects/${projectId}/export/requirements/baseline/csv/documents/${docId}`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "text/csv",
			},
		});
	}

	exportBaselineProject({ projectId }) {
		return client.get(`/projects/${projectId}/export/requirements/baseline/csv`, {
			config: {
				responseType: "blob",
				Accept: "*/*",
				"Content-Type": "text/csv",
			},
		});
	}
}

export default new ExportService();
