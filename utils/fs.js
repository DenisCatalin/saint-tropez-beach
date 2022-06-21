const fs = require("fs");

const racoritoare = require("../data/racoritoare.json");

export const racoritoareRepo = {
  getAll: () => racoritoare,
  getById: (id) => racoritoare.find((x) => x.id.toString() === id.toString()),
  find: (x) => racoritoare.find(x),
  create,
  update,
  delete: _delete,
};

function create(user) {
  user.id = racoritoare.length
    ? Math.max(...racoritoare.map((x) => x.id)) + 1
    : 1;

  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString();

  racoritoare.push(user);
  saveData();
}

function update(id, params) {
  const user = racoritoare.find((x) => x.id.toString() === id.toString());
  user.dateUpdated = new Date().toISOString();
  Object.assign(user, params);
  saveData();
}

function _delete(id) {
  racoritoare = racoritoare.filter((x) => x.id.toString() !== id.toString());
  saveData();
}

function saveData() {
  fs.writeFileSync(
    "data/racoritoare.json",
    JSON.stringify(racoritoare, null, 4)
  );
}
