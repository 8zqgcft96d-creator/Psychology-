<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>心靈動物原型測驗</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: "Microsoft JhengHei", "Heiti TC", sans-serif; background-color: #fdf6e3; color: #5d5d5d; margin: 0; padding: 20px; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
        h1 { text-align: center; color: #2c3e50; font-size: 24px; margin-bottom: 10px; }
        .subtitle { text-align: center; color: #888; font-size: 14px; margin-bottom: 30px; }
        
        /* 題目樣式 */
        .question-box { margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px dashed #ddd; }
        .question-title { font-weight: bold; font-size: 18px; margin-bottom: 15px; color: #34495e; display: block; }
        .options label { display: block; background: #f8f9fa; padding: 12px 15px; margin-bottom: 8px; border-radius: 8px; cursor: pointer; transition: 0.2s; border: 1px solid #eee; }
        .options label:hover { background: #e9ecef; border-color: #ccc; }
        .options input { margin-right: 10px; }

        /* 按鈕樣式 */
        button { width: 100%; padding: 16px; background-color: #d35400; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px; }
        button:hover { background-color: #e67e22; }

        /* 結果頁樣式 */
        #result-section { display: none; animation: fadeIn 0.5s; }
        .result-card { background: #fff8f0; border-left: 5px solid #d35400; padding: 20px; margin-top: 20px; border-radius: 5px; }
        .result-title { font-size: 26px; font-weight: bold; color: #d35400; margin-bottom: 10px; }
        .result-tag { font-size: 16px; color: #666; font-style: italic; margin-bottom: 15px; display: block; }
        .section-title { font-weight: bold; color: #333; margin-top: 15px; display: block; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>

<div class="container">
    <div id="quiz-section">
        <h1>🌲 心靈動物原型測驗</h1>
        <p class="subtitle">男孩、鼴鼠、狐狸與馬</p>
        <form id="quiz-form">
            </form>
        <button type="button" onclick="calculateResult()">✨ 查看我的心靈動物</button>
    </div>

    <div id="result-section">
        <h1>分析結果</h1>
        
        <canvas id="radarChart"></canvas>

        <div id="result-content" class="result-card"></div>

        <button onclick="location.reload()" style="background-color: #7f8c8d; margin-top: 20px;">🔄 重新測驗</button>
    </div>
</div>

<script>
    // 定義題目 (A=馬, B=狐狸, C=男孩, D=鼴鼠)
    const questions = [
        {
            text: "當你遇到一個新的挑戰/任務時，你的第一反應是：",
            options: [
                { text: "馬上跳進去、先試看看", type: "A" },
                { text: "先觀察環境、研究方式", type: "B" },
                { text: "有點猶豫、怕搞砸、先做部分準備", type: "C" },
                { text: "想幫助他人、在背後支撐或配合", type: "D" }
            ]
        },
        {
            text: "在人際互動中，當朋友需要幫忙/情緒低落時，你通常會：",
            options: [
                { text: "鼓勵他們「快起來、一起去做點什麼」", type: "A" },
                { text: "安靜陪伴、傾聽他們說出來", type: "B" }, // 修正：狐狸通常是陪伴觀察者，或此題偏向B/D，暫定B
                { text: "有點退縮、不太確定怎麼幫比較好", type: "C" },
                { text: "主動提供支持、做好後勤或照顧他們", type: "D" }
            ]
        },
        {
            text: "當你在思考人生或尋找方向時，你偏好哪種方式：",
            options: [
                { text: "設定目標、立刻動手實踐", type: "A" },
                { text: "深入思考、寫筆記、分析可能性", type: "B" },
                { text: "小心翼翼、怕錯、慢慢走", type: "C" },
                { text: "和他人分享、互相支持、一步一腳印", type: "D" }
            ]
        },
        {
            text: "面對失敗或挫折，你最可能的反應是：",
            options: [
                { text: "立刻反彈、再戰一次", type: "A" },
                { text: "自我反省、思考教訓", type: "B" },
                { text: "感到沮喪、有點退縮、怕再犯錯", type: "C" },
                { text: "尋求或提供人際支持、共同面對", type: "D" }
            ]
        },
        {
            text: "如果要選擇你最看重的特質，是哪一項：",
            options: [
                { text: "冒險精神 / 行動力", type: "A" },
                { text: "思考深度 / 內在探索", type: "B" },
                { text: "謹慎 / 安全感", type: "C" },
                { text: "溫暖 / 支持他人", type: "D" }
            ]
        }
    ];

    // 結果內容資料庫
    const resultsData = {
        "A": {
            title: "馬型 (The Horse)",
            tag: "「你習慣當那個『載大家走過去』的人。」",
            desc: `
                <span class="section-title">你的樣子：</span>
                你很習慣扛責任、撐住場面。很多時候，你自己其實也會累、也會徬徨，可是你會先問：「大家還好嗎？」你是那種會陪著別人走一段的人，願意當那匹穩穩向前的馬。
                <br><br>
                <span class="section-title">你給別人的感覺：</span>
                你讓人有安全感。只要你在，事情好像就能慢慢被處理好。很多人會在不知不覺中依賴你、把難題丟給你，因為你看起來總是知道該怎麼做。
                <br><br>
                <span class="section-title">給你的提醒：</span>
                你不是永遠都要那麼堅強。當你覺得很重的時候，也可以停下來，把一些重量放回去，或者請別人幫忙扛一點。有時候，真正的力量不是一直往前衝，而是敢在需要的時候說：「我也想被照顧。」
            `
        },
        "B": {
            title: "狐狸型 (The Fox)",
            tag: "「你看得很清楚，只是習慣把心收好。」",
            desc: `
                <span class="section-title">你的樣子：</span>
                你敏銳、細心，對人的真心假意、情況的危險程度，有一種直覺式的判斷。你不會輕易把自己交出去，因為你知道受傷有多痛，所以寧可慢一點、再確定一點。
                <br><br>
                <span class="section-title">你給別人的感覺：</span>
                一開始，你可能讓人覺得有距離、有點冷，但真正走進你心裡的人都知道：你其實非常忠誠、非常有義氣。你不會亂承諾，一旦說出口，就會盡力做到。
                <br><br>
                <span class="section-title">給你的提醒：</span>
                保持界線是好事，但也別把自己關得太緊。不是每個人都會像過去那些人一樣傷害你。你可以試著多給世界一點點機會——不是為了別人，而是為了讓自己有機會好好被對待。
            `
        },
        "C": {
            title: "男孩型 (The Boy)",
            tag: "「關於自己，你還在學著怎麼相信。」",
            desc: `
                <span class="section-title">你的樣子：</span>
                你有很強的感受力，對世界充滿好奇，也對自己充滿問號。你常常會想：「我到底夠不夠好？」「我能不能被喜歡、被理解？」這種敏感，讓你更容易看見別人的情緒，也更容易忽略自己的需要。
                <br><br>
                <span class="section-title">你給別人的感覺：</span>
                在別人眼中，你像一個正在長大的孩子，真誠、直接、很真實。你會為了關係不斷自我檢討，只想讓自己變得更好。很多人因為你願意說出的脆弱，而覺得被陪伴。
                <br><br>
                <span class="section-title">給你的提醒：</span>
                你不需要完美才值得被愛。試著多看看自己已經做得不錯的地方，允許「還在路上」的自己存在。當你願意對自己溫柔一點，你就會發現：原來你早就已經是某個人心裡，很重要的那個存在。
            `
        },
        "D": {
            title: "鼴鼠型 (The Mole)",
            tag: "「你的溫柔，是世界很需要的溫柔。」",
            desc: `
                <span class="section-title">你的樣子：</span>
                你很重視「舒服感」—食物、氣氛、陪伴、小確幸。你知道人不可能每天都很強，所以你特別會照顧情緒、照顧氣氛。你會為別人準備點心、傳訊息問候、講些好笑的話，讓沈重變得沒那麼可怕。
                <br><br>
                <span class="section-title">你給別人的感覺：</span>
                你像一個會做甜點的好朋友，可能不會給一大串理性分析，但總會讓人覺得：「跟你在一起就不那麼難過了吧。」很多人其實靠你的存在，才撐過了一些很黑暗的日子。
                <br><br>
                <span class="section-title">給你的提醒：</span>
                在照顧別人之前，也別忘了一句：「那我自己呢？」你值得把同樣的溫柔，留一份給自己。偶爾不用那麼逗趣、那麼體貼，也沒關係——就算今天只想躺著，你一樣是很可愛的你。
            `
        }
    };

    // 初始化題目
    const form = document.getElementById('quiz-form');
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'question-box';
        
        let optionsHtml = '<div class="options">';
        q.options.forEach(opt => {
            optionsHtml += `<label><input type="radio" name="q${index}" value="${opt.type}"> ${opt.text}</label>`;
        });
        optionsHtml += '</div>';

        div.innerHTML = `<label class="question-title">${index + 1}. ${q.text}</label>${optionsHtml}`;
        form.appendChild(div);
    });

    function calculateResult() {
        // 檢查是否每題都答
        for (let i = 0; i < questions.length; i++) {
            if (!document.querySelector(`input[name="q${i}"]:checked`)) {
                alert(`⚠️ 第 ${i+1} 題還沒回答喔！`);
                return;
            }
        }

        // 計算分數
        let scores = { "A": 0, "B": 0, "C": 0, "D": 0 };
        for (let i = 0; i < questions.length; i++) {
            const val = document.querySelector(`input[name="q${i}"]:checked`).value;
            scores[val]++;
        }

        // 找出最高分
        let maxType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        
        // 處理同分狀況 (簡單邏輯：若同分，優先顯示 A>B>C>D，或可視情況調整)
        // 此處 maxType 已取出最高分者

        // 顯示結果頁
        document.getElementById('quiz-section').style.display = 'none';
        document.getElementById('result-section').style.display = 'block';
        window.scrollTo(0, 0);

        // 填入文字內容
        const result = resultsData[maxType];
        const contentDiv = document.getElementById('result-content');
        contentDiv.innerHTML = `
            <div class="result-title">${result.title}</div>
            <span class="result-tag">${result.tag}</span>
            <div style="text-align: left; margin-top: 15px; color: #444;">${result.desc}</div>
        `;

        // 繪製雷達圖
        const ctx = document.getElementById('radarChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['行動力 (馬)', '思考力 (狐狸)', '感受力 (男孩)', '親和力 (鼴鼠)'],
                datasets: [{
                    label: '特質比重',
                    data: [scores.A, scores.B, scores.C, scores.D],
                    backgroundColor: 'rgba(211, 84, 0, 0.2)',
                    borderColor: 'rgba(211, 84, 0, 1)',
                    pointBackgroundColor: 'rgba(211, 84, 0, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 5, // 因為只有5題
                        ticks: { stepSize: 1, display: false } // 不顯示數字刻度讓畫面乾淨
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
</script>

</body>
</html>
