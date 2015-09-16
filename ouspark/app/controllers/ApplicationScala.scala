package controllers

import java.io.File

import play.api.libs.mailer._
import org.apache.commons.mail.EmailAttachment
import play.api.mvc.{Action, Controller}
import play.api.Play.current

object ApplicationScala  extends Controller {

  private def getValue(str : String): String = {
    str.substring(1, str.length -1)
  }

  def send = Action { request =>
    val json = request.body.asJson.get
    val title = getValue(json.\("title").toString)
    val from = getValue(json.\("from").toString)
    val mail = getValue(json.\("mail").toString)
    val header = "This is the Email from : " + from
    val email = Email(
      title,
      "SYSTEM <463997636@qq.com>",
      Seq("TO <spark.ou@missionsky.com>"),
//      attachments = Seq(
//        AttachmentFile("favicon.png", new File(current.classloader.getResource("public/images/favicon.png").getPath)),
//        AttachmentData("data.txt", "data".getBytes, "text/plain", Some("Simple data"), Some(EmailAttachment.INLINE))
//      ),
//      bodyText = Some("This is the Email from : " + from + "\n\n" + mail.replace("\n", "(char)10")),
      bodyHtml = Some("<p>"+header+"</p><br/>"+mail)
//      bodyHtml = Some("<html><body><p>"+mail+"</p></body></html>")
    )
    val id = MailerPlugin.send(email)
    Ok(s"Email $id sent!")
  }
}