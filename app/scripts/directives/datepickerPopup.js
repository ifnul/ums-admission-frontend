/**
 * Created by nikolay on 05.07.15.
 */

/**
 * this directive is rewriting a native datepicker directive.
 * code taken from here: http://stackoverflow.com/questions/26634301/bootstrap-datepicker-format-not-working-on-initialization
 */
angular.module('admissionSystemApp')
  .directive('datepickerPopup', function (dateFilter, datepickerPopupConfig) {
    return {
      restrict: 'A',
      priority: 1,
      require: 'ngModel',
      link: function (scope, element, attr, ngModel) {
        var dateFormat = attr.datepickerPopup || datepickerPopupConfig.datepickerPopup;
        ngModel.$formatters.push(function (value) {
          return dateFilter(value, dateFormat);
        });
      }
    };
  });
