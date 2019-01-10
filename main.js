
$(document).ready(function(){
  $.ajax({
    url: 'http://157.230.17.132:4010/sales',
    method: 'GET',
    success: function(data){
      var venditaTotaleAgenti = {};
      var fatturatoTotale = 0;
      for (var i=0; i < data.length; i++){
        var venditaSingola = data[i];
        var venditore = venditaSingola.salesman;
        var ammontareVendita = venditaSingola.amount;
        if (venditaTotaleAgenti[venditore] == undefined){
          venditaTotaleAgenti[venditore] = 0;
        }
        venditaTotaleAgenti[venditore] += ammontareVendita;
        fatturatoTotale += ammontareVendita;
        console.log(venditaTotaleAgenti);
        // console.log(fatturatoTotale);;

      }
      var arrayVenditori = [];
      var arrayVendite = [];
      for ( var chiave in venditaTotaleAgenti){
        var percentualeFatturato = venditaTotaleAgenti[chiave] / fatturatoTotale *100;
        arrayVenditori.push(chiave);
        arrayVendite.push(percentualeFatturato.toFixed(2));
        // console.log(venditaTotaleAgenti[chiave]);
      }
      var myPieChart = new Chart($('.test-boolean'),{
        type: 'pie',
        data: {
          datasets: [{
              data: arrayVendite,
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
