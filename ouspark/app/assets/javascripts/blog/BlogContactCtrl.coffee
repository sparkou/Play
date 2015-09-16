
class BlogContactCtrl

  constructor: (@$log, @$location, @BlogService) ->
    @$log.debug "constructing BlogContactController"
    @mail = {}
    @menu = []

  sendEmail: () ->
    @$log.debug "send email"
    @BlogService.sendEmail(@mail)
    .then(
      (data) =>
        @$log.debug "Promise returned #{data} User"
        @$location.path("/home")
    ,
      (error) =>
        @$log.error "Unable to create User: #{error}"
    )


blogControllersModule.controller('BlogContactCtrl', ['$log', '$location','BlogService', BlogContactCtrl])