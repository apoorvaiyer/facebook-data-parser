var app = angular.module('fbDataApp', ['tc.chartjs']);

app.controller('fbDataCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
	$http.get('../../data.json').success(function(response) {

		$scope.items = response.userMessages;
		console.log(response)

		var messageMoodArray = [];
    var bestFriends = [];

		for (var userName in $scope.items) {
			var user = $scope.items[userName];

			if (user.hasOwnProperty('average')) {
        user.average = Math.round(user.average * 100) / 100;
				messageMoodArray.push([userName, user.average]);
			}

      if (user.hasOwnProperty('messages')) {
        var messageTotal = user.messages.length;
        bestFriends.push([userName, messageTotal])
      }
		}

    bestFriends.sort(function(a, b) {return a[1] - b[1]});
		messageMoodArray.sort(function(a, b) {return a[1] - b[1]});

		$scope.happiestFriends = messageMoodArray.slice(0, 20);
    $scope.bestFriends = bestFriends.slice(bestFriends.length - 20,bestFriends.length).reverse();
		$scope.saddestFriends = messageMoodArray.slice(messageMoodArray.length - 20, messageMoodArray.length).reverse();

		$scope.test = function(year) {
			getMessages(year);
		}

		$scope.data = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
			{
				label: '',
				fillColor: 'rgba(151,187,205,0.2)',
				strokeColor: 'rgba(151,187,205,1)',
				pointColor: 'rgba(151,187,205,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(151,187,205,1)',
				data: [28, 48, 40, 19, 86, 27, 90]
			}
			]
		};
        // Chart.js Options
        $scope.options =  {

      // Sets the chart to be responsive
      responsive: true,

      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - Whether the line is curved between points
      bezierCurve : true,

      //Number - Tension of the bezier curve between points
      bezierCurveTension : 0.4,

      //Boolean - Whether to show a dot for each point
      pointDot : true,

      //Number - Radius of each point dot in pixels
      pointDotRadius : 4,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,

      // Function - on animation progress
      onAnimationProgress: function(){},

      // Function - on animation complete
      onAnimationComplete: function(){},

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };





    var getMessages = function(year) {
    	year = parseInt(year);
    	console.log(response[year])
    }

  }).error(function(err) {
  	console.log(err)
  })
}]);


