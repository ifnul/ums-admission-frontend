'use strict';

angular.module('admissionSystemApp')
  .controller('TabBenefitsCtrlEnrolment', ['$scope', '$location', 'SpecoffersService', 'BenefitsSvc',
    function ($scope, $location, SpecoffersService, BenefitsSvc) {
      $scope.obj = {};
      $scope.obj.selectedBenefit = [];

      SpecoffersService.getEntireSpecoffer($scope.entireEnrolment.enrolment.specOfferId).then(function (specoffer) {

        $scope.benefitsIDs = angular.copy (specoffer.benefits);
        console.log ($scope.benefitsIDs);

        BenefitsSvc.getBenefits().then(function (data) {
          var array1 = angular.copy(data.benefitsArray),
              array2 = angular.copy(data.benefitsMainArray),
              x = 0,
              y;

          $scope.benefitsName = array1.concat(array2);
          $scope.renderSelectArray = [];

          for (x; x < $scope.benefitsIDs.length; x++) {
            y = 0;
            for (y; y < $scope.benefitsName.length; y++) {
              if ($scope.benefitsIDs[x].benefitId === $scope.benefitsName[y].id) {
                $scope.renderSelectArray.push($scope.benefitsName[y]);
                break;
              }
            }
          }

          $scope.$watch ('entireEnrolment.benefits.length', function () {
            var xx = 0,
                yy;

            $scope.renderTableArray = [];

            for (xx; xx < $scope.entireEnrolment.benefits.length; xx++) {
              yy = 0;
              for (yy; yy < $scope.benefitsName.length; yy++) {
                if ($scope.entireEnrolment.benefits[xx].benefitId === $scope.benefitsName[yy].id) {
                  $scope.renderTableArray.push($scope.benefitsName[yy]);
                  break;
                }
              }
            }
          });
        });
      });

      $scope.insert = function () {
        $scope.entireEnrolment.benefits.push ({
          benefitId : $scope.obj.selectedBenefit.id, note: ''
        });
        $scope.obj.selectedBenefit = undefined;
      };

      $scope.removeRow = function (id) {
        var index = -1,
          comArr = $scope.renderTableArray,
          i = 0,
          x = 0;

        for (i; i < comArr.length; i++) {
          if (comArr[i].id === id) {
            index = i;
            break;
          }
        }

        for (x; x < $scope.entireEnrolment.benefits.length; x++) {
          if ($scope.entireEnrolment.benefits[x].benefitId === id) {
            $scope.entireEnrolment.benefits.splice(x, 1);
            break;
          }
        }

        $scope.renderTableArray.splice(index, 1);
      };
    }
  ]);
