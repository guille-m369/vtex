/***************************Cedula****************************/
$(document).ready(function () {
    
  
    console.log("hoooooo112365"); 
  
  /*
   function detectCSS() {
	var result = ($('.other-document').css('display') == "none" )? true : false;
	return result;
}
  
  
  if(detectCSS()) {
		console.log("kbkjbkjbkjbkjbkbkjbkbkbbk. true")
  }else{
  	console.log("kjbkjbkjbkbjkjb. false")
  }
*/  
  var custom = false
  
  function detectCSS() {
	var result = ($('.other-document').css('display') == "none" )? true : false;
	return result;
}
  
  
  document.getElementById("no-document-key").addEventListener("click", displayDateF);




document.getElementById("has-document-key").addEventListener("click", displayDateT);



function displayDateT() {
custom = false;
console.log("custom", custom);
}
  
  function displayDateF() {
custom = true;
console.log("custom", custom);
}
  

  
  
  $( "#go-to-shipping" ).click(function() {
    if(custom){
     $(window).on('hashchange', function() {
    if (window.location.href.includes("checkout/#/")) {
      vtexjs.checkout
  			.getOrderForm()
  			.then(function(orderForm) {
            var documentDataT = $("#client-document-type").val()
            console.log("documentCustomData value true: ", documentDataT)
            var clientProfileData = orderForm.clientProfileData
            clientProfileData.documentType = documentDataT
            return vtexjs.checkout.sendAttachment(
              "clientProfileData",
              clientProfileData
            )
          })
          .done(function(orderForm) {
            /*alert("Name changed! when its true and if statemant are executed")*/
            console.log(orderForm)
            console.log(orderForm.clientProfileData)
          })
    }    
  });
    } else{
      /*alert( " false." );*/
      $(window).on('hashchange', function() {
    if (window.location.href.includes("checkout/#/")) {
      vtexjs.checkout
  			.getOrderForm()
  			.then(function(orderForm) {
            var documentDataF = $("#client-document").val()
            console.log("documentCustomData value false: ", documentDataF)
            var clientProfileData = orderForm.clientProfileData
            clientProfileData.document = documentDataF
            clientProfileData.documentType = "cedulaCol"
            return vtexjs.checkout.sendAttachment(
              "clientProfileData",
              clientProfileData
            )
          })
          .done(function(orderForm) {
           /* alert("Name changed! when its false and else statemant are executed")*/
            console.log(orderForm)
            console.log(orderForm.clientProfileData)
          })
    }    
  });
    }
});
  
 
var orderFormId;
        var ck = new vtexjs.Checkout(); 
                
        ck
        .getOrderForm()
        .then(function (orderForm) {
            console.log("orderFormChido",orderForm);
            orderFormId = orderForm.orderFormId;
        });

        editForm();
        $(window).on('hashchange', function() {
            console.log('hashChane');
            updateOrderForm(orderFormId);

		});
    
 
  /*$(window).on('hashchange', function() {
    if (window.location.href.includes("checkout/#/shipping")) {
      vtexjs.checkout
  			.getOrderForm()
  			.then(function(orderForm) {
            var documentData = $("#client-document-type").val()
            var clientProfileData = orderForm.clientProfileData
            clientProfileData.documentType = documentData
            return vtexjs.checkout.sendAttachment(
              "clientProfileData",
              clientProfileData
            )
          })
          .done(function(orderForm) {
            alert("Name changed!")
            console.log(orderForm)
            console.log(orderForm.clientProfileData)
          })
    }    
  });*/
         
   

  function editForm(){

    
    
    var interval =  setInterval(function(){
      
    
    var col = document.getElementsByClassName('client-document-type');
    console.log("no existo", col);
       
    if(col.length > 0){

        // $("#client-document").focus();  

      console.log("existo", col);
    //   $("#client-document").css("display", "none");
  
  
    //   col.empty();

      var textos = [
            "Seleccione una opción", 
            "Cédula de Extranjería",
            "Pasaporte"
        ];

        var valores = [
            "qqqq",
            "cedulaEXT",
            "pasaporte"
        ];

      	$("#client-document-type").remove();
        //Create and append select list
        var selectList = document.createElement("select");
        selectList.id = "client-document-type";
        col[0].appendChild(selectList);

        //Create and append the options
        for (var i = 0; i < textos.length; i++) {
            var option = document.createElement("option");
            option.value = valores[i];
            option.text = textos[i];
            selectList.appendChild(option);
        }

     
      clearInterval(interval);
    }else{}
                               
   }, 500);
  }
});

function updateOrderForm(orderFormId){
  
    var dtc = $('#documentTypeCustom').val();
    var dc = $('#documentCustom').val();
    var dcOriginal = $('#documentTypeCustom').val();

    console.log("valores", { dtc, dc});
                            console.log("valor dcOriginal", $('#documentTypeCustom').val() );

    if(dtc == 'P'){
        var data = {
            "document": dc || 'document',
            "documentType" : dtc 
        };
    }else{
        var data = {
            "document": 'cedulaCol',
            "documentType" : dcOriginal 
        };
    }


    var settings = {
        url: "/api/checkout/pub/orderForm/" + orderFormId + "/customData/custom-document",
        type: 'PUT',
        timeout: 0,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
    };

    $.ajax(settings).done(function(response){
        console.log('devolvi', response);
    })

      
    
  
  }



 









/********************barra***********************/

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