angular.module('admissionSystemApp')


  .controller('ModalBenefitCtrl', function ($scope, $modal, Benefits) {
    $scope.entireSpecoffer.benefites = [{benefitId:11, note:''}, {benefitId:23, note:''}, {benefitId:12, note:''}];

    //Internal object for rendering data in table
    $scope.everything = {};
    $scope.everything.allInformationArray = [];

    //Ng-model for modalBenefit.html
    $scope.allBenefits = {};
    $scope.allBenefits.benefit = '';

    //Get data from server
    Benefits.getBenefits().then(function (data) {
      $scope.benefits = data.subjectsArray;
      $scope.everything.allInformationArray = data.subjectsMainArray;

      //Render data from server to table
      for (var i = 0; i < $scope.entireSpecoffer.benefites.length; i++) {
        for (var x = 0; x < $scope.benefits.length; x++) {
          if ($scope.entireSpecoffer.benefites[i].benefitId === $scope.benefits[x].id) {
            $scope.everything.allInformationArray.push($scope.benefits[x]);
            break;
          }
        }
      }

    });

    //Function opens modal window
    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: '../views/modal/modalBenefit.html',
        scope: $scope,
        controller: function ($scope, $modalInstance, Benefits) {

          $scope.ok = function () {
            $scope.everything.allInformationArray.push({id: $scope.allBenefits.benefit.id, name: $scope.allBenefits.benefit.name, quantity: $scope.quantity});
            $scope.entireSpecoffer.benefites.push({benefitId: $scope.allBenefits.benefit.id, note:''});
            //$scope.everything.allInformationArray.splice(selected.index, 1);
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

        },
        size: size
      });
    };

    //Remove data from table function
    $scope.removeRow = function(id){
      var index = -1;
      var comArr = eval( $scope.everything.allInformationArray );
      for( var i = 0; i < comArr.length; i++ ) {
        if( comArr[i].id === id ) {
          index = i;
          break;
        }
      }
      if( index === -1 ) {
        alert( "Something gone wrong" );
      }

      for( var x = 0; x < $scope.entireSpecoffer.benefites.length; x++ ) {
        if( $scope.entireSpecoffer.benefites[x].benefitId === id ) {
          $scope.entireSpecoffer.benefites.splice( x, 1 );
          break;
        }
      }

      $scope.everything.allInformationArray.splice( index, 1 );
    };

  });

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.


