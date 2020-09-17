export function requestRejected(prevFunc) {
  if (!prevFunc) {
    prevFunc = () => {};
  }
  return function appliedRequestRejected({ message, response }) {
    prevFunc();
    let msg;
    if (response) {
      msg = response.data.error || "接口请求失败";
    } else {
      msg = message;
    }
    throw msg;
  };
}
