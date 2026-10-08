---
title: 選擇題測驗卷網站講義（學生版）.md

---

---
title: 選擇題測驗卷網站講義（學生版）

---

---
title: 選擇題測驗卷網站講義（學生版）
tags: [114程式設計與實習_上學期]

---

# 選擇題測驗卷網站講義（學生版）

學號：＿＿＿＿＿＿＿＿　　姓名：＿＿＿＿＿＿＿＿

> **填寫方式**
> 1. 每個學習都要放：**執行截圖**、**三次問 AI 的提示詞**、**最後採用的程式碼**。
> 2. 問 AI 的提示詞請**逐字貼上**自己實際輸入的內容（不要寫摘要），第一次、第二次、第三次依序記錄。
> 3. 程式碼貼在「點開貼上」的收合區塊裡，貼上**你最後真正採用、而且能執行**的版本。

---

## 學習1：產生一個選擇題測驗卷網站

https://cfchen58.synology.me/115/week4/stage1/

**這個階段的目標：** 用 p5.js 做出一個一次顯示一題、四個選項、答完會顯示對錯與總分的測驗網站（題目先寫在程式裡）。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習1截圖](請貼上截圖)
![image]![動畫](https://hackmd.io/_uploads/SJlic3Vjze.gif)

### 第一次問 AI

使用p5.js撰寫一個選擇題測驗系統，我已經產生一個p5.js專案，請把程式碼寫到sketch.js檔案，每條指令都需要加上中文註解，測驗系統題目設定為五題，測驗題目內容為程式設計ps.js簡易指令練習測驗，系統採用全螢幕畫布，使用者答錯時，系統會在正確答案選項上，加上ffe5d9背景顏色，該選項要上下跳動，答錯的選項採用fb6f92，選項左右移動，選擇題選項共有四個選項，當五題結束後，需要顯示答對的題數，每次顯示一個題目需要有下一題的按鈕。
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

題目的顯示到整個視窗畫布的左邊，造成無法全部正確顯示，題目請顯示在整個視窗的中間，並加上方框，方框的背景顏色為023e8a
（逐字貼上你第二次問 AI 的提示詞）
```


### 程式碼內容

:::info
:::spoiler 點開貼上學習1的程式碼
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

// 宣告全域變數以管理測驗進度與分數
let currentQuestionIndex = 0; // 目前顯示的題目索引
let score = 0;                // 答對總題數
let selectedOption = -1;      // 使用者選擇的選項索引（-1 代表尚未選擇）
let isAnswered = false;       // 是否已經作答當前題目

// 宣告動畫控制變數
let animAngle = 0;            // 用於計算搖晃與跳動動畫的角度

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 設定文字對齊方式為水平居中、垂直居中
  textAlign(CENTER, CENTER);
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

// 繪製測驗主畫面的函數
function drawQuiz() {
  // 取得目前題目物件
  let q = questions[currentQuestionIndex];

  // ----------------【題目區塊：置中方框與文字】----------------
  // 設定題目方框的尺寸與中心座標
  let boxWidth = min(width * 0.8, 800); // 方框寬度，最大不超過 800px
  let boxHeight = 120;                  // 方框高度
  let boxX = width / 2;                 // 方框置中 X 座標
  let boxY = height * 0.18;             // 方框 Y 座標

  // 繪製題目藍色背景方框 (#023e8a)
  rectMode(CENTER);
  fill("#023e8a");
  stroke(0, 50, 120);
  strokeWeight(2);
  rect(boxX, boxY, boxWidth, boxHeight, 15); // 15px 圓角

  // 繪製題目文字
  noStroke();
  fill(255); // 白色文字，確保在高對比背景上清晰可見
  textSize(min(width * 0.025, 22)); // 響應式字體大小
  textStyle(BOLD);
  // 在方框範圍內繪製題目，設定邊界寬高以支援文字自動換行與完全置中
  text(q.question, boxX - boxWidth / 2 + 20, boxY - boxHeight / 2 + 10, boxWidth - 40, boxHeight - 20);

  // ----------------【選項區塊】----------------
  let optionWidth = min(width * 0.7, 700);
  let optionHeight = 50;
  let startY = height * 0.38;
  let spacing = 65;

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
          y += sin(animAngle * 2) * 8; // 正弦函數實現上下跳動效果
        }
        // 使用者選擇的錯誤選項：背景色 #fb6f92，並左右移動
        else if (i === selectedOption) {
          bgColor = color("#fb6f92");
          x += sin(animAngle * 3) * 8; // 正弦函數實現左右搖晃效果
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
    noStroke();
    fill(0);
    textSize(18);
    textStyle(NORMAL);
    text(q.options[i], x, y);
  }

  // 若已作答，顯示「下一題」按鈕
  if (isAnswered) {
    drawNextButton();
  }
}

// 繪製「下一題」按鈕的函數
function drawNextButton() {
  let btnX = width / 2;
  let btnY = height * 0.88;
  let btnW = 180;
  let btnH = 50;

  // 繪製按鈕背景矩形
  rectMode(CENTER);
  stroke(0, 102, 204);
  fill(0, 102, 204);
  rect(btnX, btnY, btnW, btnH, 8);

  // 繪製按鈕文字
  noStroke();
  fill(255);
  textSize(20);
  textStyle(BOLD);
  // 若為最後一題，按鈕文字切換為「查看結果」
  if (currentQuestionIndex === questions.length - 1) {
    text("查看結果", btnX, btnY);
  } else {
    text("下一題", btnX, btnY);
  }
}

// 繪製結算畫面的函數
function drawResult() {
  // 顯示標題
  fill(30);
  textSize(32);
  textStyle(BOLD);
  text("測驗結束！", width / 2, height * 0.35);

  // 顯示答對題數結果
  textSize(24);
  textStyle(NORMAL);
  text("您總共答對了 " + score + " / " + questions.length + " 題", width / 2, height * 0.48);

  // 繪製重新開始按鈕
  let btnX = width / 2;
  let btnY = height * 0.65;
  let btnW = 180;
  let btnH = 50;

  rectMode(CENTER);
  fill(40, 167, 69);
  rect(btnX, btnY, btnW, btnH, 8);

  fill(255);
  textSize(20);
  textStyle(BOLD);
  text("重新測驗", btnX, btnY);
}

// 滑鼠點擊互動事件處理
function mousePressed() {
  // 測驗進行中
  if (currentQuestionIndex < questions.length) {
    // 尚未作答，檢查選項點擊
    if (!isAnswered) {
      let optionWidth = min(width * 0.7, 700);
      let optionHeight = 50;
      let startY = height * 0.38;
      let spacing = 65;

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
      let btnX = width / 2;
      let btnY = height * 0.88;
      let btnW = 180;
      let btnH = 50;

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
    let btnY = height * 0.65;
    let btnW = 180;
    let btnH = 50;

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

// 視窗大小變更時，自動覆蓋整個螢幕畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

```
:::


---

## 學習2：網頁設定為響應式網頁

https://cfchen58.synology.me/115/week4/stage2/

**這個階段的目標：** 讓網站在電腦、平板、手機（直向與橫向）都能正常顯示，視窗大小改變時版面自動調整。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖
![動畫1]

（把截圖拖曳到這裡，或貼上圖片連結）

![學習2截圖](請貼上截圖)
![動畫1](https://hackmd.io/_uploads/S1ONnh4jGx.gif)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```使用p5.js撰寫一個選擇題測驗系統，我已經產生一個p5.js專案，請把程式碼寫到sketch.js檔案，每條指令都需要加上中文註解，測驗系統題目設定為五題，測驗題目內容為程式設計ps.js簡易指令練習測驗，系統採用全螢幕畫布，使用者答錯時，系統會在正確答案選項上，加上ffe5d9背景顏色，該選項要上下跳動，答錯的選項採用fb6f92，選項左右移動，選擇題選項共有四個選項，當五題結束後，需要顯示答對的題數，每次顯示一個題目需要有下一題的按鈕。題目請顯示在整個視窗的中間，並加上方框，方框的背景顏色為023e8a




### 程式碼內容

:::info
:::spoiler 點開貼上學習2的程式碼
```javascript=
//學習2程式碼所在

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
:::


---

## 學習3：設定嵌入 Google 字型，網頁文字採用這些字型

https://cfchen58.synology.me/115/week4/stage3/

**這個階段的目標：** 從 Google Fonts 嵌入繁體中文字型，並讓畫布上的題目與選項文字使用這些字型。
**這個階段會修改的檔案：** index.html、sketch.js

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習3截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習3的程式碼
```javascript=
//學習3程式碼所在

```
:::


---

## 學習4：設定題庫並抽題顯示題目網頁（CSV 檔案）

https://cfchen58.synology.me/115/week4/stage4/

**這個階段的目標：** 把題目移到 questions.csv，網站讀取題庫後每次隨機抽出 5 題。
**這個階段會修改的檔案：** index.html、sketch.js、questions.csv

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習4截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習4的程式碼
```javascript=
//學習4程式碼所在

```
:::


---

## 學習5：利用 Google Sheets 當題庫

https://cfchen58.synology.me/115/week4/stage5/

**這個階段的目標：** 把題庫放在 Google 試算表，網站直接讀取，老師改試算表，網站題目就跟著更新。
**這個階段會修改的檔案：** index.html、sketch.js（questions.csv 當備用題庫）

### 執行截圖

（把截圖拖曳到這裡，或貼上圖片連結）

![學習5截圖](請貼上截圖)

### 第一次問 AI

```tex!
（逐字貼上你第一次問 AI 的提示詞）
```

### 第二次問 AI

```tex!
（逐字貼上你第二次問 AI 的提示詞）
```

### 第三次問 AI

```tex!
（逐字貼上你第三次問 AI 的提示詞）
```

### 程式碼內容

:::info
:::spoiler 點開貼上學習5的程式碼
```javascript=
//學習5程式碼所在

```
:::


---

## 我的心得

這五個學習中，哪一個最困難？你是怎麼解決的？（請寫出實際發生的事）

＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
