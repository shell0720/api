myApp.controller("AddController", ["$scope", "$http", "MovieService", function($scope, $http, MovieService){
    $scope.movies = {};
    $scope.data = [];

    $scope.search = function(data){
      console.log("We are going to go look for ", data);

      $http.get("http://api.nytimes.com/svc/books/v3/reviews.json?author="+ data.name +"&api-key="
    ).then(function(response){
          console.log(response.data);
          $scope.data = [];
          $scope.data.push(response.data);
      });
    };

    $scope.addBook = function(data){
        console.log(data);

        var postObject = {};
        postObject.copyright = data.copyright;
        postObject.book_title = data.book_title;


        MovieService.postMovie(postObject);
    };
}]);

myApp.controller("ShowController", ["$scope", "MovieService", function($scope, MovieService){
    MovieService.getMovies();

    $scope.data = MovieService.data;
}]);
