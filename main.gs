//used for translations of google documents via DeepL, after adding the script to the document a new menu "translation" will appear in the top menu
//You need to add API key for DeepL, input and output language.


function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Translation')
      .addItem('Translate', 'translate')
      .addToUi();
};

function translate() {
  const apiKey = 'DeepL_API_Key';
  const targetLang = 'Target_Laguange_Here';
  const sourceLang = 'Source_Laguange_Here';

  var selection = DocumentApp.getActiveDocument().getSelection();

  if (!selection) {
    DocumentApp.getUi().alert('Please select text for translation.');
    return;
  }

  var elements = selection.getSelectedElements();

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i].getElement();
      
    if (element.editAsText) {
      var text = element.asText().getText();
      Logger.log(text);

      var encodedText = encodeURIComponent(text);

      var url = "https://api-free.deepl.com/v2/translate" +
                "?auth_key=" + apiKey +
                "&text=" + encodedText +
                "&target_lang=" + targetLang +
                "&source_lang=" + sourceLang;

      var translatedResponse = UrlFetchApp.fetch(url);
      var json = translatedResponse.getContentText();
      var data = JSON.parse(json);
      var translated = data.translations[0].text;

      element.asText().setText(translated);
    }
  }
}
