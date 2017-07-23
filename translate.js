var async = require('async');
var translate = require('google-translate')(process.env.TRANSLATE_KEY);

const LANGUAGES = ['en','fa', 'es'];

var getLanguages = function(callback){
  translate.getSupportedLanguages('en', function(err, languageCodes) {
    var finalResult = {};
    for(var i in languageCodes){
      finalResult[languageCodes[i]["language"]]= languageCodes[i]["name"];
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
