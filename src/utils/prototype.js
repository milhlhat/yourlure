Array.prototype.uniqueFilesName = function () {
  let a = this.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i]?.name === a[j]?.name) a.splice(j--, 1);
    }
  }
  return a;
};

export function getUniqueFiles(files) {
  let a = files;
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i]?.name === a[j]?.name) a.splice(j--, 1);
    }
  }
  return a;
}
