var x=[];
var y=[];
var temp = 0;
//Sellmeier coefficients for crown glass//
var bcrown=[1.03961212, 0.231792344, 1.01146945];
var ccrown=[0.00600069867, 0.0200179144, 103.560653];

//Create a new graph//
const graph = new Chart("graph", {
  type: "line",
  data: {
    labels: x,
    datasets: [{
      backgroundColor:"rgba(255,255,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: y
    }]
  },
  options:{
      scales: {
        y: { title: { display: true, text: 'Refractive Index (n)'} }
  }
}
});
main()
function main(){
var button = document.getElementById("submit");
button.onclick = function update(){
    x=[];
    y=[];
    var x_start = parseFloat(document.getElementById("x_start").value);
    var x_end = parseFloat(document.getElementById("x_end").value);
    for (let i=x_start; i<x_end; i+=((x_end-x_start)/1000)){
      temp = 0
      if (document.getElementById("input_choice").value=="frequency"){
      x.push(300000000/i);
      lambda = 300000000/i;
      }
      else{
      lambda=i;
      x.push(i)
      }
      for (let j=0; j<3; j++) {
        temp += (bcrown[j]*(lambda**2))/((lambda**2)-ccrown[j])
      }
      y.push(Math.sqrt(1+temp))
    }
    graph.data.labels = x;
    graph.data.datasets[0].data = y;
    graph.update();
    console.log(x);
    console.log(y);
}
}