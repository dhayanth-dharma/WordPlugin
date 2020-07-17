import client from "../../client/client";

class NoticeService {
	getStatus() {
		return client.get(`/documents-out/notices/status`);
	}

	update({ noticeId }, payload) {
		return client.patch(`/documents-out/notices/${noticeId}`, { payload: payload });
	}
}

export default new NoticeService();
