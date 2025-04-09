const blacklist = new Set(); // conjunto de datos que no permite duplicados 

function addToBlacklist (accessToken) {
  blacklist.add(accessToken);
}

function isInBlacklist(accessToken) {
  return blacklist.has(accessToken);
}

module.exports = { addToBlacklist, isInBlacklist }

