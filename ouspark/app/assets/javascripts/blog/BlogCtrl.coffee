
class BlogCtrl

    constructor: (@$log, @BlogService) ->
        @$log.debug "constructing BlogController"
        @blogs = {}
        @getAllBlogs()

    getAllBlogs: () ->
        @$log.debug "getAllBlogs()"

        @BlogService.listBlogs()
        .then(
            (data) =>
              @$log.debug "Promise returned #{data.length} Users"
              @blogs = data
            ,
            (error) =>
              @$log.error "Unable to get Users: #{error}"
            )

blogControllersModule.controller('BlogCtrl', ['$log', 'BlogService', BlogCtrl])