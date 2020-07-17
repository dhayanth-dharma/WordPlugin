import client from "../client/client";

class RoleService {
	listUserOnDocument() {
		return client.get(`/roles/user-document`);
	}

	listUserInCompany() {
		return client.get(`/roles/user-company`);
	}

	listCompanyInProject() {
		return client.get(`/roles/company-project`);
	}
}

export default new RoleService();
