import client from "../../client/client";

class DocumentOutService {
  getFormats() {
    return client.get(`/documents-out/formats`);
  }

  getTypes() {
    return client.get(`/documents-out/types`);
  }

  getAll({ projectId }) {
    return client.get(`/documents-out/projects/${projectId}`);
  }

  get({ docId }) {
    return client.get(`/documents-out/${docId}`);
  }
  getRequirementByDoc({ docId, projectId }) {
    return client.get(`/documents-out/requirement-coverage/projects/${projectId}/documents/${docId}/requirements`);
  }

  create({ projectId }, payload) {
    return client.post(`/documents-out/projects/${projectId}`, { payload: payload });
  }

  update({ docId }, payload) {
    return client.patch(`/documents-out/${docId}`, { payload: payload });
  }

  updateBatch(payload) {
    return client.patch(`/documents-out`, { payload: payload });
  }

  delete({ docId }) {
    return client.delete(`/documents-out/${docId}`);
  }

  createFromList({ projectId }, payload) {
    return client.post(`/documents-out/projects/${projectId}/create-from-list`, { payload: payload });
  }
  updateCoverage({ projectId },{ documentId }, payload) {
    return client.patch(`/documents-out/requirement-coverage/projects/${projectId}/documents/${documentId}/coverage-status`, { payload: payload });
  }
  
  getUserDocuments({ projectId }){
  return client.get(`/documents-out/user/projects/${projectId}`);
  }
}


export default new DocumentOutService();
