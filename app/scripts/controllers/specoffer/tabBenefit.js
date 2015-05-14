'use strict';

angular
  .module('admissionSystemApp')
  .controller('TabBenefitCtrl', ['$scope', '$modal', '$state', 'BenefitsSvc',
    function ($scope, $modal, $state, BenefitsSvc) {

      //Internal object for rendering data in table
      $scope.everything = {};
      $scope.everything.allInformationArray = [];

      //Ng-model for modalBenefit.html
      $scope.allBenefits = {};
      $scope.allBenefits.benefit = '';

      //Get data from server
      if ($state.is('root.specoffer.new.benefit')) {
        var y = 0;

        //Get data from server
        BenefitsSvc.getBenefits().then(function (data) {
          $scope.benefits = data.benefitsArray;
          $scope.everything.allInformationArray = angular.copy(data.benefitsMainArray);

          for (y; y < $scope.everything.allInformationArray.length; y++) {
            $scope.entireSpecoffer.benefits.push({
                benefitId: $scope.everything.allInformationArray[y].id, note: ''
              });
          }
        });
      }
      else {
        BenefitsSvc.getBenefits().then(function (data) {
          var array1 = angular.copy(data.benefitsArray),
            array2 = angular.copy(data.benefitsMainArray),
            i = 0,
            x = 0;

          $scope.benefits = array1.concat(array2);

          //Render data from server to table
          $scope.$watch('entireSpecoffer.benefits.length', function () {
            $scope.everything.allInformationArray = [];
            for (i; i < $scope.entireSpecoffer.benefits.length; i++) {
              for (x; x < $scope.benefits.length; x++) {
                if ($scope.entireSpecoffer.benefits[i].benefitId === $scope.benefits[x].id) {
                  $scope.everything.allInformationArray.push($scope.benefits[x]);
                  break;
                }
              }
            }
          });
        });
      }

      //Function opens modal window
      $scope.open = function (size) {
        $modal.open({
          templateUrl: '../views/modal/modalBenefit.html',
          scope: $scope,
          controller: function ($scope, $modalInstance) {
            $scope.ok = function () {
              $scope.entireSpecoffer.benefits.push({
                benefitId: $scope.allBenefits.benefit.id, note: ''
              });
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
      $scope.removeRow = function (id) {
        var index = -1,
            i = 0,
            x = 0,
            comArr = $scope.everything.allInformationArray;

        for (i; i < comArr.length; i++) {
          if (comArr[i].id === id) {
            index = i;
            break;
          }
        }
        for (x; x < $scope.entireSpecoffer.benefits.length; x++) {
          if ($scope.entireSpecoffer.benefits[x].benefitId === id) {
            $scope.entireSpecoffer.benefits.splice(x, 1);
            break;
          }
        }
        $scope.everything.allInformationArray.splice(index, 1);
      };

    }
  ]);
