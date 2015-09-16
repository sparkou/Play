
class BlogAdminCtrl

  constructor: (@$log, @$location, @BlogService) ->
    @$log.debug "constructing BlogController"
    @blog = {}
    @menu = [
#      ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
#      ['format-block'],
#      ['font'],
#      ['font-size'],
#      ['font-color', 'hilite-color'],
#      ['remove-format'],
#      ['ordered-list', 'unordered-list', 'outdent', 'indent'],
#      ['left-justify', 'center-justify', 'right-justify'],
#      ['code', 'quote', 'paragraph'],
#      ['link', 'image']
    ]

  createBlog: () ->
    @blog.datePublish = new Date().getTime()
    @blog.description = ""
    @blog.views = 0
    @blog.active = true
    @$log.debug "submit()"
    @BlogService.createBlog(@blog)
    .then(
      (data) =>
        @$log.debug "Promise returned #{data} User"
        @blog = data
        @$location.path("/home")
    ,
      (error) =>
        @$log.error "Unable to create User: #{error}"
    )


blogControllersModule.controller('BlogAdminCtrl', ['$log', '$location','BlogService', BlogAdminCtrl])