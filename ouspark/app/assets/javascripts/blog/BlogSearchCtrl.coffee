
class BlogSearchCtrl

  constructor: (@$log, @$location, @$stateParams, @BlogService) ->
    @$log.debug "constructing BlogController"
    @blog = []
    @getBlog()

  getBlog: () ->
    @$log.debug "getBlog()"
    @BlogService.findBlog(@$stateParams.title)
    .then(
      (data) =>
        @$log.debug "Promise returned #{data.length} Users"
        @blog = data
    ,
      (error) =>
        @$log.error "Unable to get Users: #{error}"
    )

blogControllersModule.controller('BlogSearchCtrl', ['$log', '$location', '$stateParams', 'BlogService', BlogSearchCtrl])