
class BlogService

  @headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
  @defaultConfig = { headers: @headers }

  constructor: (@$log, @$http, @$q) ->
    @$log.debug "constructing UserService"


  listBlogs: () ->
    @$log.debug "listBlogs()"
    deferred = @$q.defer()
    @$http.get("/blogs")
    .success((data, status, headers) =>
      @$log.info("Successfully listed blogs - status #{status}")
      deferred.resolve(data)
    )
    .error((data, status, headers) =>
      @$log.error("Failed to list Blogs - status #{status}")
      deferred.reject(data)
    )
    deferred.promise

  findBlog: (title) ->
      @$log.debug "find Blog #{angular.toJson(blogs, true)}"
      deferred = @$q.defer()

      @$http.post("/content/#{title}")
      .success((data, status, headers) =>
        @$log.info("Successfully find Blog - status #{status}")
        deferred.resolve(data)
      )
      .error((data, status, header) =>
        @$log.error("Failed to find Blog - status #{status}")
        deferred.reject(data)
      )
      deferred.promise



blogServicesModule.service('BlogService', ['$log', '$http', '$q', BlogService])

