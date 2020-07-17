import client from "../../client/client";

class ProjectService {
  getTypes() {
    return client.get(`/projects/types`);
  }

  getNatures() {
    return client.get(`/projects/natures`);
  }

  delete({ projectId }) {
    return client.delete(`/projects/${projectId}`);
  }

  getTeams({ projectId }) {
    return client.get(`/projects/${projectId}/teams`);
  }

  getFinishedProjects() {
    return client.get(`/users/me/finished-projects`);
  }
  getProjectsByUser() {
    return client.get(`/users/me/operations`);
  }
}

export default new ProjectService();
