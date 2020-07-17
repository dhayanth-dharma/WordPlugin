import client from "../../client/client";

class SowReqViewService {
	getInformationTags({ informationId }) {
		return client.get(`/smartview/sow/information/${informationId}`);
	}
	setSowToInformation({ informationId }, payload) {
		return client.post(`/smartview/sow/information/${informationId}`, { payload: payload });
	}
	removeSowFromInformation({ informationId }, payload) {
		return client.patch(`/smartview/sow/information/${informationId}`, {
			payload: { op: "DELETE", ...payload },
		});
	}
}

export default new SowReqViewService();
