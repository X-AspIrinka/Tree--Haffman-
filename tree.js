function Node(freq, letter, used, code, lson, rson) {
  this.freq = freq; 
  this.letter = letter;
  this.used = used;
  this.code = code;
  this.lson = lson;
  this.rson = rson
}

function pair(freq, iter){
  this.freq = freq;
  this.iter = iter;
}

let str= prompt()

let tree = new Array()

let alph = new Object();

for (i = 0; i < str.length; i++) {
  if (alph[str.charAt(i)])
  alph[str.charAt(i)] ++;
else 
 alph[str.charAt(i)] = 1
}

for (let i in alph){
  console.log(i, alph[i])
  let n = new Node(alph[i], i, 0, "0", -1, -1);
  tree.push(n) 
}

let a = new pair(str.length + 1, -1)
let b = new pair(str.length + 1, -1)
let size = tree.length;

for (let i = 0; i < tree.length; i++) {    //создаем 1го отца
    if (tree[i].freq <= a.freq){             //ищем 2 минимальных по частоте элемента 
       b.freq = a.freq;
       b.iter = a.iter;
       a.freq = tree[i].freq;
       a.iter = i;
    }
    else if (tree[i].freq < b.freq && tree[i].freq >= a.freq) {
      b.freq = tree[i].freq;
      b.iter = i;
    } 
}
let n = new Node( tree[a.iter].freq + tree[b.iter].freq,  tree[a.iter].letter + tree[b.iter].letter,  0,  "1",  a.iter,  b.iter);
tree.push(n)
tree[a.iter].used = 1;
tree[b.iter].used = 1;
tree[a.iter].code = "0";
tree[b.iter].code = "1";
a.freq = str.length + 1;                       //создали 1го отца

let count = 2;
const size2 = tree.length - 1;
while(count < size2){                          //создает отцов для всех точек
  for (let i = 0; i < size; i++){                        
    if (tree[i].used == 0 && a.freq >= tree[i].freq){
      a.freq = tree[i].freq;
      a.iter = i;
    }
  }
  let n = new Node( tree[a.iter].freq + tree[tree.length-1].freq ,  tree[a.iter].letter + tree[tree.length-1].letter,  0, "1",  a.iter,  tree.length-1)
  tree.push(n)
  tree[a.iter].used = 1;
  a.freq = str.length + 1;
  count += 1;
}

tree[tree.length - 1].code = "";              //корень имеет код 0

for (let i = tree.length - 1; i >= size; i--){                 //трясем дерево хехехе
  if (tree[i].lson !=-1)
    tree[tree[i].lson].code = tree[i].code + tree[tree[i].lson].code;
  if (tree[i].rson !=-1)
    tree[tree[i].rson].code = tree[i].code + tree[tree[i].rson].code;
}
let result="";
for (let i=0; i<str.length; i++){                           //вывод закодированного сообщения
  for (let j=0;j<size;j++){
    if (tree[j].letter==str[i]){
      result+=tree[j].code;
      break;
    }
  }
}
console.log(result);