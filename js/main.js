(() => {
  'use strict';
  // 要素取得
  const inputElement = document.getElementById('json-input');
  const formatButton = document.getElementById('format-button');
  const outputElement = document.getElementById('json-output');
  const copyButton = document.getElementById('copy-button');

  // Formatボタンの活性・非活性
  inputElement.addEventListener('input', () => {
    if (inputElement.value.trim() === '') {
      //
      formatButton.disabled = true;
    } else {
      formatButton.disabled = false;
    }
  });
  

})();
