// 问答数据
const quizData = [
    {
        question: "发绣起源于哪个朝代？",
        options: ["唐朝", "宋朝", "明朝", "清朝"],
        correctAnswer: 0,
        work: {
            title: "唐代发绣佛像",
            description: "唐代发绣以佛教造像为主，体现了当时宗教艺术的繁荣。",
            image: "img/timeline1.jpg"
        }
    },
    {
        question: "发绣被列入国家级非物质文化遗产名录是在哪一年？",
        options: ["2006年", "2008年", "2010年", "2012年"],
        correctAnswer: 1,
        work: {
            title: "现代发绣精品",
            description: "当代发绣在传统基础上创新发展，题材更加丰富多样。",
            image: "img/timeline6.jpg"
        }
    },
    {
        question: "发绣的主要材料是什么？",
        options: ["丝线", "头发", "棉线", "麻线"],
        correctAnswer: 1,
        work: {
            title: "发绣材料展示",
            description: "发绣以人的头发为材料，具有自然色泽和不易褪色的特点。",
            image: "img/timeline3.jpg"
        }
    }
];

// 当前问答索引
let currentQuizIndex = 0;

// 初始化问答功能
function initQuiz() {
    const quizTrigger = document.getElementById('xiuyuan-quizTrigger');
    const quizContainer = document.getElementById('xiuyuan-quizContainer');
    const quizClose = document.getElementById('xiuyuan-quizClose');
    const quizSubmit = document.getElementById('xiuyuan-quizSubmit');
    const workModal = document.getElementById('xiuyuan-workModal');
    const workModalClose = document.getElementById('xiuyuan-workModalClose');
    
    // 打开问答面板
    if (quizTrigger) {
        quizTrigger.addEventListener('click', function() {
            quizContainer.style.display = 'block';
            loadQuizQuestion();
        });
    }
    
    // 关闭问答面板
    if (quizClose) {
        quizClose.addEventListener('click', function() {
            quizContainer.style.display = 'none';
        });
    }
    
    // 提交答案
    if (quizSubmit) {
        quizSubmit.addEventListener('click', function() {
            checkAnswer();
        });
    }
    
    // 关闭作品弹窗
    if (workModalClose) {
        workModalClose.addEventListener('click', function() {
            workModal.style.display = 'none';
        });
    }
    
    // 点击弹窗外部关闭
    if (workModal) {
        workModal.addEventListener('click', function(e) {
            if (e.target === workModal) {
                workModal.style.display = 'none';
            }
        });
    }
}

// 加载问答问题
function loadQuizQuestion() {
    const quizQuestion = document.getElementById('xiuyuan-quizQuestion');
    const quizOptions = document.getElementById('xiuyuan-quizOptions');
    
    if (!quizQuestion || !quizOptions) return;
    
    // 重置内容
    quizQuestion.textContent = '';
    quizOptions.innerHTML = '';
    
    // 获取当前问题
    const currentQuiz = quizData[currentQuizIndex];
    
    // 显示问题
    quizQuestion.textContent = currentQuiz.question;
    
    // 显示选项
    currentQuiz.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'xiuyuan-quiz-option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        // 添加点击事件
        optionElement.addEventListener('click', function() {
            // 移除其他选项的选中状态
            document.querySelectorAll('.xiuyuan-quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // 添加当前选项的选中状态
            this.classList.add('selected');
        });
        
        quizOptions.appendChild(optionElement);
    });
}

// 检查答案
function checkAnswer() {
    const selectedOption = document.querySelector('.xiuyuan-quiz-option.selected');
    const quizContent = document.getElementById('xiuyuan-quizContent');
    const workModal = document.getElementById('xiuyuan-workModal');
    const workTitle = document.getElementById('xiuyuan-workTitle');
    const workDesc = document.getElementById('xiuyuan-workDesc');
    const workImage = document.getElementById('xiuyuan-workImage');
    
    if (!selectedOption) {
        alert('请选择一个答案！');
        return;
    }
    
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const currentQuiz = quizData[currentQuizIndex];
    
    // 创建反馈元素
    const feedback = document.createElement('div');
    feedback.className = 'xiuyuan-quiz-feedback';
    
    if (selectedIndex === currentQuiz.correctAnswer) {
        // 正确答案
        feedback.className += ' correct';
        feedback.textContent = '回答正确！';
        
        // 显示作品弹窗
        if (workModal && workTitle && workDesc && workImage) {
            workTitle.textContent = currentQuiz.work.title;
            workDesc.textContent = currentQuiz.work.description;
            workImage.src = currentQuiz.work.image;
            workModal.style.display = 'flex';
        }
    } else {
        // 错误答案
        feedback.className += ' incorrect';
        feedback.textContent = '回答错误，请再试一次！';
    }
    
    // 添加反馈到界面
    quizContent.appendChild(feedback);
    
    // 3秒后移除反馈并加载下一题
    setTimeout(() => {
        feedback.remove();
        
        // 移动到下一题
        currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
        loadQuizQuestion();
    }, 3000);
}

