import client from "../client/client";

class FeatureService {
	getStatus({ feature }) {
		return client.get(`/features/${feature}/status`);
	}
}

export default new FeatureService();
