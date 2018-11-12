var arr = [
  [0,2,1, 1],
  [5,6,7,5],
  [5,6,7,5],
  [9,10,11,12]
]
var n = 4, max, min, x = 0, tmp1 = arr[0][0], tmp2 = arr[0][0];
// max - строка
// min - столбец
max = 0
min = 0
// строка
for (var i = 0; i < n; i++) {
// столбец
  for (var j = 0; j < n; j++) {
    if(arr[i][j] < tmp1){
      min = j
    }
    if(arr[i][j] > tmp2){
      max = i
    }
  }
}
for (var i = 0; i < n; i++) {
  x += arr[i][min]*arr[max][i]
}
console.log(x);
