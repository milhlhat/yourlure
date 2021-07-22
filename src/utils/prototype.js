export function getUniqueFiles(files) {
  console.log(files);
  let a = files;
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i]?.name === a[j]?.name) a.splice(j--, 1);
    }
  }
  return a;
}
export function getUniqueBase64(files) {
  let a = files;
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i].contentBase64 === a[j].contentBase64) a.splice(j--, 1);
    }
  }
  return a;
}
