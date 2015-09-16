import java.io.File
import play.api.libs.json._
import scala.collection.mutable.ArrayBuffer
import scala.io.Source

def getListOfSubDirectories(directoryName: String): Array[String] = {
  (new File(directoryName)).listFiles.filter(_.isDirectory).map(_.getName)
}
def filePath = "E:/Play/ouspark/app/assets/"
//val directory = getListOfSubDirectories(filePath)
//def getListOfFiles(directoryName: String): Array[String] = {
//  (new File(directoryName)).listFiles.filter(_.isFile).map(_.getName.replace(".json",""))
//}
//val file = getListOfFiles("E:/Play/ouspark/app/assets/data")
//file.mkString
//file.map("title"+":"+_)
//Json.toJson(file)


def getValue(str : String): String = {
  str.substring(1, str.length -1)
}
val str = "abcdefg"
getValue(str)



























//val lsit = Json.obj("title" -> file)

//val source = scala.io.Source.fromFile(filePath + "data/data.json")
//val lines = try source.mkString finally source.close()
//new File(filePath + "data/data.json").toPath
//new File(filePath + "data/data.json").toURI.relativize(new File(filePath + "data/data.json").toURI).getPath
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


//def printToFile(f: java.io.File)(op: java.io.PrintWriter => Unit) {
//  val p = new java.io.PrintWriter(f)
//  try { op(p) } finally { p.close() }
//}
//val json = Json.obj("title" -> "name")
//val title = json.\("title").toString()
//val x = title.substring(1, title.length -1)
//val s = "sssss"
//x + s + ".json"
//val lines = try source.mkString finally source.close()
//Json.parse(lines).\("title")


