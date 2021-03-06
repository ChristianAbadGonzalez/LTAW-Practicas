const ver = document.getElementById('ver'),
      resultado = document.getElementById('resultado'),
      PORT = 9090

function init() {
  $(document).ready(function () {
    $('.container-prod').show()
    $('.container-all').hide()
  });
}

ver.onkeyup = () => {
  if (ver.value.length >= 3) {
    const m = new XMLHttpRequest()
    m.onreadystatechange = function() {
       if (m.readyState == 4 && m.status == 200) {
         let productos = JSON.parse(m.responseText)
         resultado.innerHTML = ""
         for (let i = 0; i < productos.length; i++) {
           let url = productos[i].replace(/[ ]/gi,'-') + '.html'
           resultado.innerHTML += "<li class=\"list-group-item\" onclick=\"location.href='" + url + "'\">" + productos[i] + "</li>"
         }
       }
     }
     m.open("GET","http://localhost:" + PORT.toString() + "/action.searchbar?prod=" + ver.value, true)
     m.send()
  } else {
    resultado.innerHTML = ""
  }
}

ver.onkeydown = (ev) => {
  switch (ev.keyCode) {
    case 13: // enter
      if (ver.value.length >= 3) {
        const m = new XMLHttpRequest()
        m.onreadystatechange = function() {
           if (m.readyState == 4 && m.status == 200) {
             let productos = JSON.parse(m.responseText)
             $(document).ready(function () {
               $('.producto').show()
               $('.container-prod').hide()
               $('.container-all').show()
             });
             resultado.innerHTML = ""
             $(document).ready(function () {
               for (let i = 0; i < productos.length; i++) {
                 $('#' + productos[i].replace(/[ ]/gi,'-')).hide()
               }
             })
           }
         }
         m.open("GET","http://localhost:" + PORT.toString() + "/action.showsearch?prod=" + ver.value, true)
         m.send()
         ver.value = ""
      }
      break
    default:
      //
  }
}