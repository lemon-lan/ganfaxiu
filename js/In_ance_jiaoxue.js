// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    initVideoTimeline();
});

// 初始化视频时间轴
function initVideoTimeline() {
    const video = document.getElementById('gongyi-video');
    const progress = document.getElementById('timeline-progress');
    const markers = document.querySelectorAll('.timeline-marker');

    if (!video) return;

    // 计算标记位置
    calculateMarkerPositions();

    // 视频播放时更新进度条和当前步骤
    video.addEventListener('timeupdate', function () {
        const percent = (video.currentTime / video.duration) * 100;
        progress.style.width = percent + '%';

        // 更新当前步骤
        updateCurrentStep();
    });

    // 点击标记跳转到对应时间
    markers.forEach(marker => {
        marker.addEventListener('click', function () {
            const time = parseFloat(this.dataset.time);
            const step = parseInt(this.dataset.step);

            // 跳转到对应视频位置
            video.currentTime = time;
            video.play();

            // 更新步骤显示
            updateStepDisplay(step);
        });
    });

    // 窗口大小改变时重新计算标记位置
    window.addEventListener('resize', calculateMarkerPositions);
}

// 计算标记位置
function calculateMarkerPositions() {
    const video = document.getElementById('gongyi-video');
    const markers = document.querySelectorAll('.timeline-marker');
    const track = document.querySelector('.timeline-track');

    if (!video || !track) return;

    // 模拟视频时长（实际项目中应使用真实时长）
    const duration = 240; // 4分钟

    markers.forEach(marker => {
        const time = parseFloat(marker.dataset.time);
        const percent = (time / duration) * 100;
        marker.style.left = percent + '%';
        marker.style.transform = 'translateX(-50%)';
    });
}

// 更新当前步骤
function updateCurrentStep() {
    const video = document.getElementById('gongyi-video');
    const steps = document.querySelectorAll('.gongyi-step');

    if (!video) return;

    const currentTime = video.currentTime;

    // 根据时间判断当前步骤
    let currentStep = 1;

    if (currentTime >= 217) {
        currentStep = 5; // 完成
    } else if (currentTime >= 131) {
        currentStep = 4; // 刺绣
    } else if (currentTime >= 84) {
        currentStep = 3; // 穿线
    } else if (currentTime >= 13) {
        currentStep = 2; // 画稿
    } else {
        currentStep = 1; // 选发

        // 更新步骤显示
        updateStepDisplay(currentStep);
    }
}
    // 更新步骤显示
    function updateStepDisplay(step) {
        const steps = document.querySelectorAll('.gongyi-step');

        steps.forEach(s => {
            s.classList.remove('active');
            if (parseInt(s.dataset.step) === step) {
                s.classList.add('active');
            }
        });
    }

    // 视频加载完成后获取真实时长
    function onVideoLoaded() {
        const video = document.getElementById('gongyi-video');
        if (video) {
            console.log('视频时长:', video.duration);
            // 可以在这里重新计算标记位置
        }
    }

    // 为视频添加加载完成事件监听
    const video = document.getElementById('gongyi-video');
    if (video) {
        video.addEventListener('loadedmetadata', onVideoLoaded);
    }
