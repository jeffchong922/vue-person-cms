function stringify(data) {
  return JSON.stringify(data);
}

function parse(str) {
  return JSON.parse(str);
}

function trimStr (str) {
  return str.trim()
}

export { stringify, parse, trimStr }