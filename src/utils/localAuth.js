import jwt from "@/utils/jwt.js";
import $api from "@/api";

export default {
  set(payload) {
    window.localStorage.setItem("access", payload.access || "");
    window.localStorage.setItem("refresh", payload.refresh || "");
    window.localStorage.setItem("user_id", payload.user_id || 0);
  },
  get() {
    let local = {
      token: {},
      user_id: 0
    };
    local.token.access = window.localStorage.getItem("access") || "";
    local.token.refresh = window.localStorage.getItem("refresh") || "";
    local.user_id = window.localStorage.getItem("user_id") || 0;
    return local;
  },
  authenticate($vm) {
    let auth = {
      is_expired: true,
      is_authenticated: false,
      profile: {
        user_id: "",
        username: "",
        nickname: "",
        isAdmin: false,
        email: "",
        email_is_active: false
      }
    };
    let token = this.get().token;
    auth.profile.user_id = window.localStorage.getItem("user_id") || 0;
    if (token.access && auth.profile.user_id) {
      const payload = jwt.decode(token.access);
      auth.is_expired = jwt.isExpired(payload["exp"]);
      if (auth.is_expired) {
        this.delete();
        $vm.$notify.error({
          title: "登录过期",
          message: "请重新登录",
          duration: 0
        });
        $vm.$router.push({
          name: "sign_in"
        });
      } else {
        auth.is_authenticated = true;
        $vm.$store.commit("user/authenticate", auth.profile);
        if (auth.profile.user_id) {
          $vm.$api.user.userRetrieve(auth.profile.user_id, {}).then(
            res => {
              auth.profile = res.data;
              auth.profile.user_id = res.dataid;
              $vm.$store.commit("user/authenticate", auth.profile);
            },
            err => {
              console.log(err);
              console.log("Token有问题");
            }
          );
        }
      }
    }
    return auth;
  },
  delete() {
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");
  },
  check() {
    const local = this.get();
    if (local.user_id && local.token.access) {
      const payload = jwt.decode(local.token.access);
      if (jwt.isExpired(payload["exp"])) {
        return false;
      }
      return true;
    }
    return false;
  }
};
