import client from "../../client/client";

class ReqViewService {
  getContents({ projectId, docId }, { page = 0 }) {
    return client.get(`smartview/requirements/projects/${projectId}/documents/${docId}`, {
      params: { page: page }
    });
  }

  search({ projectId, docId }, { target = "" }) {
    console.log(target);
    return client.get(`quickaccess/req/projects/${projectId}/documents/${docId}/filter`, {
      params: { target: target }
    });
  }

  listStatusOnReq({ reqId, projectId, docId }) {
    return client.get(`smartview/requirements/${reqId}/projects/${projectId}/documents/${docId}/status`);
  }

  findIssues({ projectId, docId }) {
    return client.get(`smartview/requirements/projects/${projectId}/documents/${docId}/gap`);
  }

  updateType({ infoId }, payload) {
    return client.patch(`/smartview/requirements/${infoId}`, { payload: payload });
  }
}

export default new ReqViewService();
