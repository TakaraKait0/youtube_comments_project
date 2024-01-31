const DOCUMENT_URL = 'https://docs.google.com/document';
var previousComment = "";

function doGet() {
  var template = 'test';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

function createReplyMessage(receivedMessage) {
  return receivedMessage
}

function writeToGoogleDocs(name, comment, isAnonymous) {
  // 保存処理の実装
  let date = new Date();
  var doc = DocumentApp.openByUrl(DOCUMENT_URL);
  var body = doc.getBody();
  if (isAnonymous) {
    body.appendParagraph("＜質問＞" + name + " : " + comment).setForegroundColor('#FF0000');
  } else {
    body.appendParagraph(name + " : " + comment).setForegroundColor('#000000');
  }
}

function getLatestComment() {
  // 保存された最新のコメントを取得する
  const latestComment = retrieveLatestComment();
  if (latestComment !== previousComment){
    previousComment = latestComment;
    return latestComment;
  }
}

// 最新コメントの取得処理を実装
function retrieveLatestComment() {
  var doc = DocumentApp.openByUrl(DOCUMENT_URL);
  var paragraphs = doc.getBody().getParagraphs();
  var latestComment = paragraphs[paragraphs.length - 1].getText();
  return latestComment
}