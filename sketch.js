// 宣告測驗題目資料陣列，包含 5 題 p5.js 基礎指令練習題
let questions = [
  {
    question: "1. 在 p5.js 中，哪一個函數用於設定初始環境與畫布大小？",
    options: ["A. draw()", "B. setup()", "C. create()", "D. start()"],
    answer: 1 // 正確答案索引（0為第一個選項，1為第二個選項，依此類推）
  },
  {
    question: "2. 想要繪製一個圓形，應該使用哪一個 p5.js 指令？",
    options: ["A. rect()", "B. line()", "C. circle()", "D. square()"],
    answer: 2
  },
  {
    question: "3. 哪一個變數可以用來取得目前滑鼠的 X 軸座標？",
    options: ["A. mouseX", "B. mouseY", "C. posX", "D. cursorX"],
    answer: 0
  },
  {
    question: "4. 若要設定圖形的填滿顏色，應該呼叫哪一個函數？",
    options: ["A. stroke()", "B. background()", "C. color()", "D. fill()"],
    answer: 3
  },
  {
    question: "5. p5.js 中，draw() 函數預設的執行頻率為何？",
    options: ["A. 只執行一次", "B. 不斷重複循環執行", "C. 按下鍵盤才執行", "D. 每秒執行一次"],
    answer: 1
  }
];

// 宣告全域變數以管理測驗狀態
let currentQuestionIndex = 0; // 目前顯示的題目索引
let score = 0;                // 答對總題數
let selectedOption = -1;      // 使用者選擇的選項索引（-1 代表尚未選擇）
let isAnswered = false;       // 是否已經作答當前題目

// 宣告動畫控制變數
let animAngle = 0;            // 用於計算搖晃與跳動動畫的角度

function setup() {
  // 建立符合瀏覽器當前視窗大小的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // 設定全螢幕背景顏色為淡灰色
  background(240);

  // 累加動畫角度，驅動動態效果
  animAngle += 0.1;

  // 判斷測驗是否已經完成所有題目
  if (currentQuestionIndex < questions.length) {
    // 繪製當前測驗題目與選項
    drawQuiz();
  } else {
    // 繪製最終結算畫面
    drawResult();
  }
}

