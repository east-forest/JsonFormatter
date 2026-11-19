(() => {
  'use strict';
  // 要素取得
  const inputElement = document.getElementById('json-input');
  const formatButton = document.getElementById('format-button');
  const outputElement = document.getElementById('json-output');
  const messageElement = document.getElementById('message');
  const copyButton = document.getElementById('copy-button');

  // Formatボタンの活性・非活性
  inputElement.addEventListener('input', () => {
      formatButton.disabled = inputElement.value.trim() === '';
  });

  // メッセージ生成関数
  function createMessage(isSuccess) {
    const message = isSuccess ? 'JSONの検証・整形に成功しました。' : 'JSONの検証・整形に失敗しました。';

    //メモ：removeは複数指定に対応しており、存在しないクラス名を指定してもエラーにならない。
    messageElement.classList.remove('message--success', 'message--error');
    messageElement.classList.add(isSuccess ? 'message--success' : 'message--error');
    messageElement.textContent = message;
  }

  // Formatボタン押下時（JSON検証・整形）
  formatButton.addEventListener('click', () => {
    try {
      const inputValue = inputElement.value;

      // JSON検証
      const parsedJson = JSON.parse(inputValue);

      // JSON整形
      const formattedJson = JSON.stringify(parsedJson, null, 2);

      // 整形結果を表示
      outputElement.value = formattedJson;

      // 成功メッセージ作成
      createMessage(true);

    } catch (error) {
      // outputの内容クリア
      outputElement.value = '';

      // 異常メッセージ作成
      createMessage(false);
    }
  });

})();
