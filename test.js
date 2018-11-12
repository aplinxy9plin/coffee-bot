// создаем массив
var arr = [1,2,3,2,3,4,5,6,1,2,3,4]
// массив, в который мы кладем значения
var tmp = [],
// массив, в который мы кладем 1 и последний элемент
    tmp1 = [],
    x = 0;
for (var i = 0; i <= arr.length; i++) {
  if(x !== 0){
    // arr[1] > arr[0]
    if(arr[i] > arr[i-1]){
      // tmp = [2]
      tmp.push(arr[i])
    }else{
      if(tmp.length > tmp1.length){
        tmp1 = tmp
      }
      tmp = []
      x = 0
    }
  }else{
    if(i == 0){
      // arr = [1]
      tmp.push(arr[i])
    }else{
      tmp.push(arr[i-1])
    }
    x++
  }
}
console.log(tmp1[0], tmp1[tmp1.length-1]);
