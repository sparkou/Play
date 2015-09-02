
class BlogSearchCtrl

  constructor: (@$log, @$location, @$routeParams, @BlogService) ->
    @$log.debug "constructing BlogController"
    @blog = []
    @getBlog()


  getBlog: () ->
    @$log.debug "getBlog()"

    @BlogService.findBlog("data", blog)
    .then(
      (data) =>
        alert("I am in")
        @$log.debug "Promise returned #{data.length} Users"
        @blogs = data
    ,
      (error) =>
        @$log.error "Unable to get Users: #{error}"
    )

blogControllersModule.controller('BlogSearchCtrl', ['$log', 'BlogService', BlogSearchCtrl])