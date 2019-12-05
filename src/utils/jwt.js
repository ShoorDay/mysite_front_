export default {
  decode(token) {
    return JSON.parse(
      decodeURIComponent(escape(window.atob(token.split(".")[1])))
    );
  },
  isExpired(time) {
    const date = new Date();
    if (date.getTime() > time * 1000) return true;
    return false;
  }
};
