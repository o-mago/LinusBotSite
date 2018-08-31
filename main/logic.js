// var db;
// var dataRef;
var database;
var contAulas = 0;
var choices;

function initFirebase() {
      // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB9DJkL_ZyUaaFyr8zzdAVOMiQQWt5_YR0",
        authDomain: "linusbot-6f6a5.firebaseapp.com",
        databaseURL: "https://linusbot-6f6a5.firebaseio.com",
        projectId: "linusbot-6f6a5",
        storageBucket: "linusbot-6f6a5.appspot.com",
        messagingSenderId: "814716673788"
    };
    firebase.initializeApp(config);
    // const firestore = firebase.firestore();
    // const settings = {/* your settings... */ timestampsInSnapshots: true};
    // window.express = require('express')
    // window.cors = require('cors')({origin: true});
    // var app = express()
    // app.use(cors())
    // firestore.settings(settings);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
            window.location.href = "../index.html"
        }
      });
    database = firebase.database();
    // db = firestore;

    // dataRef = db.collection('datas').doc('9kBbmdP4tvamSujk4PxV');

    return database.ref('datas').once('value').then(function(snapshot) {
        document.getElementById('inscri').value = snapshot.child('inscricoes').val();
        document.getElementById('compet').value = snapshot.child('competicao').val();
        document.getElementById('link').value = snapshot.child('link').val();
        // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      });
      
    // return database.ref('aulas').once('value', function(snapshot) {
    //     snapshot.forEach(function(snapChild) {
    //             document.getElementById('titulo'+contAulas).value = snapChild.child('titulo').val();
    //             document.getElementById('data'+contAulas).value = snapChild.child('data').val();
    //             document.getElementById('local'+contAulas).value = snapChild.child('local').val();
    //             document.getElementById('professor'+contAulas).value = snapChild.child('professor').val();
    //             document.getElementById('descricao'+contAulas).value = snapChild.child('descricao').val();
    //             contAulas++;
    //             $scope.addNewChoice();
    //         });
    //     });
        
        // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

    // db.collection("datas").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         document.getElementById('inscri').value = doc.get("inscricoes");
    //         document.getElementById('compet').value = doc.get("competicao");
    //         // console.log(`${doc.id} => ${doc.get("competicao")}`);
    //     });
    // });
}

function disconnect() {
    firebase.auth().signOut().then(function() {
        window.location.href = "../index.html"
      }, function(error) {
        // An error happened.
      });
}

function validateForm() {
    var inscri = document.forms["myForm"]["inscri"].value;
    var compet = document.forms["myForm"]["compet"].value;
    var link = document.forms["myForm"]["link"].value;
    if (inscri == "" || compet == "") {
        alert("Todos os campos devem ser preenchidos");
        return false;
    } else {
        var j;
        for(j=1; j<=choices.length; j++) {
            if(document.getElementById('titulo'+j).value == "" || document.getElementById('data'+j).value == "" ||
            document.getElementById('local'+j).value == "" || document.getElementById('professor'+j).value == "" ||
            document.getElementById('descricao'+j).value == "" || document.getElementById('arquivo'+j).value == "") {
                alert("Todos os campos devem ser preenchidos");
                return false;
            }
        }
        // const cors = require('cors')({origin: true});
        // var setWithMerge = dataRef.set({
        //     inscricoes: inscri,
        //     competicao: compet
        // }, { merge: true });
        database.ref('datas').update({ inscricoes: inscri});
        database.ref('datas').update({ competicao: compet});
        database.ref('datas').update({ link: link});
        var i;
        for(i = 1; i<= choices.length; i++) {
            database.ref('aulas').child('Aula '+i).update({titulo: document.getElementById('titulo'+i).value});
            database.ref('aulas').child('Aula '+i).update({data: document.getElementById('data'+i).value});
            database.ref('aulas').child('Aula '+i).update({local: document.getElementById('local'+i).value});
            database.ref('aulas').child('Aula '+i).update({professor: document.getElementById('professor'+i).value});
            database.ref('aulas').child('Aula '+i).update({descricao: document.getElementById('descricao'+i).value});
            database.ref('aulas').child('Aula '+i).update({link: document.getElementById('arquivo'+i).value});
        }
        alert("Atualização feita com sucesso");
        // var setWithMerge = dataRef.update({
        //     inscricoes: inscri,
        //     competicao: compet
        // });
    }
}

var app = angular.module("dynamicFieldsPlugin", []);

app.controller("dynamicFields", ['$scope', function($scope) {

$scope.choices = [];
initFirebase();
database.ref('aulas').once('value', function(snapshot) {
    snapshot.forEach(function(snapChild) {
            contAulas++;
            $scope.addNewChoice();
            $scope.$apply();
            document.getElementById('titulo'+contAulas).value = snapChild.child('titulo').val();
            document.getElementById('data'+contAulas).value = snapChild.child('data').val();
            document.getElementById('local'+contAulas).value = snapChild.child('local').val();
            document.getElementById('professor'+contAulas).value = snapChild.child('professor').val();
            document.getElementById('descricao'+contAulas).value = snapChild.child('descricao').val();
            document.getElementById('arquivo'+contAulas).value = snapChild.child('link').val();
        });
        choices = $scope.choices;
    });

$scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id' : ''+newItemNo, 'name' : 'Aula '+ newItemNo});
};

$scope.removeNewChoice = function() {
    var newItemNo = $scope.choices.length-1;
    database.ref('aulas').child('Aula '+choices.length).remove();
    if (newItemNo !== -1) {
    $scope.choices.pop();
    }
};

$scope.showAddChoice = function(choice) {
    return choice.id === $scope.choices[$scope.choices.length-1].id;
};

}]);

// module.exports = {
//     initFirebase: initFirebase,
//     validateForm: validateForm,
//   };