var selettoreVenditore = $('.select_seller');
var bottone = $('#mybutton');
var inserisciVendita = $('#input_vendita');
$(document).ready(function(){
  init();
  $('#mybutton').click(function(){
    var selettoreData = $('.select_date').val();
    var dataScelta = moment(selettoreData).format('DD/MM/YYYY');
    $.ajax({
      url: 'http://157.230.17.132:4010/sales',
      method: 'POST',
      data: {
        salesman: selettoreVenditore.val(),
        amount: inserisciVendita.val(),
        date: dataScelta,
      },
      success: function(data){
        init();
        alert("Vendita inserita con successo");
      },
      error: function(err){
        alert("La vendita non è stata inserita per un errore");
      }
    })
  });


  function init(){
    $.ajax({
      url: 'http://157.230.17.132:4010/sales',
      method: 'GET',
      success: function(data){
        processPie(data);
        processLine(data);
      },
      error: function(err){
        alert("qualcosa non va");
      }
    })
  }

  function processLine(results){
    var oggettoMesi = {
      January: 0,
      February : 0,
      March: 0,
      April:0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December:0
    };

    for (var i=0; i < results.length; i++) {
      var venditaSingola = results[i];
      var ammontareVendita = venditaSingola.amount;
      var originalDate = venditaSingola.date;
      var momentDate = moment(originalDate, "DD/MM/YYYY");
      var mese = momentDate.format('MMMM');
      oggettoMesi[mese] += parseInt(ammontareVendita);
    };

    arrayAmmVendMesi = [];
    arrayMesi = [];

    for (var mese in oggettoMesi) {
      arrayAmmVendMesi.push(oggettoMesi[mese]);
      arrayMesi.push(mese);
    };
    // console.log(arrayAmmVendMesi);
    // console.log(venditeMese);

    var myLineChart = new Chart($('#line'), {
      type: 'line',
      data: {
        labels: arrayMesi,
        datasets: [{
          label:"Vendite azienda per mese",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'white',
          data: arrayAmmVendMesi,
        }],
      },
    });
  };

  function processPie(results){
    var oggettoVenditeAgenti = {};
    var fatturatoTotale = 0;
    for (var i=0; i < results.length; i++){
      var venditaSingola = results[i];
      var venditore = venditaSingola.salesman;
      var ammontareVendita = venditaSingola.amount;
      if (oggettoVenditeAgenti[venditore] == undefined){
        oggettoVenditeAgenti[venditore] = 0;
      }
      oggettoVenditeAgenti[venditore] += parseInt(ammontareVendita);
      fatturatoTotale += parseInt(ammontareVendita);
      // console.log(data);
      // console.log(oggettoVenditeAgenti);
      // console.log(fatturatoTotale);;

    }
    var arrayVenditori = [];
    var arrayVendite = [];
    for ( var chiave in oggettoVenditeAgenti){
      selettoreVenditore.append('<option value="' + chiave +'">' + chiave + '</option>');
      var percentualeFatturato = oggettoVenditeAgenti[chiave] / fatturatoTotale *100;
      arrayVenditori.push(chiave);
      arrayVendite.push(percentualeFatturato.toFixed(2));
      // console.log(arrayVendite);
    }
    var myPieChart = new Chart($('#pie'),{
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
  };

})
