(() => {
  'use strict';
  // 要素取得
  const inputElement = document.getElementById('json-input');
  const formatButton = document.getElementById('format-button');
  const outputElement = document.getElementById('json-output');
  const messageElement = document.getElementById('message');
  const copyButton = document.getElementById('copy-button');
  const clearButton = document.getElementById('clear-button');

  // Formatボタンの活性・非活性
  inputElement.addEventListener('input', () => {
      formatButton.disabled = inputElement.value.trim() === '';
  });

  // メッセージ生成関数
  function displayMessage(isSuccess, message) {

    //メモ：removeは複数指定に対応しており、存在しないクラス名を指定してもエラーにならない。
    messageElement.classList.remove('message--success', 'message--error');
    messageElement.classList.add(isSuccess ? 'message--success' : 'message--error');
    messageElement.textContent = message;
  }

  // F-001,F-002: Formatボタン押下時（JSON検証・整形）
  formatButton.addEventListener('click', () => {
    try {
      const inputValue = inputElement.value;

      // JSON検証
      const parsedJson = JSON.parse(inputValue);

      // JSON整形
      const formattedJson = JSON.stringify(parsedJson, null, 2);

      // 整形結果を表示
      outputElement.value = formattedJson;
      copyButton.disabled = false; // Copyボタン活性化

      // 成功メッセージ表示
      displayMessage(true, 'JSONの検証・整形に成功しました。');

    } catch (error) {
      // outputの内容クリア
      outputElement.value = '';
      copyButton.disabled = true; // Copyボタン非活性化

      // 異常メッセージ表示
      displayMessage(false, 'JSONの検証・整形に失敗しました。');
      console.error(error);
    }
  });

  async function copyToClipboard(text) {
    try {
      // クリップボードにコピー
      await navigator.clipboard.writeText(text);
      // コピー成功時のメッセージ表示
      displayMessage(true, '整形結果をクリップボードにコピーしました。');
    } catch(error) {
      displayMessage(false, 'クリップボードへのコピーに失敗しました。');
      console.error(error);
    }
  }

  // F-003: Copyボタン押下時
  copyButton.addEventListener('click', () => {
    // 整形結果を取得する
    const outputJson = outputElement.value;
    // コピー実行関数呼び出し
    copyToClipboard(outputJson);
  });

  // F-004: Clearボタン押下時
  clearButton.addEventListener('click', () => {
    // 入力欄・出力欄・メッセージ欄をクリアする
    inputElement.value = '';
    outputElement.value = '';
    messageElement.textContent = '';

    // ボタンの活性・非活性をリセットする
    formatButton.disabled = true;
    copyButton.disabled = true;
  });
})();
