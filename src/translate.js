var async = require('async');
var translate = require('google-translate')(process.env.TRANSLATE_KEY);

const LANGUAGES = ['en', 'it', 'ja','la','mk', 'fa', 'ro'];

var getLanguages = function(callback){
  var validLanguage = {};
  for (var index in LANGUAGES) {
    validLanguage[LANGUAGES[index]] = true;
  }
  translate.getSupportedLanguages('en', function(err, languageCodes) {
    var finalResult = {};
    for(var i in languageCodes){
      var shortCode = languageCodes[i]["language"];
      if (validLanguage[shortCode]) {
        finalResult[shortCode] = languageCodes[i]["name"];
      }
    }
    callback(err, finalResult);
  });
};

var translateMessage = function(msg, callback){
  async.map(LANGUAGES, function(language, callback){

    translate.translate(msg, language, function(err, translation) {
      if (translation === undefined) {
        callback(null, {language: language, message: msg});
      } else {
        // console.log('translated message: ' + translation.translatedText);
        callback(null, {language: language, message: translation.translatedText});
      }
    });
  }, function(err, results) {
    var finalResult = {};
    for(var i in results){
      finalResult[results[i]["language"]]= results[i]["message"];
    }
    callback(err, finalResult);
  });

}

module.exports = {
  getLanguages: getLanguages,
  translateMessage: translateMessage
};
