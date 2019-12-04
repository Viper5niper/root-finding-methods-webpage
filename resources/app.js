//boton de para registrar un usario a la base
function registrar(){
    
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    
    .then(function(){
        verificar()
    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorCode + errorMessage);
      });
}

function ingreso(){
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;



    firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorCode + errorMessage);
      });
}


//esta funcion es la que se usa para saber si hay una sesion activa o no
function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;

          console.log('********');
          console.log(user.emailVerified);

          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log('existe usuario activo');
          aparece(user);
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('no existe usuario activo');
          //contenido.innerHTML = ``;
        }
      });
}

observador();


//esta funcion se ocupa para mostrar las cosas una vez inicie sesion en el div con id contenido
function aparece(user){
    var user = user;
    //var contenido = document.getElementById('contenido');
    
    //si el usuario esta verificado mostrara el contenido
    if(user.emailVerified){
        window.location.replace("file:///C:/Users/ruben/Documents/Codigos/MetodoBiseccion-master/index.html");
    }

    
}


//cierra secion
function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('saliendo');
    })
    .catch(function(error){
        console.log(error);
    })
}


//esto manda el mensaje de verificacion al correo no cambiar
function verificar(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('enviando correo');
    alert('Se ha enviado un enlace a la direccion de correo para que pueda verificar su cuenta');
    }).catch(function(error) {
    // An error happened.
    console.log(error);
    });

}