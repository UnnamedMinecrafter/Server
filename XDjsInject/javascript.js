function XDJSINJECT() {
  this.getHTML = function ( url, callback ) {
      if ( !window.XMLHttpRequest ) return;
        var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        if ( callback && typeof( callback ) === 'function' ) {
          callback( this.responseXML );
        }
      }

    xhr.open( 'GET', url );
    xhr.responseType = 'document';
    xhr.send();

  };
  this.openLink = function(url) {
    getHTML( url, function (response) { 
      document.documentElement.innerHTML = response.documentElement.innerHTML;
    });
  }
}

var xdjsinject = new XDJSINJECT();
