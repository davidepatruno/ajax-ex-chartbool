
$(document).ready(function(){
  $.ajax({
    url: 'http://157.230.17.132:4010/sales',
    method: 'GET',
    success: function(data){
      var venditaTotaleAgenti = {};
      for (var i=0; i < data.length; i++){
        var venditaSingola = data[i];
        if (venditaTotaleAgenti[venditaSingola.salesman] == undefined){
          venditaTotaleAgenti[venditaSingola.salesman] = 0;
        }
        venditaTotaleAgenti[venditaSingola.salesman] += venditaSingola.amount;
        // console.log(venditaTotaleAgenti);

      }
      var arrayVenditori = [];
      var arrayAmmontareVendite = [];
      for ( var chiave in venditaTotaleAgenti){
        arrayVenditori.push(chiave);
        arrayAmmontareVendite.push(venditaTotaleAgenti[chiave]);
      }
      var myPieChart = new Chart($('.test-boolean'),{
        type: 'pie',
        data: {
          datasets: [{
              data: arrayAmmontareVendite,
              labels: arrayVenditori,
              backgroundColor: [
               'rgba(255, 99, 132)',
               'rgba(54, 162, 235)',
               'rgba(255, 206, 86)',
               'rgba(75, 192, 192)',
               'rgba(153, 102, 255)',
               'rgba(255, 159, 64)'
           ],
          }],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: arrayVenditori,
        }
      });

    },
    error: function(err){
      alert("qualcosa non va");
    }
  })

})
