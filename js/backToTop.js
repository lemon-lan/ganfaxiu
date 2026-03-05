// 返回顶部按钮功能 - 独立模块
document.addEventListener('DOMContentLoaded', function() {
    // 获取返回顶部按钮元素
    const backToTopBtn = document.getElementById('backToTop');
    
    // 检查按钮是否存在
    if (backToTopBtn) {
        // 滚动事件监听 - 控制按钮显示/隐藏
        window.addEventListener('scroll', function() {
            // 当页面滚动超过300px时显示按钮，否则隐藏
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // 点击事件处理 - 平滑滚动到顶部
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认行为
            
            // 使用原生平滑滚动API
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});