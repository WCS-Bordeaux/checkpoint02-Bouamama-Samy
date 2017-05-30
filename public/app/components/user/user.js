'use strict'

angular.module('wildNoteApp')

   .component('user', {
      templateUrl: '/app/components/user/user.html',
      controller: User,
      bindings: {
         user: '<'
      }
   })

function User() {
   // Controller
   var self = this;
}
