<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">
    <title>数学大冒险：认识亿以内的数字 | 拖拽配对游戏</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none; /* 避免拖动时选中文字/图片 */
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background: #F5F0E7;
            font-family: 'Segoe UI', 'Comic Neue', 'Comic Neue', 'Comic Sans MS', 'Chalkboard SE', 'Poppins', system-ui, sans-serif;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* 主容器 */
        .course-container {
            max-width: 1400px;
            width: 100%;
            background: #FFFDF9;
            border-radius: 56px;
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.05), 0 8px 18px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: all 0.2s ease;
        }

        /* 左右布局 */
        .course-layout {
            display: flex;
            flex-wrap: wrap;
        }

        /* 左侧知识点区域 */
        .knowledge-area {
            flex: 1.2;
            min-width: 270px;
            background: #FFF9F0;
            padding: 28px 24px;
            border-right: 3px solid #FFE3B5;
        }

        /* 右侧游戏区域 */
        .game-area {
            flex: 2;
            min-width: 300px;
            background: #FEFAF2;
            padding: 24px 22px;
            display: flex;
            flex-direction: column;
        }

        /* 知识点样式 */
        .knowledge-title {
            font-size: 1.9rem;
            font-weight: bold;
            color: #E68A2E;
            background: #FFF0DE;
            display: inline-block;
            padding: 6px 22px;
            border-radius: 50px;
            margin-bottom: 24px;
            letter-spacing: -0.3px;
        }

        .place-value-chart {
            background: #FFFAF0;
            border-radius: 48px;
            padding: 16px 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.02);
            border: 1px solid #FFE2BB;
        }

        .chart-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
            margin: 12px 0;
        }

        .digit-card {
            background: #FFF2E2;
            border-radius: 28px;
            padding: 8px 10px;
            text-align: center;
            min-width: 70px;
            flex: 1;
            box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }

        .digit-name {
            font-size: 0.85rem;
            font-weight: bold;
            color: #C06D2E;
        }

        .digit-value {
            font-size: 1.3rem;
            font-weight: 800;
            color: #A55318;
        }

        .example-number {
            background: #FFF2E2;
            border-radius: 32px;
            padding: 14px 16px;
            margin-top: 16px;
        }

        .reading-rule {
            font-size: 0.9rem;
            background: #FFF7E8;
            border-radius: 30px;
            padding: 12px;
            margin-top: 16px;
            color: #AD6B39;
        }

        /* 右侧游戏区 */
        .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 20px;
            gap: 12px;
        }

        .game-title {
            font-size: 1.7rem;
            font-weight: bold;
            background: #FFEEDD;
            padding: 6px 24px;
            border-radius: 60px;
            color: #E07C2C;
        }

        .score-board {
            background: #F3E7D9;
            padding: 6px 20px;
            border-radius: 40px;
            font-weight: bold;
            font-size: 1.2rem;
        }

        .score-board span {
            font-size: 1.9rem;
            font-weight: 800;
            color: #F0943C;
        }

        .reset-btn {
            background: #FFCE9E;
            border: none;
            color: #794F26;
            font-weight: bold;
            padding: 8px 22px;
            border-radius: 60px;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.2s;
            font-family: inherit;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .reset-btn:active {
            transform: scale(0.96);
            background: #FFBB7A;
        }

        /* 配对区域：读法篮子区 */
        .targets-area {
            background: #FFF9F0;
            border-radius: 48px;
            padding: 20px 12px;
            margin-bottom: 28px;
            box-shadow: inset 0 1px 3px #FFE7CF, 0 8px 14px rgba(0,0,0,0.02);
        }

        .section-label {
            font-size: 1.2rem;
            font-weight: 600;
            color: #B7773E;
            margin-bottom: 16px;
            padding-left: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .targets-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 18px;
        }

        /* 目标卡片 (读法篮子) */
        .target-card {
            background: #FFF5E8;
            width: 200px;
            min-width: 170px;
            flex: 1 0 auto;
            padding: 16px 12px;
            border-radius: 36px;
            text-align: center;
            box-shadow: 0 8px 0 #DCB487;
            transition: 0.05s linear;
            border: 2px solid #FFD6A5;
            position: relative;
            cursor: default;
        }

        .target-card.matched {
            background: #CEEAD6;
            box-shadow: 0 3px 0 #8FBC8F;
            transform: translateY(4px);
            border-color: #A8D0AD;
            opacity: 0.85;
        }

        .target-reading {
            font-size: 1.1rem;
            font-weight: 700;
            color: #C1651E;
            word-break: break-word;
        }

        .target-card.matched .target-reading {
            color: #4D7B55;
            text-decoration: line-through;
            text-decoration-thickness: 2px;
        }

        .match-icon {
            position: absolute;
            top: -12px;
            right: -8px;
            background: #66BB6A;
            color: white;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
        }

        /* 可拖拽卡片区（数字卡片） */
        .cards-area {
            background: #FFF9F0;
            border-radius: 48px;
            padding: 20px 12px;
        }

        .cards-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            min-height: 180px;
        }

        .drag-card {
            background: #FFF6EA;
            width: 170px;
            flex: 1 0 140px;
            padding: 18px 8px;
            border-radius: 40px;
            text-align: center;
            box-shadow: 0 10px 0 #E0BC8C;
            transition: 0.05s linear;
            cursor: grab;
            border: 2px solid #FFD29E;
            touch-action: none;
        }

        .drag-card:active {
            cursor: grabbing;
        }

        .drag-card.dragging {
            opacity: 0.5;
        }

        .big-number {
            font-size: 1.45rem;
            font-weight: 800;
            font-family: monospace;
            letter-spacing: 2px;
            color: #B95218;
            word-break: break-all;
        }

        .drag-card .hint {
            font-size: 0.7rem;
            background: #FFE1BD;
            display: inline-block;
            padding: 4px 12px;
            border-radius: 50px;
            margin-top: 8px;
            color: #A6551C;
        }

        /* 拖拽克隆体 */
        .drag-clone {
            position: fixed;
            z-index: 9999;
            filter: drop-shadow(0 12px 20px rgba(0,0,0,0.25));
            opacity: 0.9;
            transform: scale(1.05) rotate(1deg);
            pointer-events: none;
            transition: none;
            width: 170px;
            background: #FFF3E3;
            border-radius: 40px;
            padding: 18px 8px;
            text-align: center;
            border: 2px solid #FFB366;
            box-shadow: 0 12px 20px rgba(0,0,0,0.2);
        }

        .message-area {
            margin-top: 20px;
            text-align: center;
            background: #FFEFDF;
            border-radius: 60px;
            padding: 10px;
            font-weight: 600;
            color: #C6732C;
            font-size: 0.95rem;
        }

        button {
            background: none;
            border: none;
        }

        .feedback-correct {
            animation: bounceMatch 0.3s ease;
        }

        @keyframes bounceMatch {
            0% { transform: scale(1); background: #E0F2E1; }
            80% { transform: scale(1.02);}
            100% { transform: scale(1);}
        }

        @media (max-width: 780px) {
            .course-layout {
                flex-direction: column;
            }
            .knowledge-area {
                border-right: none;
                border-bottom: 3px solid #FFE3B5;
            }
            .target-card, .drag-card {
                width: 100%;
                flex: 1 0 auto;
            }
            .drag-clone {
                width: 150px;
            }
            .big-number {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
<div class="course-container">
    <div class="course-layout">
        <!-- 左侧：亿以内数字知识点 -->
        <div class="knowledge-area">
            <div class="knowledge-title">📚 亿以内数字小课堂</div>
            <div class="place-value-chart">
                <div style="font-weight: bold; font-size:1.2rem; margin-bottom:8px;">🌟 数位顺序表（万级+个级）</div>
                <div class="chart-row">
                    <div class="digit-card"><div class="digit-name">千万位</div><div class="digit-value">千万</div></div>
                    <div class="digit-card"><div class="digit-name">百万位</div><div class="digit-value">百万</div></div>
                    <div class="digit-card"><div class="digit-name">十万位</div><div class="digit-value">十万</div></div>
                    <div class="digit-card"><div class="digit-name">万位</div><div class="digit-value">万</div></div>
                </div>
                <div class="chart-row">
                    <div class="digit-card"><div class="digit-name">千位</div><div class="digit-value">千</div></div>
                    <div class="digit-card"><div class="digit-name">百位</div><div class="digit-value">百</div></div>
                    <div class="digit-card"><div class="digit-name">十位</div><div class="digit-value">十</div></div>
                    <div class="digit-card"><div class="digit-name">个位</div><div class="digit-value">个</div></div>
                </div>
            </div>
            <div class="example-number">
                <strong>📖 读数小窍门：</strong><br>
                1️⃣ 先分级（万级和个级）<br>
                2️⃣ 每级末尾0都不读，中间连续0只读一个零<br>
                🌰 例：<span style="background:#FFE2C1; padding:2px 8px; border-radius:20px;">30020000</span> → 读作 <strong>三千零二万</strong><br>
                🌰 例：<span style="background:#FFE2C1; padding:2px 8px; border-radius:20px;">50600000</span> → 五千零六十万
            </div>
            <div class="reading-rule">
                🧸 亿以内数字最大是 <strong>99,999,999</strong> (八位数)<br>
                把数字卡片拖到正确的读法篮子里，全部配对成功就能成为“大数高手”！
            </div>
        </div>

        <!-- 右侧：拖拽配对游戏 -->
        <div class="game-area">
            <div class="game-header">
                <div class="game-title">🎯 数字配对·拖拖乐</div>
                <div class="score-board">🏅 配对 <span id="matchedCount">0</span> / <span id="totalCount">0</span></div>
                <button class="reset-btn" id="newGameBtn">✨ 新的一组数字</button>
            </div>

            <!-- 读法目标区（放篮子） -->
            <div class="targets-area">
                <div class="section-label">
                    📢 读法篮子（把数字拖到这里） 🧺
                </div>
                <div class="targets-grid" id="targetsGrid"></div>
            </div>

            <!-- 数字卡片区（可拖拽） -->
            <div class="cards-area">
                <div class="section-label">
                    🔢 数字卡片（按住拖拽到对应的读法上）
                </div>
                <div class="cards-grid" id="cardsGrid"></div>
            </div>
            <div class="message-area" id="gameMessage">
                💡 长按或按住数字卡片，拖到右边正确的读法篮子上！
            </div>
        </div>
    </div>
</div>

<script>
    // -------- 亿以内数字题库（数字+正确读法）--------
    const QUESTION_BANK = [
        { num: "30020000", reading: "三千零二万" },
        { num: "50600000", reading: "五千零六十万" },
        { num: "12003400", reading: "一千二百万三千四百" },
        { num: "90000009", reading: "九千万零九" },
        { num: "10000000", reading: "一千万" },
        { num: "25002500", reading: "二千五百万二千五百" },
        { num: "40800050", reading: "四千零八十万零五十" },
        { num: "72000030", reading: "七千二百万零三十" }
    ];

    // 游戏全局状态
    let currentQuestions = [];       // 当前关卡题目列表 { id, num, reading, matched }
    let totalPairs = 0;
    let matchedPairs = 0;

    // 拖拽系统全局变量
    let dragEnabled = true;
    let dragClone = null;
    let activeDragCard = null;       // 原始被拖拽元素
    let currentDragId = null;        // 当前拖拽卡片对应的题目id
    let isDragging = false;
    let startX = 0, startY = 0;

    // DOM 元素
    const targetsGrid = document.getElementById('targetsGrid');
    const cardsGrid = document.getElementById('cardsGrid');
    const matchedCountSpan = document.getElementById('matchedCount');
    const totalCountSpan = document.getElementById('totalCount');
    const gameMessageDiv = document.getElementById('gameMessage');
    const newGameBtn = document.getElementById('newGameBtn');

    // 辅助函数：显示消息
    function showMessage(msg, isError = false) {
        gameMessageDiv.innerHTML = isError ? `😲 ${msg}` : `🎈 ${msg}`;
        if (!isError) {
            setTimeout(() => {
                if (gameMessageDiv.innerHTML.includes(msg))
                    gameMessageDiv.innerHTML = "💪 继续配对！把数字拖到正确的读法篮子里～";
            }, 1800);
        } else {
            setTimeout(() => {
                if (gameMessageDiv.innerHTML.includes(msg))
                    gameMessageDiv.innerHTML = "✨ 再试试看！想一想读法规则 ✨";
            }, 1500);
        }
    }

    // 更新计分板
    function updateScoreUI() {
        matchedCountSpan.innerText = matchedPairs;
        totalCountSpan.innerText = totalPairs;
        if (matchedPairs === totalPairs && totalPairs > 0) {
            showMessage("🎉 哇！你完全掌握了亿以内数字！点击「新的一组数字」继续挑战 🎉");
            gameMessageDiv.innerHTML = "🏆 完美通关！点击「新的一组数字」获得新题目 🏆";
        }
    }

    // 随机从题库中选取 N 个不同题目 (默认4~5个，保证界面美观)
    function selectRandomQuestions(count = 4) {
        // 随机取 count 个不同的题目
        const shuffled = [...QUESTION_BANK];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const selected = shuffled.slice(0, count).map((item, idx) => ({
            id: crypto.randomUUID ? crypto.randomUUID() : `id_${Date.now()}_${idx}_${Math.random()}`,
            num: item.num,
            reading: item.reading,
            matched: false
        }));
        return selected;
    }

    // 重置/新游戏: 随机选取新题目，打乱顺序，重置配对状态
    function initNewGame() {
        // 随机选择4组（可以适应屏幕，亦可选择5组，但为了移动端美观用4组）
        const count = 4;
        currentQuestions = selectRandomQuestions(count);
        totalPairs = currentQuestions.length;
        matchedPairs = 0;
        updateScoreUI();

        // 渲染读法区域 和 数字卡片区域（顺序分别打乱，增加配对挑战趣味）
        renderTargets();   // 读法篮子
        renderCards();     // 数字卡片（顺序打乱）
        // 清理拖拽残留
        if (dragClone && dragClone.parentNode) dragClone.remove();
        dragClone = null;
        isDragging = false;
        showMessage("新题目来啦！把数字卡片拖到对应的读法篮子里吧 ✨");
    }

    // 渲染读法篮子（目标区），每个篮子展示对应读法，未配对状态
    function renderTargets() {
        targetsGrid.innerHTML = '';
        // 为了让配对有挑战，可以随机排序读法篮子的顺序
        const targetsList = [...currentQuestions];
        for (let i = targetsList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [targetsList[i], targetsList[j]] = [targetsList[j], targetsList[i]];
        }
        for (let q of targetsList) {
            const targetDiv = document.createElement('div');
            targetDiv.className = 'target-card';
            if (q.matched) targetDiv.classList.add('matched');
            targetDiv.setAttribute('data-pair-id', q.id);
            targetDiv.setAttribute('data-matched', q.matched);
            targetDiv.innerHTML = `
                <div class="target-reading">📖 ${q.reading}</div>
                ${q.matched ? '<div class="match-icon">✓</div>' : ''}
            `;
            targetsGrid.appendChild(targetDiv);
        }
    }

    // 渲染数字卡片（可拖拽卡片），只渲染未配对的卡片，并随机排序
    function renderCards() {
        cardsGrid.innerHTML = '';
        const unmatchedCards = currentQuestions.filter(q => !q.matched);
        if (unmatchedCards.length === 0 && matchedPairs === totalPairs) {
            cardsGrid.innerHTML = '<div style="padding:30px; text-align:center; background:#F7EFE2; border-radius:50px;">🎉 全配对啦！ 超厉害 🎉</div>';
            return;
        }
        // 随机打乱卡片顺序
        const shuffledCards = [...unmatchedCards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        for (let q of shuffledCards) {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'drag-card';
            cardDiv.setAttribute('data-pair-id', q.id);
            cardDiv.setAttribute('data-num', q.num);
            cardDiv.innerHTML = `
                <div class="big-number">${q.num}</div>
                <div class="hint">✨ 拖拽配对 ✨</div>
            `;
            cardsGrid.appendChild(cardDiv);
            // 绑定拖拽事件
            attachDragEvents(cardDiv, q.id);
        }
    }

    // ---------- 拖拽交互 (支持鼠标+触摸) ----------
    function attachDragEvents(element, pairId) {
        const onStart = (e) => {
            if (!dragEnabled) return;
            // 防止已配对的卡片 (虽然渲染时只有未配对，但二次确认)
            const question = currentQuestions.find(q => q.id === pairId);
            if (!question || question.matched) return;
            e.preventDefault();
            let clientX, clientY;
            if (e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            startX = clientX;
            startY = clientY;
            activeDragCard = element;
            currentDragId = pairId;
            // 克隆拖拽元素
            dragClone = element.cloneNode(true);
            dragClone.classList.add('drag-clone');
            dragClone.style.left = `${clientX - element.offsetWidth / 2}px`;
            dragClone.style.top = `${clientY - element.offsetHeight / 2}px`;
            dragClone.style.width = `${element.offsetWidth}px`;
            document.body.appendChild(dragClone);
            element.classList.add('dragging');
            isDragging = true;

            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', onEnd);
            window.addEventListener('touchcancel', onEnd);
        };

        const onMove = (e) => {
            if (!isDragging || !dragClone) return;
            e.preventDefault();
            let clientX, clientY;
            if (e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            dragClone.style.left = `${clientX - dragClone.offsetWidth / 2}px`;
            dragClone.style.top = `${clientY - dragClone.offsetHeight / 2}px`;
        };

        const onEnd = (e) => {
            if (!isDragging || !dragClone) {
                cleanDrag();
                return;
            }
            e.preventDefault();
            let endX, endY;
            if (e.changedTouches) {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
            } else {
                endX = e.clientX;
                endY = e.clientY;
            }
            // 获取释放点下方的元素
            const elemUnderPointer = document.elementsFromPoint(endX, endY);
            let targetBasket = null;
            for (let el of elemUnderPointer) {
                if (el.classList && el.classList.contains('target-card')) {
                    targetBasket = el;
                    break;
                }
            }
            // 配对逻辑
            if (targetBasket && currentDragId) {
                const targetPairId = targetBasket.getAttribute('data-pair-id');
                const isTargetMatched = targetBasket.getAttribute('data-matched') === 'true';
                // 获取当前拖拽卡片对应的题目
                const dragQuestion = currentQuestions.find(q => q.id === currentDragId);
                if (!dragQuestion || dragQuestion.matched) {
                    showMessage("这张卡片已经配对过了哦！", true);
                    cleanDrag();
                    return;
                }
                if (!isTargetMatched && targetPairId === currentDragId) {
                    // 配对成功！
                    const matchedQuestion = currentQuestions.find(q => q.id === currentDragId);
                    if (matchedQuestion && !matchedQuestion.matched) {
                        matchedQuestion.matched = true;
                        matchedPairs++;
                        updateScoreUI();
                        // 重新渲染界面 (更新读法篮子状态和卡片区)
                        renderTargets();
                        renderCards();
                        // 视觉反馈
                        if (targetBasket) targetBasket.classList.add('feedback-correct');
                        setTimeout(() => {
                            if (targetBasket) targetBasket.classList.remove('feedback-correct');
                        }, 300);
                        showMessage(`✅ 正确！ ${matchedQuestion.num} 读作 “${matchedQuestion.reading}”`, false);
                    } else {
                        showMessage("配对失败，请刷新游戏", true);
                    }
                } else {
                    // 配对失败
                    if (isTargetMatched) showMessage(`这个读法已经配对过啦！再试试其他篮子~`, true);
                    else if (targetPairId !== currentDragId) showMessage(`配对错误 ❌ “${dragQuestion.num}” 不等于这个读法，再想想读法规则~`, true);
                    else showMessage("再试一试吧！", true);
                }
            } else {
                if (!targetBasket) showMessage("要把数字卡片拖到读法篮子上方哦～", true);
                else showMessage("配对没有成功，再试试看！", true);
            }
            cleanDrag();
        };

        const cleanDrag = () => {
            if (dragClone && dragClone.parentNode) dragClone.parentNode.removeChild(dragClone);
            if (activeDragCard) activeDragCard.classList.remove('dragging');
            dragClone = null;
            activeDragCard = null;
            isDragging = false;
            currentDragId = null;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
            window.removeEventListener('touchcancel', onEnd);
        };

        element.addEventListener('mousedown', onStart);
        element.addEventListener('touchstart', onStart, { passive: false });
    }

    // 新游戏（重新随机）
    function resetAndNewGame() {
        initNewGame();
    }

    // 初始化页面
    newGameBtn.addEventListener('click', () => {
        resetAndNewGame();
    });

    initNewGame();
</script>
</body>
</html>