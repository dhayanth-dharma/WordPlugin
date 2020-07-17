import client from "../../client/client";

class CategoryService {
	create(payload) {
		return client.post(`/categories`, { payload });
	}
	get({ categoryId }) {
		return client.get(`/categories/${categoryId}`);
	}
	update({ categoryId }, payload) {
		return client.patch(`/categories/${categoryId}`, { payload });
	}
	delete({ categoryId }) {
		return client.delete(`/categories/${categoryId}`);
	}
}

export default new CategoryService();