// 初始化时间轴拖动功能
// 初始化时间轴拖动功能
function initTimelineDrag() {
    const timelineContainer = document.querySelector('.xiuyuan-timeline-container');
    const timeline = document.querySelector('.xiuyuan-timeline');
    
    if (!timelineContainer || !timeline) {
        console.error('缺少时间轴DOM元素');
        return;
    }
    
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let animationFrameId = null;
    
    // 提高滚动速度系数
    const SCROLL_SPEED = 4; // 从2提高到4，使拖动更灵敏
    const MOMENTUM_FACTOR = 0.9; // 动量系数
    const MIN_VELOCITY = 0.1; // 最小速度阈值
    
    // 鼠标事件 - 绑定到容器
    timelineContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
        lastX = e.pageX;
        lastTime = Date.now();
        velocity = 0;
        timelineContainer.style.cursor = 'grabbing';
        // 取消之前的动画
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    });
    
    timelineContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentX = e.pageX;
        const currentTime = Date.now();
        const deltaX = currentX - lastX;
        const deltaTime = currentTime - lastTime;
        
        // 计算速度
        if (deltaTime > 0) {
            velocity = deltaX / deltaTime;
        }
        
        const x = currentX - timelineContainer.offsetLeft;
        const walk = (x - startX) * SCROLL_SPEED; // 提高滚动速度
        timelineContainer.scrollLeft = scrollLeft - walk;
        
        lastX = currentX;
        lastTime = currentTime;
    });
    
    function endDrag() {
        isDragging = false;
        timelineContainer.style.cursor = 'grab';
        
        // 添加动量效果
        if (Math.abs(velocity) > MIN_VELOCITY) {
            applyMomentum();
        }
    }
    
    // 应用动量效果
    function applyMomentum() {
        if (Math.abs(velocity) < MIN_VELOCITY) {
            return;
        }
        
        // 根据速度调整滚动位置
        timelineContainer.scrollLeft += velocity * SCROLL_SPEED * 5;
        
        // 逐渐减小速度
        velocity *= MOMENTUM_FACTOR;
        
        // 继续动画
        animationFrameId = requestAnimationFrame(applyMomentum);
    }
    
    timelineContainer.addEventListener('mouseup', endDrag);
    timelineContainer.addEventListener('mouseleave', endDrag);
    
    // 触摸事件（移动端支持）
    timelineContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
        lastX = e.touches[0].pageX;
        lastTime = Date.now();
        velocity = 0;
        // 取消之前的动画
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }, { passive: true });
    
    timelineContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentX = e.touches[0].pageX;
        const currentTime = Date.now();
        const deltaX = currentX - lastX;
        const deltaTime = currentTime - lastTime;
        
        // 计算速度
        if (deltaTime > 0) {
            velocity = deltaX / deltaTime;
        }
        
        const x = currentX - timelineContainer.offsetLeft;
        const walk = (x - startX) * SCROLL_SPEED;
        timelineContainer.scrollLeft = scrollLeft - walk;
        
        lastX = currentX;
        lastTime = currentTime;
    }, { passive: false });
    
    timelineContainer.addEventListener('touchend', endDrag);
    timelineContainer.addEventListener('touchcancel', endDrag);
    
    // 添加视觉反馈
    timelineContainer.style.cursor = 'grab';
    timelineContainer.style.userSelect = 'none';
    
    // 添加滚轮支持，实现快速滚动
    timelineContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        // 水平滚轮或垂直滚轮都可以控制水平滚动
        const delta = e.deltaX || e.deltaY;
        timelineContainer.scrollLeft += delta * 2; // 提高滚轮滚动速度
    }, { passive: false });
}

// 在页面加载完成后调用
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    initTimelineDrag();
});

/*******************************此处为分割线，该处往上为历史简介介绍部分的js函数调用功能，包含左右滑动、智趣问答等相关内容的交互实现。******************************************** */


/*****以下内容为视频版面js属性****** */
// 视频播放/暂停控制
function toggleXiuyuanVideoPlayback() {
    const video = document.getElementById('xiuyuan-history-video');
    const videoControls = document.querySelector('.xiuyuan-video-controls');
    
    if (video) {
        if (video.paused) {
            video.play().catch(function(error) {
                console.log('播放失败:', error);
            });
            if (videoControls) {
                videoControls.classList.add('xiuyuan-video-playing');
            }
        } else {
            video.pause();
            if (videoControls) {
                videoControls.classList.remove('xiuyuan-video-playing');
            }
        }
    } else {
        console.log('视频元素未找到');
    }
}
// 在页面加载完成后调用
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    initTimelineDrag();
  // 视频播放和暂停事件监听
    const video = document.getElementById('xiuyuan-history-video');
    const videoControls = document.querySelector('.xiuyuan-video-controls');
    const playPauseBtn = document.getElementById('xiuyuan-video-play-pause');
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleXiuyuanVideoPlayback);
    }
    
    if (video && videoControls) {
        video.addEventListener('play', function() {
            videoControls.classList.add('xiuyuan-video-playing');
        });
        
        video.addEventListener('pause', function() {
            videoControls.classList.remove('xiuyuan-video-playing');
        });
    }
});