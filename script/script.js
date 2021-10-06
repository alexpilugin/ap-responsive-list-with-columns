
var columns = 1;
var lastColums = 1;
var clonedList;

function chunk(arr, chunkSize) {
  if (chunkSize <= 0) throw "Invalid chunk size";
  var result = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    result.push(arr.slice(i, i + chunkSize));
  return result;
}

function transpose(matrix) {
  return matrix.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
  ), []);
}

function reorder(colNumber) {

  // The optional chaining operator (?.)
  let list = clonedList?.cloneNode(true);

  if (list) {
    // list.style.color = "red";
    const lis = list.querySelectorAll("li")
    const len = lis.length;
    const chunkLen = Math.ceil(len / colNumber)
    const indexes = [...Array(chunkLen * colNumber).keys()];

    const chunks = chunk(indexes, chunkLen);
    const tr = transpose(chunks);
    const merged = [].concat.apply([], tr);

    let ul = document.createElement('ul');
    ul.classList.add("list-columns", "list-columns--max-cols-3", "bullets");

    for (var i = 0; i < len; i++) {
      ul.appendChild(lis[merged[i]]);
    }

    document.body.innerHTML = ''
    document.body.appendChild(ul);
  }
}

(
  window.onload = function () {

    // viewportWidth
    let vw = window.innerWidth || document.documentElement.clientWidth;

    // The optional chaining operator (?.)
    clonedList = document.querySelector("ul.list-columns")?.cloneNode(true);

    if (vw > 640) {
      columns = vw > 800 ? 3 : 2;
      lastColums = columns;
      reorder(columns);
    } else {
      columns = 1;
    }

    window.addEventListener('resize', function () {
      vw = window.innerWidth || document.documentElement.clientWidth;

      if (vw > 640) {
        columns = vw > 800 ? 3 : 2;
      } else {
        columns = 1;
      }

      if (columns !== lastColums) {
        reorder(columns);
      }

      lastColums = columns;
    })
  }

)()