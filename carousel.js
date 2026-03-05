// 确保DOM完全加载后再执行
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.fullscreen-carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-control-prev');
    const nextBtn = carousel.querySelector('.carousel-control-next');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    let isAnimating = false;
    let autoPlayInterval;
    const autoPlayTime = 6000; // 自动播放间隔时间（毫秒）
    
    // 初始化轮播
    function init() {
        setupEventListeners();
        startAutoPlay();
        // 初始化所有预览图
        updateAllPreviewImages();
    }
    
    // 设置事件监听器
    function setupEventListeners() {
        // 控制按钮事件
        prevBtn.addEventListener('click', () => prevSlide());
        nextBtn.addEventListener('click', () => nextSlide());
        
        // 指示器事件
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // 鼠标事件：悬停时暂停自动播放
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // 触摸事件支持
        setupTouchEvents();
        
        // 添加预览图点击事件
        setupPreviewImageClickEvents();
    }
    
    // 设置预览图点击事件
    function setupPreviewImageClickEvents() {
        // 为每个轮播项添加预览图点击事件
        items.forEach((item, itemIndex) => {
            const previewPrev = item.querySelector('.preview-previous');
            const previewNext = item.querySelector('.preview-next');
            
            if (previewPrev) {
                previewPrev.addEventListener('click', () => {
                    // 点击左侧预览图：切换到上一张
                    prevSlide();
                });
            }
            
            if (previewNext) {
                previewNext.addEventListener('click', () => {
                    // 点击右侧预览图：切换到下一张
                    nextSlide();
                });
            }
        });
    }
    
    // 设置触摸事件
    function setupTouchEvents() {
        let startX;
        let endX;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            // 左右滑动判断阈值
            const threshold = 50;
            
            if (startX - endX > threshold) {
                // 左滑：下一张
                nextSlide();
            } else if (endX - startX > threshold) {
                // 右滑：上一张
                prevSlide();
            }
        }
    }
    
    // 更新所有预览图
    function updateAllPreviewImages() {
        items.forEach((item, itemIndex) => {
            updatePreviewImages(item, itemIndex);
        });
    }
    
    // 更新单个轮播项的预览图
    function updatePreviewImages(item, itemIndex) {
        const previewImage = item.querySelector('.preview-image');
        const previewPrev = item.querySelector('.preview-previous');
        const previewNext = item.querySelector('.preview-next');
        
        if (previewImage && previewPrev && previewNext) {
            // 计算上一张和下一张的索引
            const prevIndex = (itemIndex - 1 + items.length) % items.length;
            const nextIndex = (itemIndex + 1) % items.length;
            
            // 获取上一张和下一张的背景图片
            const prevBg = items[prevIndex].style.backgroundImage;
            const nextBg = items[nextIndex].style.backgroundImage;
            
            // 更新预览图
            previewPrev.style.backgroundImage = prevBg;
            previewNext.style.backgroundImage = nextBg;
        }
    }
    
    // 切换到上一张
    function prevSlide() {
        if (isAnimating) return;
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(newIndex);
    }
    
    // 切换到下一张
    function nextSlide() {
        if (isAnimating) return;
        const newIndex = (currentIndex + 1) % items.length;
        goToSlide(newIndex);
    }
    
    // 切换到指定索引 - 简化为只使用淡入淡出
    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        
        isAnimating = true;
        
        // 更新指示器
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // 获取当前项和下一项
        const currentItem = items[currentIndex];
        const nextItem = items[index];
        
        // 移除所有动画类
        currentItem.classList.remove('active');
        nextItem.classList.add('active');
        
        // 更新所有预览图
        updateAllPreviewImages();
        
        // 重置动画状态
        setTimeout(() => {
            // 更新当前索引
            currentIndex = index;
            isAnimating = false;
        }, 1200); // 匹配CSS过渡时间
        
        // 重置自动播放定时器
        resetAutoPlay();
    }
    
    // 开始自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, autoPlayTime);
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 重置自动播放
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // 初始化
    init();
});