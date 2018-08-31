var config = {
    apiKey: "AIzaSyB9DJkL_ZyUaaFyr8zzdAVOMiQQWt5_YR0",
    authDomain: "linusbot-6f6a5.firebaseapp.com",
    databaseURL: "https://linusbot-6f6a5.firebaseio.com",
    projectId: "linusbot-6f6a5",
    storageBucket: "linusbot-6f6a5.appspot.com",
    messagingSenderId: "814716673788"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.location.href = "main/main.html"
    } else {
      // No user is signed in.
    }
  });

$('#registration-form').submit(function (e) {
    e.preventDefault();
    var email = $('#registration-form #email').val();
    var password = $('#registration-form #password').val();


    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
    });
});


    // (function ($) {
    //     "use strict";

    //     /*==================================================================
    //     [ Validate ]*/
    //     var input = $('.validate-input .input100');

    //     $('.validate-form').on('submit', function () {
    //         var check = true;

    //         for (var i = 0; i < input.length; i++) {
    //             if (validate(input[i]) == false) {
    //                 showValidate(input[i]);
    //                 check = false;
    //             }
    //         }

    //         return check;
    //     });


    //     $('.validate-form .input100').each(function () {
    //         $(this).focus(function () {
    //             hideValidate(this);
    //         });
    //     });

    //     function validate(input) {
    //         if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
    //             if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
    //                 return false;
    //             }
    //         }
    //         else {
    //             if ($(input).val().trim() == '') {
    //                 return false;
    //             }
    //         }
    //     }

    //     function showValidate(input) {
    //         var thisAlert = $(input).parent();

    //         $(thisAlert).addClass('alert-validate');
    //     }

    //     function hideValidate(input) {
    //         var thisAlert = $(input).parent();

    //         $(thisAlert).removeClass('alert-validate');
    //     }



    // })(jQuery);