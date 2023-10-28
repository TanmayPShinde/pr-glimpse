const isPresent_exec_cmd = (strings) =>
  strings.some((str) => str.includes("/execute"));

module.exports = { isPresent_exec_cmd };
