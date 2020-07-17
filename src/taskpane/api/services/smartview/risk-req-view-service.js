import client from "../../client/client";

class RiskReqViewService {
	getInformationTags({ informationId }) {
		return client.get(`/smartview/risks/information/${informationId}`);
	}
	setRiskToInformation({ informationId }, payload) {
		return client.post(`/smartview/risks/information/${informationId}`, { payload: payload });
	}
	removeRiskFromInformation({ informationId }, payload) {
		return client.patch(`/smartview/risks/information/${informationId}`, {
			payload: { op: "DELETE", ...payload },
		});
	}
}
export default new RiskReqViewService();