// 繪製測驗主畫面的函數（包含響應式版面佈局）
function drawQuiz() {
  // 取得目前題目物件
  let q = questions[currentQuestionIndex];

  // 判斷是否為橫向螢幕（高度小於寬度且高度較矮，如手機橫放）
  let isLandscape = width > height && height < 500;

  // ----------------【題目區塊：深藍方框與內嵌文字】----------------
  // 響應式計算題目方框寬度（電腦上上限為 750px，手機上適應 90% 螢幕寬）
  let boxWidth = min(width * 0.9, 750); 
  let padding = min(width * 0.03, 20);  // 內襯距離隨螢幕微調
  // 動態字體大小：橫向時調小，避免擠壓
  let fontSize = isLandscape ? min(height * 0.045, 16) : min(width * 0.025, 20);
  fontSize = max(fontSize, 14); // 設定最小字級確保手機直向好閱讀

  // 設定繪製題目文字時的樣式，以計算預期文字高度
  textSize(fontSize);
  textStyle(BOLD);

  // 計算文字在限定寬度（boxWidth - padding * 2）下自動換行所需的高度
  let textW = boxWidth - padding * 2;
  let estimatedTextHeight = getQuestionHeight(q.question, textW, fontSize) + padding * 2;
  let boxHeight = max(estimatedTextHeight, isLandscape ? 60 : 85); // 橫向時適度壓縮最小高度

  // 定義題目方框中心座標（水平置中）
  let boxX = width / 2;
  let boxY = isLandscape ? height * 0.16 : height * 0.18;

  // 繪製題目藍色背景方框 (#023e8a)
  rectMode(CENTER);
  fill("#023e8a");
  stroke(0, 40, 100);
  strokeWeight(2);
  rect(boxX, boxY, boxWidth, boxHeight, 15); // 15px 圓角方框

  // 在方框內部繪製題目文字（完全限制在方框範圍內）
  rectMode(CORNER); // 切換模式以精準控制文字包覆區域
  textAlign(CENTER, CENTER); // 水平與垂直皆置中對齊
  noStroke();
  fill(255); // 白色文字
  // 傳入文字區域的左上角座標與寬高，讓文字自動換行且維持在框內
  text(q.question, boxX - textW / 2, boxY - boxHeight / 2 + padding, textW, boxHeight - padding * 2);

  // ----------------【選項區塊】----------------
  let optionWidth = min(width * 0.85, 650);
  // 橫向螢幕時縮小選項高度與間距
  let optionHeight = isLandscape ? 38 : min(height * 0.07, 50);
  let startY = boxY + boxHeight / 2 + (isLandscape ? 25 : 40);
  let spacing = isLandscape ? 46 : min(height * 0.085, 65);

  // 逐一繪製 4 個選項
  for (let i = 0; i < 4; i++) {
    let x = width / 2;
    let y = startY + i * spacing;
    let bgColor = color(255); // 預設選項背景顏色為白色

    // 判斷是否已經作答，並套用對應的動畫與色彩效果
    if (isAnswered) {
      // 若使用者答錯
      if (selectedOption !== q.answer) {
        // 正確答案選項：背景色 #ffe5d9，並上下跳動
        if (i === q.answer) {
          bgColor = color("#ffe5d9");
          y += sin(animAngle * 2) * 6; // 正弦函數實現上下跳動效果
        }
        // 使用者選擇的錯誤選項：背景色 #fb6f92，並左右移動
        else if (i === selectedOption) {
          bgColor = color("#fb6f92");
          x += sin(animAngle * 3) * 6; // 正弦函數實現左右搖晃效果
        }
      } 
      // 若使用者答對
      else {
        if (i === q.answer) {
          bgColor = color("#d4edda"); // 正確選項顯示淡綠色背景
        }
      }
    }

    // 繪製選項方框
    rectMode(CENTER);
    stroke(180);
    strokeWeight(1.5);
    fill(bgColor);
    rect(x, y, optionWidth, optionHeight, 10);

    // 繪製選項文字
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    textSize(isLandscape ? 14 : min(width * 0.02, 17));
    textStyle(NORMAL);
    text(q.options[i], x, y);
  }

  // 若已作答，顯示「下一題」按鈕
  if (isAnswered) {
    let btnY = startY + 3.8 * spacing + (isLandscape ? 25 : 35);
    drawNextButton(btnY);
  }
}

// 輔助函數：計算題目文字在限定寬度下自動換行後所需的高度
function getQuestionHeight(txt, maxW, fSize) {
  let words = txt.split('');
  let currentLine = '';
  let lineCount = 1;

  textSize(fSize);
  for (let i = 0; i < words.length; i++) {
    let testLine = currentLine + words[i];
    if (textWidth(testLine) > maxW && i > 0) {
      currentLine = words[i];
      lineCount++;
    } else {
      currentLine = testLine;
    }
  }
  return lineCount * (fSize * 1.35); // 行高設定為字體大小的 1.35 倍
}

// 繪製「下一題」按鈕的函數
function drawNextButton(btnY) {
  let isLandscape = width > height && height < 500;
  let btnX = width / 2;
  let btnW = min(width * 0.5, 180);
  let btnH = isLandscape ? 38 : 48;

  // 動態防止按鈕超出視窗底部
  btnY = min(btnY, height - (isLandscape ? 30 : 50));

  // 繪製按鈕背景矩形
  rectMode(CENTER);
  stroke(0, 102, 204);
  fill(0, 102, 204);
  rect(btnX, btnY, btnW, btnH, 8);

  // 繪製按鈕文字
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);
  textSize(isLandscape ? 15 : 18);
  textStyle(BOLD);

  // 若為最後一題，按鈕文字切換為「查看結果」
  if (currentQuestionIndex === questions.length - 1) {
    text("查看結果", btnX, btnY);
  } else {
    text("下一題", btnX, btnY);
  }
}

