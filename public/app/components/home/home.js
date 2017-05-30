'use strict'

angular.module('wildNoteApp')

   .component('home', {
      templateUrl: '/app/components/home/home.html',
      controller: Home
   })

function Home(Users) {
   var self = this;

   Users.get().$promise.then(function (data) {
      if (data && data.users && typeof data.users === 'object' && data.users[0]) {
         self.users = data.users;
      } else {
         throw 'Bad response from server'
      }
   });
}