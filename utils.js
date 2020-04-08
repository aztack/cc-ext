const pkgName = 'cc-ext';
const $fs = require('fs');

function read(relativePath) {
  return $fs.readFileSync(Editor.url(`packages://${pkgName}/${relativePath}`), 'utf-8');
}

function write(relativePath, data) {
  const path = Editor.url(`packages://${pkgName}/${relativePath}`);
  $fs.writeFileSync(path, data);
  return path;
}

module.exports = {
  read,
  write,
  pkgName
}