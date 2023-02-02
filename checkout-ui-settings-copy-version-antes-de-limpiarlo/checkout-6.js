// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.
// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.
/***************************Cedula****************************/
$(document).ready(function () {
    addElemento('texto')
  
    console.log('hooooo 2328785')
    var bla = $('#client-new-document').val();
    console.log("client new document first reload value", bla)
  
    
    var  buttonpayment = $('#go-to-shipping')
  
    function fakeButton() {  
      if (!exist) {
          $('#go-to-shipping').remove()
      
          $('<div class="agreementCover"></div>').insertBefore('.newsletter-text')
      
          var html =
            '<div id="agreementWrapper"><button  style=" width: 100%;margin-top: 26px;background: #27261fab!important; border: 1px solid #27261fab;border-radius: 0; color: #fff;outline: 0;font-weight: 400;text-transform: uppercase;letter-spacing: 1px;box-shadow: none;font-size: 14px; height: 48px;text-shadow: none;" type="submit" id="agreement" disabled="disabled" name="agreement">' +
            '<label class="agreementclass" for="agreement"></label><span id="agreementText">IR A ENVÍO</span></div>'
      
          $(html).insertAfter($('.newsletter-text'))
          exist = true
          console.log("fakebutton valor de exist", exist)
         
  
      }
    }
  
    function oldButton() {
       if (exist) {
           $('#agreementWrapper').remove()
       
           // $('<div class="agreementCover"></div>').insertBefore('.newsletter-text')
       
           // var html =
           //   '<div id="agreementWrapper"><button  style="    width: 100%;margin-top: 26px;background: #27261fab!important; border: 1px solid #27261fab;border-radius: 0; color: #fff;outline: 0;font-weight: 400;text-transform: uppercase;letter-spacing: 1px;box-shadow: none;font-size: 14px; height: 48px;text-shadow: none;" type="submit" id="agreement" disabled="disabled" name="agreement">' +
           //   '<label class="agreementclass" for="agreement"></label><span id="agreementText">IR A ENVÍO</span></div>'
       
           $(buttonpayment).insertAfter($('.newsletter-text'))
           exist = false
           console.log("oldbutton valor de exist", exist)
  
           
       }
    }
  
    //    var btncompra = document.getElementById('go-to-shipping');
    //    btncompra.disabled = true;
  
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
    var exist = false
  
    function detectCSS() {
      var result = $('.other-document').css('display') == 'none' ? false : true
      return result
    }
  
    document.getElementById('no-document-key').addEventListener('click', displayDateF)
  
    document.getElementById('has-document-key').addEventListener('click', displayDateT)
  
    // var btncompra = document.getElementById('go-to-shipping');
  
    function displayDateT() {
      custom = false
      console.log('custom', custom)
      oldButton()
    }
  
    function displayDateF() {
      custom = true
      console.log('custom', custom)
      fakeButton()
    }
  
  
    $(window).on('hashchange', function() {
    if(window.location.href.includes("checkout/#/profile")) {
      console.log("si jala ")
    if (detectCSS()) {
        
        fakeButton()
    }else{
      console.log("aqui deberia entrar el Old button")   
        oldButton()
    }
    }
  })
    
  
    $('#client-new-document').on('input', function (e) {
      var valoresAceptados = /^[0-9]+$/
  
      if ($('#client-new-document').val().match(valoresAceptados) && $('#client-new-document').val().length == 6) {
        console.log('es numerico')
        console.log('client document value lenght', $('#client-new-document').val().length)
        oldButton()
        $('#agreementWrsapper').remove()
        var html2 =
            '<div id="agreementWrsapper">' +
            '<span id="agreemenstText" style="color: green;">Tu cédula es válida</span></div>'
      
          $(html2).insertAfter($('#client-new-document'))
      //   $('#agreementWrsapper').remove()
      //   var html2 =
      //       '<div id="agreementWrsapper">' +
      //       '<span id="agreemenstText" style="color: green;">Tu cédula es válida</span></div>'
      
      //     $(html2).insertAfter($('#client-new-document'))
      } else {
        console.log('no es numerico')
        $('#agreementWrsapper').remove()
        var html3 =
            '<div id="agreementWrsapper">' +
            '<span id="agreemenstText" style="color: red;">Insira una cédula válida</span></div>'
      
          $(html3).insertAfter($('#client-new-document'))
      //   $('#agreementWrsapper').remove()
      //   var html3 =
      //       '<div id="agreementWrsapper">' +
      //       '<span id="agreemenstText" style="color: red;">Insira una cédula válida</span></div>'
      
      //     $(html3).insertAfter($('#client-new-document'))
        fakeButton()
        
      }
    })
  
    
    // if (custom) {
    //    btncompra.disabled = true;
    // }else{
    //     console.log("queda el boton sin el disable")
    // }
  
    var documentValue = $('#client-new-document').val()
  
    function addElemento(texto) {
      var capa = document.getElementById('orderform-title')
      var h1 = document.createElement('h1')
      h1.innerHTML = texto
      capa.appendChild(h1)
    }
  
    
  
  
  //   $(window).on('hashchange', function () {
  //       if (window.location.href.includes('checkout/#/shipping')) {
  //               console.log("si se esta ejecutando cuando entra al shipping")
  //               $('#ship-city').on('change', function() {
  //                 console.log("onchange si esta jalando ")
  //                 vtexjs.checkout.getOrderForm().done(function(orderForm) {
  //                             var postalCodeNumber = orderForm.shippingData.address.postalCode
  //                             console.log("postal code number: ", postalCodeNumber)
  //                             localStorage.setItem("postalCode", postalCodeNumber );
  
  //                           })
  //               });
  //               $('#btn-go-to-payment').click(function () { 
  //                   var postalcodeGet = (localStorage.getItem("postalCode"))
                   
  //                  console.log("console log de its already inside click", postalcodeGet)
  //                  $.ajax({
  //                     url: 'https://api-locations.azurewebsites.net/api/Direccion/05001?countryCode=CO',
  //                     headers: {
  //                         'ApiKey': ' 0867c264d66a65a12ae7478af9cb59164e919feb17534eebb451547948bffb66',
                          
  //                     },
  //                     method: 'GET',
  //                     success: function(data){
  //                       console.log('succes: '+data);
  //                     }
  //                   });
  //                     const url = "https://api-locations.azurewebsites.net/api/Direccion/05001?countryCode=CO";
  //                     fetch(url, {
  //                     method: "GET",
  //                     withCredentials: true,
  //                     headers: {
  //                         'ApiKey': ' 0867c264d66a65a12ae7478af9cb59164e919feb17534eebb451547948bffb66',
                         
  //                     }
  //                     })
  //                     .then(resp => resp.json())
  //                     .then(function(data) {
  //                         console.log("data: ", data);
  //                     })
  //                     .catch(function(error) {
  //                         console.log("error: ",error);
  //                     });
                  
                        
                
                  
  //               })
  //       } 
  //   })
  
  
    $('#go-to-shipping').click(function () {
      if (custom) {
      //   var valoresAceptados = /^[0-9]+$/
      //   if ($('#client-new-document').val().match(valoresAceptados)) {
      //     alert('es numerico')
      //     console.log('client document value lenght', $('#client-new-document').val())
      //   } else {
      //     alert('no es numerico')
      //   }
        $(window).on('hashchange', function () {
          if (window.location.href.includes('checkout/#/')) {
            vtexjs.checkout
              .getOrderForm()
              .then(function (orderForm) {
                var documentDataT = $('#client-document-type').val()
  
                console.log('documentCustomData value true: ', documentDataT)
                var documentClient = $('#client-new-document').val.length
                console.log('documentClient: ', documentClient)
                var clientProfileData = orderForm.clientProfileData
                clientProfileData.documentType = documentDataT
                return vtexjs.checkout.sendAttachment('clientProfileData', clientProfileData)
              })
              .done(function (orderForm) {
                /*alert("Name changed! when its true and if statemant are executed")*/
                console.log(orderForm)
                console.log(orderForm.clientProfileData)
              })
          }
        })
      } else {
        /*alert( " false." );*/
        $(window).on('hashchange', function () {
          if (window.location.href.includes('checkout/#/')) {
            vtexjs.checkout
              .getOrderForm()
              .then(function (orderForm) {
                var documentDataF = $('#client-document').val()
                console.log('documentCustomData value false: ', documentDataF)
                var clientProfileData = orderForm.clientProfileData
                clientProfileData.document = documentDataF
                clientProfileData.documentType = 'cedulaCol'
                return vtexjs.checkout.sendAttachment('clientProfileData', clientProfileData)
              })
              .done(function (orderForm) {
                /* alert("Name changed! when its false and else statemant are executed")*/
                console.log(orderForm)
                console.log(orderForm.clientProfileData)
              })
          }
        })
      }
    })
  
    var orderFormId
    var ck = new vtexjs.Checkout()
  
    ck.getOrderForm().then(function (orderForm) {
      console.log('orderFormChido', orderForm)
      orderFormId = orderForm.orderFormId
    })
  
    editForm()
    $(window).on('hashchange', function () {
      console.log('hashChane')
      updateOrderForm(orderFormId)
    })
  
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
  
    function editForm() {
      var interval = setInterval(function () {
        var col = document.getElementsByClassName('client-document-type')
        console.log('no existo', col)
  
        if (col.length > 0) {
          // $("#client-document").focus();
  
          console.log('existo', col)
          //   $("#client-document").css("display", "none");
  
          //   col.empty();
  
          var textos = ['Seleccione una opción', 'Cédula de Extranjería']
  
          var valores = ['qqqq', 'cedulaEXT']
  
          $('#client-document-type').remove()
          //Create and append select list
          var selectList = document.createElement('select')
          selectList.id = 'client-document-type'
          col[0].appendChild(selectList)
  
          //Create and append the options
          for (var i = 0; i < textos.length; i++) {
            var option = document.createElement('option')
            option.value = valores[i]
            option.text = textos[i]
            selectList.appendChild(option)
          }
  
          clearInterval(interval)
        } else {
        }
      }, 500)
    }
  })
  
  function updateOrderForm(orderFormId) {
    var dtc = $('#documentTypeCustom').val()
    var dc = $('#documentCustom').val()
    var dcOriginal = $('#documentTypeCustom').val()
  
    console.log('valores', { dtc, dc })
    console.log('valor dcOriginal', $('#documentTypeCustom').val())
  
    if (dtc == 'P') {
      var data = {
        document: dc || 'document',
        documentType: dtc,
      }
    } else {
      var data = {
        document: 'cedulaCol',
        documentType: dcOriginal,
      }
    }
  
    var settings = {
      url: '/api/checkout/pub/orderForm/' + orderFormId + '/customData/custom-document',
      type: 'PUT',
      timeout: 0,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    }
  
    $.ajax(settings).done(function (response) {
      console.log('devolvi', response)
    })
  }
  
  /********************barra***********************/
  
  $(document).ready(function () {
    var target = 710000 //set your promotion target
    var percent
    var showProgressBar = true // if you want to show the progressbar
    $('.pBGoal').text('$' + target)
  
    if (showProgressBar) {
      $('.progressCheck').css('display', 'block')
    } else {
      $('.progressCheck').css('display', 'none')
    }
  
    $('body').on('DOMSubtreeModified', 'tfoot', function () {
      // console.log('changed');
      var tfoot = $('tfoot').find('.monetary')
      var total = tfoot[1].innerText
      //   console.log('tfoot',total);
      var finalTotal = total.split('.').join('').split('$').join('').split(' ').join('')
      var checking = isNaN(Number(finalTotal))
      if (checking) {
        finalTotal = 0
      }
      var numeroTotal = target - Number(finalTotal)
      if (numeroTotal <= 0) {
        var finalText = 'Felicidades! completaste la barra' //this will be the text if you reach your target
      } else {
        var finalText = 'Agrega $' + numeroTotal + ' a tu carrito para recibir envío estándar gratis'
      }
      $('.shippingText').text(finalText)
      $('.pBInitial').text('$' + finalTotal)
      percent = (Number(finalTotal) / target) * 100 > 100 ? 100 : (Number(finalTotal) / target) * 100
      $('.progressBar').css('width', percent + '%')
      // console.log('porcentaje', percent);
    })
  })
  