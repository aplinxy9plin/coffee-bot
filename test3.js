// bool check = false
var x = 1000, check = false;
while(true){
  x++
  for (var i = 2; i < x; i++) {
    // остаток от деления == 0
    if(x%i == 0){
      check = false
      break
    }else{
      check = true
    }
  }
  if(check == true){
    console.log(x);
    break
  }
}
