import client from "../client/client";

class PublicService {
  login({ email, password }) {
    return client.post(`login`, {
      payload: {
        username: email,
        password: password
      }
    });
  }

  loginWithInstance({ email, password, instance }) {
    client.setCurrentInstance( {instance: instance });
    return this.login({ email: email, password: password });
  }

  signOut() {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  }

  setPassword({ newPassword, token }) {
    return client.put(`public/users/me/set-password`, {
      payload: {
        newPassword: newPassword,
        token: token
      }
    });
  }

  forgotPassword({ email }) {
    return client.put(`public/users/me/password-reset-request`, { payload: email });
  }

  resetPassword({ newPassword, token }) {
    return client.put(`public/users/me/reset-password`, {
      payload: {
        newPassword: newPassword,
        token: token
      }
    });
  }
}

export default new PublicService();
