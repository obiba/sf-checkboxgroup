angular.module('sfCheckboxgroup', ['schemaForm', 'sfCheckboxgroupTemplates'])
  .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider) {
      schemaFormDecoratorsProvider.defineAddOn(
          'bootstrapDecorator',
          'checkboxgroup',
          'src/templates/checkboxgroup-template.html',
          sfBuilderProvider.stdBuilders
      );
    }])

	.controller('schemaFormCheckboxgroupController', ['$scope', function($scope) {
		var keys = $scope.form.items.map(function (val) { return val.key[0]; });
    var min = $scope.form.minChecked ? parseInt($scope.form.minChecked) : 0;

    var validationMessage = $scope.$parent.form.validationMessage;
    $scope.showMessage = false;
    if (validationMessage && validationMessage.minimumChecked) {
      $scope.message = validationMessage.minimumChecked;
    } else {
      $scope.message = 'At least ' + min + ' selection(s) expected.';
    }

    var models = [];

    if ($scope.model) {
      $scope.$on('schemaFormValidate', function () {
        models = keys.map(function (k) {
          return $scope.model[k];
        });

        var enough = models.filter(function (e) { return e; }).length >= min;
        if (enough) {
          $scope.$broadcast('schemaForm.error', 'minimumChecked', true);
          $scope.showMessage = false;
        } else {
          $scope.$broadcast('schemaForm.error', 'minimumChecked', false);
          $scope.showMessage = true;
        }
      });
    }
	}]);