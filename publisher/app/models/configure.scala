package models

/**
  * Created by spark.ou on 4/23/2016.
 */
case class BaseConfigure( tableName: String, pks: List[String])

object JsonFormats {
  import play.api.libs.json.Json
  implicit val baseConfigureJsonFormat = Json.format[BaseConfigure]
}
