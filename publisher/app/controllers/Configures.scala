package controllers

import javax.inject.Inject

import models.BaseConfigure
import org.slf4j.{Logger, LoggerFactory}
import play.api.Play.current
import play.api.mvc.{Action, Controller}
import play.modules.reactivemongo.{MongoController, ReactiveMongoApi, ReactiveMongoComponents}
import reactivemongo.play.json.collection.JSONCollection
import scala.concurrent.ExecutionContext.Implicits.global

import scala.concurrent.Future

/**
 * Created by spark.ou on 4/23/2016.
 */

class Configures @Inject() (val reactiveMongoApi: ReactiveMongoApi) extends Controller with MongoController with ReactiveMongoComponents  {
  private final val logger: Logger = LoggerFactory.getLogger(classOf[BaseConfigure])

  val collection = Configures.collection("configures")
  import models.JsonFormats._
  def createConfigure = Action.async(parse.json) {
    request =>
      request.body.validate[BaseConfigure].map {
        config =>
          collection.insert(config).map{
            lastError =>
              logger.debug(s"Successfully inserted with LastError: $lastError")
              Created(s"Configuration Created")
          }
      }.getOrElse(Future.successful(BadRequest("invalid json")))
  }

}

object Configures {

  lazy val reactiveMongoApi = current.injector.instanceOf[ReactiveMongoApi]

  def collection(name: String): JSONCollection =
    reactiveMongoApi.db.collection[JSONCollection](name)

}