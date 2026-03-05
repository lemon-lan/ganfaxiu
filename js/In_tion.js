// 滚动动画
document.addEventListener('DOMContentLoaded', function () {
    // 不规则图片滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察所有图片项
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // 移动端轮播图
    const mobileCarousel = document.querySelector('.mobile-carousel');
    if (mobileCarousel) {
        const items = mobileCarousel.querySelectorAll('.carousel-item');
        const indicators = mobileCarousel.querySelectorAll('.indicator');
        let currentIndex = 0;

        function showItem(index) {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        function nextItem() {
            const nextIndex = (currentIndex + 1) % items.length;
            showItem(nextIndex);
        }

        // 自动播放
        setInterval(nextItem, 3000);

        // 点击指示器切换
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showItem(index);
            });
        });
    }
});

//传承理念部分！！！
// 文字展开/折叠功能
function toggleExpand(button) {
    const textContainer = button.previousElementSibling;
    const isExpanded = textContainer.classList.contains('expanded');
    
    if (isExpanded) {
        textContainer.classList.remove('expanded');
        button.textContent = '展开';
    } else {
        textContainer.classList.add('expanded');
        button.textContent = '收起';
    }
}

// 视频播放/暂停控制
function toggleVideoPlayback() {
    const video = document.getElementById('inheritanceVideo');
    const videoControls = document.querySelector('.video-controls');
    
    if (video) {
        if (video.paused) {
            video.play().catch(function(error) {
                console.log('播放失败:', error);
            });
            if (videoControls) {
                videoControls.classList.add('video-playing');
            }
        } else {
            video.pause();
            if (videoControls) {
                videoControls.classList.remove('video-playing');
            }
        }
    } else {
        console.log('视频元素未找到');
    }
}

// 页面加载完成后绑定事件
document.addEventListener('DOMContentLoaded', function() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleVideoPlayback);
    }
});


//该部分内容为控制创新传承理念部分视频播放暂停按钮的控制

// 应用创新视频控制
document.addEventListener('DOMContentLoaded', function() {
    const innovationVideo = document.getElementById('innovationVideo');
    const innovationPlayPauseBtn = document.getElementById('innovationPlayPauseBtn');
    const innovationPlayIcon = innovationPlayPauseBtn.querySelector('.play-icon');
    const innovationPauseIcon = innovationPlayPauseBtn.querySelector('.pause-icon');
    
    innovationPlayPauseBtn.addEventListener('click', function() {
        if (innovationVideo.paused) {
            innovationVideo.play();
            innovationPlayIcon.style.display = 'none';
            innovationPauseIcon.style.display = 'inline';
        } else {
            innovationVideo.pause();
            innovationPlayIcon.style.display = 'inline';
            innovationPauseIcon.style.display = 'none';
        }
    });
    
    innovationVideo.addEventListener('ended', function() {
        innovationPlayIcon.style.display = 'inline';
        innovationPauseIcon.style.display = 'none';
    });
});
