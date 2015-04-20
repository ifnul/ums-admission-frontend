'use strict';

angular.module('admissionSystemApp')


  .controller('TabBenefitCtrl',  ['$scope', '$modal', 'BenefitsSvc', function ($scope, $modal, BenefitsSvc) {

    $scope.entireSpecoffer.benefits = [];

    //Internal object for rendering data in table
    $scope.everything = {};
    $scope.everything.allInformationArray = [];

    //Ng-model for modalBenefit.html
    $scope.allBenefits = {};
    $scope.allBenefits.benefit = '';

    //Get data from server
    BenefitsSvc.getBenefits().then(function (data) {
      $scope.benefits = data.subjectsArray;
      $scope.everything.allInformationArray = data.subjectsMainArray;

      for (var y = 0; y < $scope.everything.allInformationArray.length; y++) {
        $scope.entireSpecoffer.benefits.push({benefitId: $scope.everything.allInformationArray[y].id, note: ''});
      }

      //Render data from server to table
      for (var i = 0; i < $scope.entireSpecoffer.benefits.length; i++) {
        for (var x = 0; x < $scope.benefits.length; x++) {
          if ($scope.entireSpecoffer.benefits[i].benefitId === $scope.benefits[x].id) {
            $scope.everything.allInformationArray.push($scope.benefits[x]);
            break;
          }
        }
      }

    });

    //Function opens modal window
    $scope.open = function (size) {

      $modal.open({
        templateUrl: '../views/modal/modalBenefit.html',
        scope: $scope,
        controller: function ($scope, $modalInstance) {

          $scope.ok = function () {
            $scope.everything.allInformationArray.push({id: $scope.allBenefits.benefit.id, name: $scope.allBenefits.benefit.name, quantity: $scope.quantity});
            $scope.entireSpecoffer.benefits.push({benefitId: $scope.allBenefits.benefit.id, note:''});
            $scope.allBenefits.benefit = undefined;
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $scope.allBenefits.benefit = undefined;
            $modalInstance.dismiss('cancel');
          };

        },
        size: size
      });
    };

    //Remove data from table function
    $scope.removeRow = function(id){
      var index = -1;
      var comArr = $scope.everything.allInformationArray;
      for( var i = 0; i < comArr.length; i++ ) {
        if( comArr[i].id === id ) {
          index = i;
          break;
        }
      }

      for( var x = 0; x < $scope.entireSpecoffer.benefits.length; x++ ) {
        if( $scope.entireSpecoffer.benefits[x].benefitId === id ) {
          $scope.entireSpecoffer.benefits.splice( x, 1 );
          break;
        }
      }

      $scope.everything.allInformationArray.splice( index, 1 );
    };

  }]);


