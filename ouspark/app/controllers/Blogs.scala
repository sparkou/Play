package controllers

import play.api.Play
import play.api.mvc._
import play.api.libs.json._
/**
 * Created by spark.ou on 9/1/2015.
 */
class Blogs extends Controller{

  def filePath = s"/app/assets/data/"

  def getListOfBlogs(directoryName: String): Array[String] = {
    import play.api.Play.current
    (Play.getFile(directoryName)).listFiles.filter(_.isFile).map(_.getName.replace(".json",""))
  }

  def findAll = Action {

    val files: Array[String] = getListOfBlogs(filePath)
//    val source = scala.io.Source.fromFile("app/assets/data/data.json")
//    val lines = try source.mkString finally source.close()
    Ok(Json.obj("title" -> files))
  }

  def findByTitle(title: String) = Action {
    val source = scala.io.Source.fromFile(filePath + title + ".json")
    val lines = try source.mkString finally source.close()
    Ok(lines).as("application/json")
  }
}
