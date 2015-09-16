package controllers

import java.io.File


import org.slf4j.{LoggerFactory, Logger}
import play.api.Play
import play.api.libs.json._
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection

import play.api.libs.concurrent.Execution.Implicits.defaultContext
import reactivemongo.api.Cursor
import scala.concurrent.Future
import scala.io.Source

/**
 * Created by spark.ou on 9/1/2015.
 */
class Blogs extends Controller with MongoController{

  val filePath = s"app/assets/data/"
  def collection: JSONCollection = db.collection[JSONCollection]("blogs")
  private final val logger: Logger = LoggerFactory.getLogger(classOf[Blogs])

  def getListOfBlogs(directoryName: String): Array[String] = {
    import play.api.Play.current
    (Play.getFile(directoryName)).listFiles.filter(_.isFile).map(_.getName.replace(".json",""))
  }

  def findAll1 = Action {

    val files: Array[String] = getListOfBlogs(filePath)
    Ok(Json.obj("title" -> files))
  }

  def findByTitle1(title: String) = Action {
    val lines = try {
      Source.fromFile(filePath + title +".json").mkString
    } catch {
      case e: Exception => ""
    }
    Ok(lines).as("application/json")
  }

  def printToFile(f: java.io.File)(op: java.io.PrintWriter => Unit) {
    val p = new java.io.PrintWriter(f)
    try { op(p) } finally { p.close() }
  }

  def createBlog1 = Action { request =>
    val json = request.body.asJson
    val x = json.get.\("title").toString()
    val title = x.substring(1, x.length - 1)
    printToFile(new File(filePath + title + ".json")) { p =>
      json.foreach(p.print)
    }
    Ok("200")
  }

  import models.Blog
  import models.JsonFormats2._
  def createBlog = Action.async(parse.json) { request =>
    request.body.validate[Blog].map { blog =>
      collection.insert(blog).map { lastError =>
        logger.debug(s"Successfully inserted with LastError: $lastError")
        Created(s"Blog Created")
      }
    }.getOrElse(Future.successful(BadRequest("invalid json")))
  }

  def find(selector: JsObject) = {
    val cursor: Cursor[Blog] = collection.find(selector).sort(Json.obj("datePublish" -> -1)).cursor[Blog]
    val futureBlogList: Future[List[Blog]] = cursor.collect[List]()
    val futrueTitleJsonArray: Future[JsArray] = futureBlogList.map { title =>
      Json.arr(title)
    }
    futrueTitleJsonArray.map { title =>
        Ok(title(0))
    }
  }

  def findAll = Action.async {
    find(Json.obj("active" -> true))
  }
  def findByTitle(title: String) = Action.async {
    find(Json.obj("title" -> title))
  }

}
