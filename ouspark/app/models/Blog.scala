package models

import java.util.Date

/**
 * Created by spark.ou on 8/27/2015.
 */
case class Blog( title: String,
//                 description: String,
//                 article: String,
//                 datePublish: Date,
//                 dateRevision: Date,
                 views: Int
                 )

object JsonFormats2 {
  import play.api.libs.json.Json

  implicit val blogFormat = Json.format[Blog]
}