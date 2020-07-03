var weatherApp = angular.module('weatherApp', [])
const picture = [
	'Clear',
	'Rain',
	'Haze',
	'Mist',
	'Snow',
	'Drizzle',
	'Thunderstorm',
	'Clouds',
	'err'
]

// mgodapp.config([
// 	'$routeProvider',
// 	// '$locationProvider',
// 	function($routeProvider /*, $locationProvider*/){
// 		// $locationProvider.html5Mode(true)
// 		// route to home
// 		$routeProvider
// 			.when('/home', {
// 				templateUrl : './views/home.html',
// 				controller  : 'godController'
// 			})
// 			// route to list
// 			.when('/contact', {
// 				templateUrl : './views/contact.html',
// 				controller  : 'contactController'
// 			})
// 			.when('/list', {
// 				templateUrl : './views/list.html',
// 				controller  : 'godController'
// 			})
// 			.when('/contact-success', {
// 				templateUrl : './views/contact-success.html'
// 				//controller  : 'godController'
// 			})
// 			.otherwise({
// 				redirectTo : '/home'
// 			})
// 	}
// ])

weatherApp.run(function(){})
weatherApp.controller('WeatherController', [
	'$scope',
	'$http',
	function($scope, $http){
		$scope.ban = 'ban'
		$scope.city = 'chennai'
		$scope.day = 'Sunday'
		$scope.maintemp = '0'
		$scope.maxtemp = '0'
		$scope.mintemp = '0'
		$scope.main = 'Clouds'
		$scope.pressure = '0'
		$scope.humidity = '0'
		$scope.clouds = '0'
		$scope.feellike = '0'
		$scope.desc = 'partially cloudy'
		$scope.wind = '0'
		$scope.lat = '0'
		$scope.long = '0'
		$scope.date = 'May 05'
		$scope.time = '11.01'
		$scope.dt = ''

		$scope.Changeloc = function(){
			$scope.city = $scope.cname
			console.log($scope.city)
			$scope.change()
			$scope.cname = ''
		}

		$scope.change = function(){
			$http
				.get(
					'https://api.openweathermap.org/data/2.5/weather?q=' +
						$scope.city +
						'&units=metric&appid=8e9951a474e2bb4235b1768ea4355398'
				)
				.then(
					function(dat){
						$scope.weather = dat.data
						console.log($scope.weather)
						$scope.day = 'Sunday'
						$scope.maintemp =
							$scope.weather.main.temp
						$scope.maxtemp =
							$scope.weather.main.temp_max
						$scope.mintemp =
							$scope.weather.main.temp_min
						$scope.main =
							$scope.weather.weather[0].main
						$scope.pressure =
							$scope.weather.main.pressure
						$scope.humidity =
							$scope.weather.main.humidity
						$scope.clouds =
							$scope.weather.clouds.all
						$scope.feellike =
							$scope.weather.main.feels_like
						$scope.desc =
							$scope.weather.weather[0].description
						$scope.wind =
							$scope.weather.wind.speed
						$scope.lat =
							$scope.weather.coord.lat
						$scope.long =
							$scope.weather.coord.lon
						$scope.dt = $scope.weather.dt
						$scope.date = new Date(
							$scope.dt * 1000
						)
						console.log($scope.data)
						const back = document.querySelector(
							'.background'
						)
						const icon = document.querySelector(
							'.icon'
						)
						icon.src =
							'./img/icons/' +
							$scope.main +
							'-01.svg'
						back.classList.add($scope.main)
						picture.forEach(function(p){
							if (p != $scope.main) {
								back.classList.remove(p)
							}
						})
						const card = document.querySelector(
							'.cardBox'
						)
						const search = document.querySelector(
							'.search'
						)
						card.classList.remove('none')
						search.classList.remove('top')
					},
					function(){
						const back = document.querySelector(
							'.background'
						)
						console.log('wrong is right')
						const card = document.querySelector(
							'.cardBox'
						)
						const search = document.querySelector(
							'.search'
						)
						search.classList.add('top')
						card.classList.add('none')
						$scope.main = 'err'
						back.classList.add($scope.main)
						picture.forEach(function(p){
							if (p != $scope.main) {
								back.classList.remove(p)
							}
						})
					}
				)
		}
		// $scope.change()
	}
])
