import java.io.File
import play.api.libs.json._
import scala.collection.mutable.ArrayBuffer
def getListOfSubDirectories(directoryName: String): Array[String] = {
  (new File(directoryName)).listFiles.filter(_.isDirectory).map(_.getName)
}
def filePath = "E:/Play/ouspark/app/assets/"
val directory = getListOfSubDirectories(filePath)
def getListOfFiles(directoryName: String): Array[String] = {
  (new File(directoryName)).listFiles.filter(_.isFile).map(_.getName.replace(".json",""))
}
val file = getListOfFiles("E:/Play/ouspark/app/assets/data")
file.mkString
file.map("title"+":"+_)
Json.toJson(file)



val lsit = Json.obj("title" -> file)



//val f = directory.map(filePath + _)
//f.foreach(getListOfFiles(_))
//val list = f.toList
//list.foreach(println)
//f.foreach(println)
//def getfiles(directory: String): Array[String] = {
//  (new File(directory)).listFiles.map { file =>
//    if(file.isFile)
//      file.getName
//    else
//      getfiles(directory+file.getName)
//  }
//}

//(new File(filePath)).listFiles.map { file =>
//  if(file.isDirectory)
//
//  file.getName
//}
//def recursiveListFiles(f: File): Array[File] = {
//  val these = f.listFiles
//  these ++ these.filter(_.isDirectory).flatMap(recursiveListFiles)
//}
//
//val file = new File(filePath+"data")
//val files = recursiveListFiles(files)




