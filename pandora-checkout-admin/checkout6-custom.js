$(document).ready(function () {
  
    var target = 710000; //set your promotion target
    var percent;
    var showProgressBar = true; // if you want to show the progressbar
    $('.pBGoal').text('$' + target);
    
    if(showProgressBar) {
        $('.progressCheck').css('display', "block");
    }else{
        $('.progressCheck').css('display', "none")
    }
  
   $('body').on('DOMSubtreeModified', 'tfoot', function(){
  	    console.log('changed');
        var tfoot = $('tfoot').find( ".monetary" );
  	    var total = tfoot[1].innerText;
	    console.log('tfoot',total);
        var finalTotal =  total.split(".").join("").split("$").join("").split(" ").join("");
        var checking = isNaN(Number(finalTotal));
        if(checking) {
            finalTotal = 0;
        }
        var numeroTotal = target - Number(finalTotal);
        if( numeroTotal <= 0){
            var finalText = 'Felicidades! completaste la barra';  //this will be the text if you reach your target
        }else{
            var finalText = 'Agrega $' + numeroTotal + ' a tu carrito para recibir envío estándar gratis'; 
        }
        $('.shippingText').text(finalText);
        $('.pBInitial').text('$' +finalTotal); 
        percent = (((Number(finalTotal) / target)  * 100) > 100) ? 100 : ((Number(finalTotal) / target)  * 100);
        $('.progressBar').css('width', percent + '%');
        console.log('porcentaje', percent);
	});

});