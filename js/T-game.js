// 立即执行函数，确保代码在所有其他脚本之前运行
(function () {
    // 游戏状态
    const gameState = {
        completedLevels: 0,
        levels: {
            1: false,
            2: false,
            3: false
        }
    };

    // 游戏配置
    const gameConfig = {
        level1: {
            targetThickness: 1, // 目标发丝粗细
            initialThickness: 8, // 初始发丝粗细
            maxTime: 30, // 最大时间（秒）
            colors: ['#8b5a2b', '#cd853f', '#a0522d', '#654321'] // 发丝颜色
        },
        level2: {
            patterns: [
                { name: '平针', description: '平针是最基本的针法，适合直线和简单图案', image: null },
                { name: '打籽针', description: '打籽针形成颗粒状效果，适合点缀', image: null },
                { name: '套针', description: '套针层层相套，适合表现色彩过渡', image: null },
                { name: '缠针', description: '缠针线条流畅，适合曲线和轮廓', image: null },
                { name: '滚针', description: '滚针连续紧密，适合表现细腻纹理', image: null },
                { name: '齐针', description: '齐针排列整齐，适合大面积填充', image: null }
            ],
            questions: [
                {
                    pattern: '平针',
                    hint: '适合直线和简单图案的基本针法',
                    correctAnswer: '平针'
                },
                {
                    pattern: '打籽针',
                    hint: '形成颗粒状效果，适合点缀',
                    correctAnswer: '打籽针'
                },
                {
                    pattern: '套针',
                    hint: '层层相套，适合表现色彩过渡',
                    correctAnswer: '套针'
                }
            ]
        },
        level3: {
            // 预添加的图片设置方案
            currentImage: {
                name: '赣发绣作品',
                // 使用图片替代SVG
                imageUrl: 'img/gongxu/GX-1.png'
            },
            elements: [
                { name: '天空', colors: ['#87ceeb', '#b0e0e6', '#e0ffff'] },
                { name: '山峰', colors: ['#8b5a2b', '#654321', '#a0522d'] },
                { name: '湖水', colors: ['#4169e1', '#1e90ff', '#87ceeb'] },
                { name: '树木', colors: ['#228b22', '#32cd32', '#98fb98'] }
            ],
            targetScore: 80 // 目标分数
        }
    };

    // 初始化游戏
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOM loaded, initializing game...');

        // 强制重置DOM状态
        resetDOMState();

        // 添加页面加载动画
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.classList.add('fade-in');
        }

        // 确保Canvas元素已加载
        setTimeout(() => {
            initLevel1();
            initLevel2();
            initLevel3();
            checkAllLevelsCompleted();
        }, 100);
    });

    // 强制重置DOM状态
    function resetDOMState() {
        console.log('Resetting DOM state...');

        // 重置所有关卡状态
        const levels = [1, 2, 3];
        levels.forEach(levelNum => {
            const statusEl = document.getElementById(`level${levelNum}-status`);
            const levelEl = document.getElementById(`level${levelNum}`);

            if (statusEl) {
                statusEl.textContent = '未完成';
                statusEl.classList.remove('completed');
            }

            if (levelEl) {
                levelEl.classList.remove('completed');
            }
        });

        // 重置视频区域
        const videoSection = document.getElementById('video-section');
        if (videoSection) {
            videoSection.classList.remove('visible');
        }
    }

    // 初始化第一关：分丝挑战
    function initLevel1() {
        console.log('Initializing level 1: 分丝挑战');
        const canvas = document.getElementById('canvas1');
        if (!canvas) {
            console.error('Canvas1 not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        const level = document.getElementById('level1');
        const status = document.getElementById('level1-status');

        let currentThickness = gameConfig.level1.initialThickness;
        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let dragStartThickness = gameConfig.level1.initialThickness;
        let gameStarted = false;
        let startTime = null;
        let elapsedTime = 0;
        let completed = false;

        // 确保状态正确初始化
        if (status) {
            status.textContent = '未完成';
            status.classList.remove('completed');
        }
        if (level) {
            level.classList.remove('completed');
        }

        // 绘制游戏界面
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制背景
            ctx.fillStyle = '#f9f3e9';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 绘制发丝
            drawHair();

            // 绘制目标区域
            drawTargetArea();

            // 绘制时间
            if (gameStarted && !completed) {
                elapsedTime = (Date.now() - startTime) / 1000;
                const timeLeft = Math.max(0, gameConfig.level1.maxTime - elapsedTime);
                drawTimer(timeLeft);

                if (timeLeft <= 0) {
                    gameOver();
                }
            }

            // 绘制开始提示
            if (!gameStarted && !completed) {
                drawStartPrompt();
            }

            // 检查是否完成
            if (currentThickness <= gameConfig.level1.targetThickness && !completed) {
                completeLevel1();
            }
        }

        // 绘制发丝
        function drawHair() {
            const centerX = canvas.width / 2;
            const startY = 80;
            const endY = canvas.height - 120;

            // 绘制发丝主体
            ctx.strokeStyle = '#8b5a2b';
            ctx.lineWidth = currentThickness;
            ctx.beginPath();
            ctx.moveTo(centerX, startY);
            ctx.lineTo(centerX, endY);
            ctx.stroke();

            // 绘制发丝光泽
            if (currentThickness > 2) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.lineWidth = Math.max(1, currentThickness / 3);
                ctx.beginPath();
                ctx.moveTo(centerX - currentThickness / 4, startY + 10);
                ctx.lineTo(centerX - currentThickness / 4, endY - 10);
                ctx.stroke();
            }

            // 绘制发丝头部
            ctx.fillStyle = '#8b5a2b';
            ctx.beginPath();
            ctx.arc(centerX, startY, currentThickness * 1.5, 0, Math.PI * 2);
            ctx.fill();

            // 绘制发丝尾部
            ctx.beginPath();
            ctx.moveTo(centerX - currentThickness / 2, endY);
            ctx.lineTo(centerX, endY + currentThickness * 2);
            ctx.lineTo(centerX + currentThickness / 2, endY);
            ctx.fill();
        }

        // 绘制目标区域
        function drawTargetArea() {
            const areaWidth = canvas.width * 0.8;
            const areaHeight = 60;
            const areaX = (canvas.width - areaWidth) / 2;
            const areaY = canvas.height - 100;

            // 绘制目标区域背景
            ctx.fillStyle = 'rgba(240, 255, 240, 0.5)';
            ctx.fillRect(areaX, areaY, areaWidth, areaHeight);
            ctx.strokeStyle = '#228b22';
            ctx.lineWidth = 2;
            ctx.strokeRect(areaX, areaY, areaWidth, areaHeight);

            // 绘制目标粗细指示
            ctx.fillStyle = '#333';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`目标粗细: ${gameConfig.level1.targetThickness}px`, canvas.width / 2, areaY + 25);

            // 绘制当前粗细
            ctx.fillStyle = '#8b5a2b';
            ctx.font = '16px Arial';
            ctx.fillText(`当前粗细: ${currentThickness.toFixed(1)}px`, canvas.width / 2, areaY + 50);

            // 绘制目标粗细示例
            ctx.strokeStyle = '#8b5a2b';
            ctx.lineWidth = gameConfig.level1.targetThickness;
            ctx.beginPath();
            ctx.moveTo(areaX + 20, areaY + areaHeight / 2);
            ctx.lineTo(areaX + 60, areaY + areaHeight / 2);
            ctx.stroke();
        }

        // 绘制计时器
        function drawTimer(timeLeft) {
            ctx.fillStyle = '#333';
            ctx.font = '18px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`时间: ${Math.ceil(timeLeft)}s`, 20, 30);

            // 绘制进度条
            const barWidth = canvas.width * 0.6;
            const barHeight = 10;
            const barX = (canvas.width - barWidth) / 2;
            const barY = 40;

            // 背景条
            ctx.fillStyle = '#e0e0e0';
            ctx.fillRect(barX, barY, barWidth, barHeight);

            // 进度条
            const progress = timeLeft / gameConfig.level1.maxTime;
            ctx.fillStyle = progress > 0.3 ? '#228b22' : '#ff6347';
            ctx.fillRect(barX, barY, barWidth * progress, barHeight);
        }

        // 绘制开始提示
        function drawStartPrompt() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('点击开始游戏', canvas.width / 2, canvas.height / 2);

            ctx.font = '16px Arial';
            ctx.fillText('按住并左右拖动，拆分发丝至目标粗细', canvas.width / 2, canvas.height / 2 + 30);
        }

        // 游戏结束
        function gameOver() {
            gameStarted = false;
            alert('时间到！游戏结束，请重新开始。');
            resetLevel1();
        }

        // 重置第一关
        function resetLevel1() {
            currentThickness = gameConfig.level1.initialThickness;
            dragStartThickness = gameConfig.level1.initialThickness;
            gameStarted = false;
            completed = false;
        }

        // 完成第一关
        function completeLevel1() {
            console.log('Level 1 completed');
            completed = true;
            gameState.levels[1] = true;
            gameState.completedLevels++;

            if (status) {
                status.textContent = '已完成';
                status.classList.add('completed');
                status.style.animation = 'pulse 1s ease-in-out';
            }

            if (level) {
                level.classList.add('completed');
                level.style.animation = 'pulse 1s ease-in-out';
            }

            checkAllLevelsCompleted();
        }

        // 鼠标事件
        canvas.addEventListener('mousedown', function (e) {
            if (!gameStarted && !completed) {
                gameStarted = true;
                startTime = Date.now();
            }

            if (gameStarted && !completed) {
                isDragging = true;
                const rect = canvas.getBoundingClientRect();
                dragStartX = e.clientX - rect.left;
                dragStartY = e.clientY - rect.top;
                dragStartThickness = currentThickness;
            }
        });

        canvas.addEventListener('mousemove', function (e) {
            if (isDragging && gameStarted && !completed) {
                const rect = canvas.getBoundingClientRect();
                const currentX = e.clientX - rect.left;
                const dragDistance = Math.abs(currentX - dragStartX);

                const thicknessReduction = dragDistance / 20;
                currentThickness = Math.max(gameConfig.level1.targetThickness,
                    dragStartThickness - thicknessReduction);
            }
        });

        canvas.addEventListener('mouseup', function (e) {
            isDragging = false;
            dragStartX = 0;
            dragStartY = 0;
        });

        // 触摸事件
        canvas.addEventListener('touchstart', function (e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, { passive: false });

        canvas.addEventListener('touchmove', function (e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, { passive: false });

        canvas.addEventListener('touchend', function (e) {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas.dispatchEvent(mouseEvent);
        }, { passive: false });

        // 游戏主循环
        function gameLoop() {
            draw();
            requestAnimationFrame(gameLoop);
        }

        // 初始化
        gameLoop();
    }

    // 初始化第二关：针法匹配
    function initLevel2() {
        console.log('Initializing level 2: 针法匹配');
        const canvas = document.getElementById('canvas2');
        if (!canvas) {
            console.error('Canvas2 not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        const level = document.getElementById('level2');
        const status = document.getElementById('level2-status');

        let currentQuestionIndex = 0;
        let selectedAnswer = null;
        let correctAnswers = 0;
        let completed = false;
        let gameStarted = false;
        let feedbackText = '';
        let feedbackTimer = 0;

        // 确保状态正确初始化
        if (status) {
            status.textContent = '未完成';
            status.classList.remove('completed');
        }
        if (level) {
            level.classList.remove('completed');
        }

        // 绘制游戏界面
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制背景
            ctx.fillStyle = '#f9f3e9';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (!gameStarted && !completed) {
                drawStartPrompt();
            } else if (!completed) {
                drawCurrentQuestion();
                drawAnswerOptions();
                drawFeedback();

                // 更新反馈计时器
                if (feedbackTimer > 0) {
                    feedbackTimer--;
                    if (feedbackTimer === 0) {
                        feedbackText = '';
                    }
                }
            } else {
                drawCompletionMessage();
            }
        }

        // 绘制开始提示
        function drawStartPrompt() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('点击开始游戏', canvas.width / 2, canvas.height / 2);

            ctx.font = '16px Arial';
            ctx.fillText('根据提示选择正确的针法', canvas.width / 2, canvas.height / 2 + 30);
        }

        // 绘制当前问题
        function drawCurrentQuestion() {
            if (!gameConfig.level2 || !gameConfig.level2.questions || !gameConfig.level2.patterns) {
                console.error('游戏配置不完整');
                return;
            }

            const question = gameConfig.level2.questions[currentQuestionIndex];
            const pattern = gameConfig.level2.patterns.find(p => p.name === question.pattern);

            // 绘制问题区域
            const questionAreaWidth = canvas.width * 0.9;
            const questionAreaHeight = 220;
            const questionAreaX = (canvas.width - questionAreaWidth) / 2;
            const questionAreaY = 20;

            // 背景
            ctx.fillStyle = '#fff';
            ctx.fillRect(questionAreaX, questionAreaY, questionAreaWidth, questionAreaHeight);
            ctx.strokeStyle = '#8b5a2b';
            ctx.lineWidth = 2;
            ctx.strokeRect(questionAreaX, questionAreaY, questionAreaWidth, questionAreaHeight);

            // 问题标题
            ctx.fillStyle = '#333';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('请选择正确的针法', canvas.width / 2, questionAreaY + 25);

            // 绘制针法效果示例（居中显示）
            const exampleSize = 90;
            const exampleX = (canvas.width - exampleSize) / 2;
            const exampleY = questionAreaY + 40;
            drawPatternExample(question.pattern, exampleX, exampleY, exampleSize, exampleSize);

            // 提示信息（图案下方）
            ctx.fillStyle = '#666';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`提示: ${question.hint}`, canvas.width / 2, questionAreaY + 150);

            // 针法描述（提示下方）
            if (pattern) {
                ctx.fillStyle = '#8b5a2b';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`描述: ${pattern.description}`, canvas.width / 2, questionAreaY + 175);
            }
        }

        // 绘制针法效果示例
        function drawPatternExample(patternName, x, y, width, height) {
            // 绘制示例背景
            ctx.fillStyle = '#f9f3e9';
            ctx.fillRect(x, y, width, height);
            ctx.strokeStyle = '#8b5a2b';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, width, height);

            // 保存当前状态
            ctx.save();

            // 移动到示例区域
            ctx.translate(x, y);

            // 绘制针法效果
            switch (patternName) {
                case '平针':
                    // 绘制平针效果
                    ctx.strokeStyle = '#8b5a2b';
                    ctx.lineWidth = 2;
                    for (let i = 10; i < height; i += 10) {
                        ctx.beginPath();
                        ctx.moveTo(5, i);
                        ctx.lineTo(width - 5, i);
                        ctx.stroke();
                    }
                    break;
                case '打籽针':
                    // 绘制打籽针效果
                    ctx.fillStyle = '#8b5a2b';
                    for (let i = 10; i < width; i += 15) {
                        for (let j = 10; j < height; j += 15) {
                            ctx.beginPath();
                            ctx.arc(i, j, 3, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    break;
                case '套针':
                    // 绘制套针效果
                    ctx.strokeStyle = '#8b5a2b';
                    ctx.lineWidth = 2;
                    for (let i = 0; i < 3; i++) {
                        ctx.beginPath();
                        ctx.arc(width / 2, height / 2, 10 + i * 8, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                    break;
                case '缠针':
                    // 绘制缠针效果
                    ctx.strokeStyle = '#8b5a2b';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    for (let i = 0; i < Math.PI * 2; i += 0.1) {
                        const cx = Math.cos(i) * (width / 5) + width / 2;
                        const cy = Math.sin(i) * (height / 5) + height / 2;
                        if (i === 0) {
                            ctx.moveTo(cx, cy);
                        } else {
                            ctx.lineTo(cx, cy);
                        }
                    }
                    ctx.stroke();
                    break;
                case '滚针':
                    // 绘制滚针效果
                    ctx.strokeStyle = '#8b5a2b';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    for (let i = 0; i < width; i += 5) {
                        const y = height / 2 + Math.sin(i * 0.2) * 8;
                        if (i === 0) {
                            ctx.moveTo(i, y);
                        } else {
                            ctx.lineTo(i, y);
                        }
                    }
                    ctx.stroke();
                    break;
                case '齐针':
                    // 绘制齐针效果
                    ctx.strokeStyle = '#8b5a2b';
                    ctx.lineWidth = 1;
                    for (let i = 2; i < width; i += 4) {
                        ctx.beginPath();
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i, height);
                        ctx.stroke();
                    }
                    break;
                default:
                    // 绘制默认图案
                    ctx.fillStyle = '#8b5a2b';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('图案', width / 2, height / 2);
                    break;
            }

            // 恢复状态
            ctx.restore();
        }

        // 绘制答案选项
        function drawAnswerOptions() {
            if (!gameConfig.level2 || !gameConfig.level2.patterns) {
                console.error('游戏配置不完整');
                return;
            }

            const optionHeight = 35;
            const optionSpacing = 6;
            const startY = 250;
            const maxOptions = 4; // 只显示4个选项

            // 只显示前4个选项
            gameConfig.level2.patterns.slice(0, maxOptions).forEach((pattern, index) => {
                const y = startY + index * (optionHeight + optionSpacing);

                // 检查是否超出画布范围
                if (y + optionHeight > canvas.height - 20) {
                    return; // 超出范围，不再绘制
                }

                // 绘制选项背景
                ctx.fillStyle = selectedAnswer === pattern ? '#f0f0f0' : '#fff';
                ctx.fillRect(30, y, canvas.width - 60, optionHeight);
                ctx.strokeStyle = selectedAnswer === pattern ? '#8b5a2b' : '#e0e0e0';
                ctx.lineWidth = selectedAnswer === pattern ? 2 : 1;
                ctx.strokeRect(30, y, canvas.width - 60, optionHeight);

                // 绘制选项文本
                ctx.fillStyle = '#333';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(pattern.name, canvas.width / 2, y + optionHeight / 2 + 4);
            });
        }

        // 绘制反馈
        function drawFeedback() {
            if (feedbackText) {
                ctx.fillStyle = feedbackText.includes('正确') ? '#228b22' : '#ff6347';
                ctx.font = 'bold 18px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(feedbackText, canvas.width / 2, canvas.height - 40);
            }
        }

        // 绘制完成消息
        function drawCompletionMessage() {
            ctx.fillStyle = '#333';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('恭喜完成第二关！', canvas.width / 2, canvas.height / 2);

            ctx.font = '18px Arial';
            ctx.fillText(`答对了 ${correctAnswers} 题`, canvas.width / 2, canvas.height / 2 + 40);
        }

        // 检查答案
        function checkAnswer() {
            if (!gameConfig.level2 || !gameConfig.level2.questions) {
                console.error('游戏配置不完整');
                return;
            }

            const currentQuestion = gameConfig.level2.questions[currentQuestionIndex];

            if (selectedAnswer && selectedAnswer.name === currentQuestion.correctAnswer) {
                correctAnswers++;
                feedbackText = '回答正确！';
                feedbackTimer = 60;

                // 进入下一题或完成关卡
                currentQuestionIndex++;
                if (currentQuestionIndex >= gameConfig.level2.questions.length) {
                    completeLevel2();
                }
            } else {
                feedbackText = '回答错误，请再试一次！';
                feedbackTimer = 60;
            }

            // 重置选择
            selectedAnswer = null;
        }

        // 游戏结束
        function gameOver() {
            gameStarted = false;
            alert('游戏结束，请重新开始。');
            resetLevel2();
        }

        // 重置第二关
        function resetLevel2() {
            currentQuestionIndex = 0;
            selectedAnswer = null;
            correctAnswers = 0;
            completed = false;
            feedbackText = '';
            feedbackTimer = 0;
        }

        // 完成第二关
        function completeLevel2() {
            console.log('Level 2 completed');
            completed = true;
            gameState.levels[2] = true;
            gameState.completedLevels++;

            if (status) {
                status.textContent = '已完成';
                status.classList.add('completed');
                status.style.animation = 'pulse 1s ease-in-out';
            }

            if (level) {
                level.classList.add('completed');
                level.style.animation = 'pulse 1s ease-in-out';
            }

            checkAllLevelsCompleted();
        }

        // 鼠标点击事件
        canvas.addEventListener('click', function (e) {
            if (!gameConfig.level2 || !gameConfig.level2.patterns) {
                console.error('游戏配置不完整');
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (!gameStarted && !completed) {
                gameStarted = true;
                return;
            }

            if (gameStarted && !completed) {
                // 检查是否点击了选项
                const optionHeight = 35;
                const optionSpacing = 6;
                const startY = 250;
                const maxOptions = 4; // 只检查前4个选项

                gameConfig.level2.patterns.slice(0, maxOptions).forEach((pattern, index) => {
                    const optionY = startY + index * (optionHeight + optionSpacing);
                    // 检查是否在有效范围内
                    if (optionY + optionHeight <= canvas.height - 20 &&
                        x >= 30 && x <= canvas.width - 30 &&
                        y >= optionY && y <= optionY + optionHeight) {
                        selectedAnswer = pattern;

                        // 短暂延迟后检查答案
                        setTimeout(() => {
                            checkAnswer();
                        }, 300);
                    }
                });
            }
        });

        // 触摸事件
        canvas.addEventListener('touchstart', function (e) {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('click', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        // 游戏主循环
        function gameLoop() {
            draw();
            requestAnimationFrame(gameLoop);
        }

        // 初始化
        gameLoop();
    }

    // 初始化第三关：色彩搭配（在Canvas上绘制选项）
function initLevel3() {
    console.log('Initializing level 3: 色彩搭配');
    const canvas = document.getElementById('canvas3');
    if (!canvas) {
        console.error('Canvas3 not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const level = document.getElementById('level3');
    const status = document.getElementById('level3-status');
    
    let currentElementIndex = 0;
    let selectedColors = {};
    let score = 0;
    let completed = false;
    let gameStarted = false;
    let embroideryImage = null;
    let selectedColorIndex = -1;

    // 确保状态正确初始化
    if (status) {
        status.textContent = '未完成';
        status.classList.remove('completed');
    }

    if (level) {
        level.classList.remove('completed');
    }

    // 初始化选择的颜色
    function initSelectedColors() {
        selectedColors = {};
        if (gameConfig.level3 && gameConfig.level3.elements) {
            gameConfig.level3.elements.forEach(element => {
                selectedColors[element.name] = null;
            });
            console.log('初始化颜色选择:', selectedColors);
        } else {
            console.error('gameConfig.level3.elements 未定义');
        }
    }

    // 加载发绣图片
    function loadEmbroideryImage() {
        console.log('加载发绣图片...');
        if (!gameConfig.level3 || !gameConfig.level3.currentImage || !gameConfig.level3.currentImage.imageUrl) {
            console.error('发绣图片配置未定义');
            return;
        }
        
        const imgUrl = gameConfig.level3.currentImage.imageUrl;
        const img = new Image();
        
        try {
            img.onload = () => {
                console.log('发绣图片加载成功');
                embroideryImage = img;
            };
            
            img.onerror = () => {
                console.error('发绣图片加载失败');
                embroideryImage = null;
            };
            
            img.src = imgUrl;
        } catch (error) {
            console.error('加载图片出错:', error);
            embroideryImage = null;
        }
    }

    // 绘制任务显示
    function drawTaskDisplay() {
        if (!gameConfig.level3 || !gameConfig.level3.elements) {
            console.error('gameConfig.level3.elements 未定义');
            return;
        }
        
        const currentElement = gameConfig.level3.elements[currentElementIndex];
        
        // 绘制任务区域
        const taskAreaWidth = canvas.width * 0.9;
        const taskAreaHeight = 60;
        const taskAreaX = (canvas.width - taskAreaWidth) / 2;
        const taskAreaY = 20;
        
        // 背景
        ctx.fillStyle = '#fff';
        ctx.fillRect(taskAreaX, taskAreaY, taskAreaWidth, taskAreaHeight);
        ctx.strokeStyle = '#8b5a2b';
        ctx.lineWidth = 2;
        ctx.strokeRect(taskAreaX, taskAreaY, taskAreaWidth, taskAreaHeight);
        
        // 任务文本
        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        if (currentElement) {
            ctx.fillText(`任务：为 ${currentElement.name} 选择合适的颜色`, canvas.width / 2, taskAreaY + 35);
        } else {
            ctx.fillText('任务：选择合适的颜色', canvas.width / 2, taskAreaY + 35);
        }
    }

    // 绘制颜色选项
    function drawColorOptions() {
        if (!gameConfig.level3 || !gameConfig.level3.elements) {
            console.error('gameConfig.level3.elements 未定义');
            return;
        }
        
        const currentElement = gameConfig.level3.elements[currentElementIndex];
        if (!currentElement) {
            console.error('当前元素未定义:', currentElementIndex);
            return;
        }
        
        const colorOptions = currentElement.colors || [];
        
        // 绘制标题
        ctx.fillStyle = '#666';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('选择颜色：', 30, 100);
        
        // 绘制颜色选项（水平排列）
        const optionWidth = (canvas.width - 80) / colorOptions.length;
        const optionHeight = 40;
        const startX = 30;
        const startY = 110;
        
        colorOptions.forEach((color, index) => {
            const x = startX + index * (optionWidth + 10);
            
            // 绘制选项背景
            ctx.fillStyle = color;
            ctx.fillRect(x, startY, optionWidth, optionHeight);
            ctx.strokeStyle = selectedColorIndex === index ? '#8b5a2b' : '#e0e0e0';
            ctx.lineWidth = selectedColorIndex === index ? 3 : 1;
            ctx.strokeRect(x, startY, optionWidth, optionHeight);
            
            // 绘制颜色名称
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(getColorName(color), x + optionWidth / 2, startY + optionHeight / 2 + 4);
        });
    }

    // 绘制已选择的颜色
    function drawSelectedColors() {
        const startY = 170;
        
        // 绘制标题
        ctx.fillStyle = '#666';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('已选择的颜色：', 30, startY);
        
        // 绘制已选择的颜色
        if (gameConfig.level3 && gameConfig.level3.elements) {
            let x = 30;
            const y = startY + 20;
            const itemHeight = 30;
            
            gameConfig.level3.elements.forEach(element => {
                if (selectedColors[element.name]) {
                    const itemWidth = 100;
                    
                    // 绘制背景
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(x, y, itemWidth, itemHeight);
                    ctx.strokeStyle = '#e0e0e0';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, itemWidth, itemHeight);
                    
                    // 绘制颜色预览
                    ctx.fillStyle = selectedColors[element.name];
                    ctx.fillRect(x + 5, y + 5, 20, 20);
                    ctx.strokeStyle = '#333';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x + 5, y + 5, 20, 20);
                    
                    // 绘制元素名称
                    ctx.fillStyle = '#333';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'left';
                    ctx.fillText(element.name, x + 35, y + 18);
                    
                    x += itemWidth + 10;
                }
            });
        }
    }

    // 绘制进度显示
    function drawProgressDisplay() {
        if (!gameConfig.level3 || !gameConfig.level3.elements) {
            console.error('gameConfig.level3.elements 未定义');
            return;
        }
        
        const totalElements = gameConfig.level3.elements.length;
        const progress = (currentElementIndex + 1) / totalElements;
        
        const progressBarWidth = canvas.width * 0.8;
        const progressBarHeight = 10;
        const progressBarX = (canvas.width - progressBarWidth) / 2;
        const progressBarY = 220;
        
        // 绘制进度条背景
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);
        
        // 绘制进度条
        ctx.fillStyle = '#8b5a2b';
        ctx.fillRect(progressBarX, progressBarY, progressBarWidth * progress, progressBarHeight);
        
        // 绘制进度文本
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${currentElementIndex + 1}/${totalElements}`, canvas.width / 2, progressBarY + 25);
    }

    // 绘制发绣图片预览
    function drawLandscapePreview() {
        // 调整图片位置，与第二关图案位置保持一致
        const previewWidth = canvas.width * 0.7;
        const previewHeight = canvas.height * 0.3;
        const previewX = (canvas.width - previewWidth) / 2;
        const previewY = 260;
        
        // 背景
        ctx.fillStyle = '#fff';
        ctx.fillRect(previewX, previewY, previewWidth, previewHeight);
        ctx.strokeStyle = '#8b5a2b';
        ctx.lineWidth = 2;
        ctx.strokeRect(previewX, previewY, previewWidth, previewHeight);
        
        // 绘制图片
        if (embroideryImage) {
            try {
                // 计算图片绘制尺寸，保持比例
                let drawWidth, drawHeight;
                const imgRatio = embroideryImage.width / embroideryImage.height;
                const canvasRatio = previewWidth / previewHeight;
                
                if (imgRatio > canvasRatio) {
                    // 图片比画布宽
                    drawWidth = previewWidth;
                    drawHeight = drawWidth / imgRatio;
                } else {
                    // 图片比画布高
                    drawHeight = previewHeight;
                    drawWidth = drawHeight * imgRatio;
                }
                
                // 计算绘制位置（居中）
                const drawX = previewX + (previewWidth - drawWidth) / 2;
                const drawY = previewY + (previewHeight - drawHeight) / 2;
                
                // 绘制图片
                ctx.drawImage(embroideryImage, drawX, drawY, drawWidth, drawHeight);
                
                // 绘制图片名称
                const currentImageConfig = gameConfig.level3 && gameConfig.level3.currentImage ? gameConfig.level3.currentImage : { name: '赣发绣作品' };
                ctx.fillStyle = '#8b5a2b';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(currentImageConfig.name, canvas.width / 2, previewY + previewHeight + 20);
            } catch (error) {
                console.error('绘制图片出错:', error);
                // 绘制错误信息
                drawFallbackImage(previewX, previewY, previewWidth, previewHeight);
            }
        } else {
            // 图片加载失败时的备用显示
            drawFallbackImage(previewX, previewY, previewWidth, previewHeight);
        }
    }

    // 绘制备用图片
    function drawFallbackImage(x, y, width, height) {
        // 绘制背景
        ctx.fillStyle = '#f9f3e9';
        ctx.fillRect(x, y, width, height);
        
        // 绘制简单的山水图案
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        
        // 天空
        ctx.fillStyle = '#87ceeb';
        ctx.fillRect(x, y, width, height * 0.4);
        
        // 山峰
        ctx.fillStyle = '#8b5a2b';
        ctx.beginPath();
        ctx.moveTo(x, y + height * 0.4);
        ctx.lineTo(x + width * 0.3, y + height * 0.1);
        ctx.lineTo(x + width * 0.7, y + height * 0.2);
        ctx.lineTo(x + width, y + height * 0.4);
        ctx.closePath();
        ctx.fill();
        
        // 湖水
        ctx.fillStyle = '#4169e1';
        ctx.fillRect(x, y + height * 0.4, width, height * 0.6);
        
        // 树木
        ctx.fillStyle = '#228b22';
        ctx.fillRect(x + width * 0.2, y + height * 0.3, width * 0.05, height * 0.2);
        ctx.beginPath();
        ctx.arc(x + width * 0.225, y + height * 0.3, width * 0.1, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#228b22';
        ctx.fillRect(x + width * 0.7, y + height * 0.35, width * 0.04, height * 0.15);
        ctx.beginPath();
        ctx.arc(x + width * 0.72, y + height * 0.35, width * 0.08, 0, Math.PI * 2);
        ctx.fill();
        
        // 文字说明
        ctx.fillStyle = '#8b5a2b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('赣发绣作品', centerX, y + height + 20);
    }

    // 计算颜色得分
    function calculateColorScore(element, color) {
        if (!element || !element.colors) {
            console.error('元素或颜色未定义');
            return 0;
        }
        
        const colorIndex = element.colors.indexOf(color);
        
        // 颜色越靠前得分越高
        return 30 - (colorIndex * 5);
    }

    // 完成当前元素颜色选择
    function completeColorSelection(color) {
        if (!gameConfig.level3 || !gameConfig.level3.elements) {
            console.error('gameConfig.level3.elements 未定义');
            return;
        }
        
        const currentElement = gameConfig.level3.elements[currentElementIndex];
        if (!currentElement) {
            console.error('当前元素未定义:', currentElementIndex);
            return;
        }
        
        selectedColors[currentElement.name] = color;
        console.log('选择颜色:', color, '为', currentElement.name);
        
        // 计算得分
        const elementScore = calculateColorScore(currentElement, color);
        score += elementScore;
        console.log('获得分数:', elementScore, '总分:', score);
        
        // 进入下一个元素或完成关卡
        currentElementIndex++;
        selectedColorIndex = -1;
        console.log('进入下一个元素:', currentElementIndex);
        
        if (currentElementIndex >= gameConfig.level3.elements.length) {
            // 所有元素都完成了
            console.log('所有元素完成，结束关卡');
            completeLevel3();
        }
    }

    // 重置第三关
    function resetLevel3() {
        currentElementIndex = 0;
        selectedColors = {};
        score = 0;
        completed = false;
        gameStarted = false;
        selectedColorIndex = -1;
        
        // 重新初始化
        initSelectedColors();
    }

    // 完成第三关
    function completeLevel3() {
        console.log('Level 3 completed');
        completed = true;
        gameState.levels[3] = true;
        gameState.completedLevels++;
        
        if (status) {
            status.textContent = '已完成';
            status.classList.add('completed');
            status.style.animation = 'pulse 1s ease-in-out';
        }
        
        if (level) {
            level.classList.add('completed');
            level.style.animation = 'pulse 1s ease-in-out';
        }
        
        checkAllLevelsCompleted();
    }

    // 鼠标点击事件（Canvas上的点击用于开始游戏和选择颜色）
    canvas.addEventListener('click', function (e) {
        console.log('第三关Canvas点击事件:', { gameStarted, completed });
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (!gameStarted && !completed) {
            console.log('开始第三关游戏');
            gameStarted = true;
        } else if (gameStarted && !completed) {
            // 检查是否点击了颜色选项
            if (y >= 110 && y <= 150) {
                if (!gameConfig.level3 || !gameConfig.level3.elements) {
                    return;
                }
                
                const currentElement = gameConfig.level3.elements[currentElementIndex];
                if (!currentElement) {
                    return;
                }
                
                const colorOptions = currentElement.colors || [];
                const optionWidth = (canvas.width - 80) / colorOptions.length;
                const startX = 30;
                
                colorOptions.forEach((color, index) => {
                    const optionX = startX + index * (optionWidth + 10);
                    if (x >= optionX && x <= optionX + optionWidth) {
                        selectedColorIndex = index;
                        completeColorSelection(color);
                    }
                });
            }
        }
    });

    // 触摸事件
    canvas.addEventListener('touchstart', function (e) {
        try {
            e.preventDefault();
            const touch = e.touches[0];
            if (touch) {
                const mouseEvent = new MouseEvent('click', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }
        } catch (error) {
            console.error('触摸事件处理出错:', error);
        }
    });

    // 绘制游戏界面
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制背景
        ctx.fillStyle = '#f9f3e9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (!gameStarted && !completed) {
            // 绘制开始提示
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('点击开始游戏', canvas.width / 2, canvas.height / 2);
            
            ctx.font = '16px Arial';
            ctx.fillText('为每个元素选择合适的颜色', canvas.width / 2, canvas.height / 2 + 30);
        } else if (!completed) {
            // 绘制任务显示
            drawTaskDisplay();
            // 绘制颜色选项
            drawColorOptions();
            // 绘制已选择的颜色
            drawSelectedColors();
            // 绘制进度显示
            drawProgressDisplay();
            // 绘制发绣图片预览
            drawLandscapePreview();
        } else {
            // 绘制完成消息
            ctx.fillStyle = '#333';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('恭喜完成第三关！', canvas.width / 2, canvas.height / 2);
            
            ctx.font = '18px Arial';
            ctx.fillText(`最终分数: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
        }
    }

    // 确保canvas可获取焦点
    canvas.tabIndex = 0;

    // 获取颜色名称的辅助函数
    function getColorName(color) {
        const colorMap = {
            '#87ceeb': '天蓝色',
            '#b0e0e6': '浅蓝色',
            '#e0ffff': '淡蓝色',
            '#8b5a2b': '棕色',
            '#654321': '深棕色',
            '#a0522d': '红棕色',
            '#4169e1': '深蓝色',
            '#1e90ff': '道奇蓝',
            '#228b22': '森林绿',
            '#32cd32': 'lime绿',
            '#98fb98': '淡绿色'
        };
        return colorMap[color] || color;
    }

    // 初始化
    initSelectedColors();
    loadEmbroideryImage();

    // 游戏主循环
    function gameLoop() {
        draw();
        requestAnimationFrame(gameLoop);
    }

    // 启动游戏循环
    gameLoop();
}

    // 检查是否所有关卡都已完成
    function checkAllLevelsCompleted() {
        console.log('Checking all levels completed:', gameState.completedLevels);

        if (gameState.completedLevels === 3) {
            unlockVideo();
        }
    }

    // 解锁视频
    function unlockVideo() {
        console.log('Unlocking video');
        const videoSection = document.getElementById('video-section');
        if (videoSection) {
            videoSection.classList.add('visible');
            videoSection.style.animation = 'fadeInUp 1s ease forwards';
        }
    }
})();
