




// ----------------newScore-----------

function print(){
  for(let i=1;i<=5;i++){
    console.log(i,'=',localStorage.getItem(i));
  }
}


function setScore(x){
  let newScore=null;
  for(let i=5;i>0;i--){
    let promena=localStorage.getItem(i);
    if(promena>x || i==1) { 
      for (let index = 4; index > i; index--) {
        localStorage.setItem(index+1,localStorage.getItem(index));
      }
      if(i==1 && promena==null){ localStorage.setItem(i,x); newScore=i;}//very first
      else if(i==1 && promena<x){//new best
      localStorage.setItem(i+1,localStorage.getItem(i));
      localStorage.setItem(i,x); 
      newScore=i;
    }
      else {
        localStorage.setItem(i+1,x);
        newScore=i+1;
      }
      break;
    }
  }
  fillTable(newScore);
}


function fillTable(gameScore){
  let table=document.getElementById('scoreTable');

  var row = document.createElement("tr");
  var cell = document.createElement("th");
  var cellText = document.createTextNode("Place");
  cell.appendChild(cellText);
  row.appendChild(cell);

  var cell = document.createElement("th");
  var cellText = document.createTextNode("Score");
  cell.appendChild(cellText);
  row.appendChild(cell);
  table.appendChild(row)

  for (var i = 1; i <= 5; i++) {
    var row = document.createElement("tr");
      var cell = document.createElement("td");
      var cellText = document.createTextNode(i);
      cell.appendChild(cellText);
      row.appendChild(cell);

      var cell = document.createElement("td");
      var cellText = document.createTextNode(localStorage.getItem(i));
      cell.appendChild(cellText);
      row.appendChild(cell);
      if(i==gameScore){row.style.background="rgba(0, 165, 30, 0.37)"; row.style.fontWeight='bold';}
    table.appendChild(row)
  }
}

