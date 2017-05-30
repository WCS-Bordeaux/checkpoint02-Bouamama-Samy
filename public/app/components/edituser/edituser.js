'use strict'

angular.module('wildNoteApp')

.component('edituser', {
    templateUrl: '/app/components/edituser/edituser.html',
    controller: EditUser
})

function EditUser($stateParams) {
    // Controller
    let id = $stateParams.id;
    console.log(id);

    $resource("/users/", id
}