// 繪製結算畫面的函數（響應式調整）
function drawResult() {
  textAlign(CENTER, CENTER);

  // 顯示標題
  fill(30);
  textSize(min(width * 0.06, 32));
  textStyle(BOLD);
  text("測驗結束！", width / 2, height * 0.32);

  // 顯示答對題數結果
  textSize(min(width * 0.04, 22));
  textStyle(NORMAL);
  text("您總共答對了 " + score + " / " + questions.length + " 題", width / 2, height * 0.46);

  // 繪製重新開始按鈕
  let btnX = width / 2;
  let btnY = height * 0.62;
  let btnW = min(width * 0.5, 180);
  let btnH = 48;

  rectMode(CENTER);
  fill(40, 167, 69);
  rect(btnX, btnY, btnW, btnH, 8);

  fill(255);
  textSize(18);
  textStyle(BOLD);
  text("重新測驗", btnX, btnY);
}

// 滑鼠/觸控點擊互動事件處理
function mousePressed() {
  let isLandscape = width > height && height < 500;

  // 測驗進行中
  if (currentQuestionIndex < questions.length) {
    let q = questions[currentQuestionIndex];
    let boxWidth = min(width * 0.9, 750);
    let padding = min(width * 0.03, 20);
    let fontSize = isLandscape ? min(height * 0.045, 16) : min(width * 0.025, 20);
    fontSize = max(fontSize, 14);

    let textW = boxWidth - padding * 2;
    let estimatedTextHeight = getQuestionHeight(q.question, textW, fontSize) + padding * 2;
    let boxHeight = max(estimatedTextHeight, isLandscape ? 60 : 85);
    let boxY = isLandscape ? height * 0.16 : height * 0.18;

    let optionWidth = min(width * 0.85, 650);
    let optionHeight = isLandscape ? 38 : min(height * 0.07, 50);
    let startY = boxY + boxHeight / 2 + (isLandscape ? 25 : 40);
    let spacing = isLandscape ? 46 : min(height * 0.085, 65);

    // 尚未作答，檢查選項點擊
    if (!isAnswered) {
      for (let i = 0; i < 4; i++) {
        let x = width / 2;
        let y = startY + i * spacing;

        // 判斷點擊座標是否落在選項範圍內
        if (
          mouseX > x - optionWidth / 2 &&
          mouseX < x + optionWidth / 2 &&
          mouseY > y - optionHeight / 2 &&
          mouseY < y + optionHeight / 2
        ) {
          selectedOption = i;
          isAnswered = true;

          // 判斷是否答對
          if (selectedOption === questions[currentQuestionIndex].answer) {
            score++;
          }
          break;
        }
      }
    } 
    // 已作答，檢查「下一題」按鈕點擊
    else {
      let btnY = startY + 3.8 * spacing + (isLandscape ? 25 : 35);
      btnY = min(btnY, height - (isLandscape ? 30 : 50));
      let btnX = width / 2;
      let btnW = min(width * 0.5, 180);
      let btnH = isLandscape ? 38 : 48;

      if (
        mouseX > btnX - btnW / 2 &&
        mouseX < btnX + btnW / 2 &&
        mouseY > btnY - btnH / 2 &&
        mouseY < btnY + btnH / 2
      ) {
        currentQuestionIndex++;
        selectedOption = -1;
        isAnswered = false;
      }
    }
  } 
  // 測驗結束，檢查「重新測驗」按鈕點擊
  else {
    let btnX = width / 2;
    let btnY = height * 0.62;
    let btnW = min(width * 0.5, 180);
    let btnH = 48;

    if (
      mouseX > btnX - btnW / 2 &&
      mouseX < btnX + btnW / 2 &&
      mouseY > btnY - btnH / 2 &&
      mouseY < btnY + btnH / 2
    ) {
      currentQuestionIndex = 0;
      score = 0;
      selectedOption = -1;
      isAnswered = false;
    }
  }
}

// 當使用者改變視窗大小或旋轉手機方向時，自動重置畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}