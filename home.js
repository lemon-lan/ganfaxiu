// 确保DOM完全加载后再执行
document.addEventListener('DOMContentLoaded', function () {
    // 获取所有需要的元素
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const fullscreenNav = document.querySelector('.fullscreen-nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.fullscreen-nav a');
    const draggableTextbox = document.getElementById('draggableTextbox');
    const backToTopBtn = document.getElementById('backToTop');
    // 打开导航：添加active类，禁止页面滚动
    function openNav() {
        fullscreenNav.classList.add('active');
        body.classList.add('no-scroll');
        menuBtn.classList.add('active'); // 按钮变成X
    }

    // 关闭导航：移除active类，恢复页面滚动
    function closeNav() {
        fullscreenNav.classList.remove('active');
        body.classList.remove('no-scroll');
        menuBtn.classList.remove('active'); // 按钮恢复汉堡
    }

    // 切换导航状态
    function toggleNav() {
        if (fullscreenNav.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    }

    // 绑定点击事件
    menuBtn.addEventListener('click', toggleNav); // 汉堡按钮切换导航
    closeBtn.addEventListener('click', closeNav); // 关闭按钮关闭
    navLinks.forEach(link => link.addEventListener('click', closeNav)); // 点击链接关闭

    // 可拖动文本框功能
    if (draggableTextbox) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        // 鼠标按下事件
        draggableTextbox.addEventListener('mousedown', function (e) {
            // 防止输入框内点击触发拖动
            if (e.target.tagName === 'INPUT') return;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = parseInt(window.getComputedStyle(draggableTextbox).left);
            initialTop = parseInt(window.getComputedStyle(draggableTextbox).top);

            // 防止文本选择和默认行为
            e.preventDefault();
        });

        // 鼠标移动事件
        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            draggableTextbox.style.left = (initialLeft + dx) + 'px';
            draggableTextbox.style.top = (initialTop + dy) + 'px';
        });

        // 鼠标释放事件
        document.addEventListener('mouseup', function () {
            isDragging = false;
        });

        // 触摸事件支持（移动端）
        draggableTextbox.addEventListener('touchstart', function (e) {
            if (e.target.tagName === 'INPUT') return;

            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            initialLeft = parseInt(window.getComputedStyle(draggableTextbox).left);
            initialTop = parseInt(window.getComputedStyle(draggableTextbox).top);

            e.preventDefault();
        });

        document.addEventListener('touchmove', function (e) {
            if (!isDragging) return;

            const dx = e.touches[0].clientX - startX;
            const dy = e.touches[0].clientY - startY;

            draggableTextbox.style.left = (initialLeft + dx) + 'px';
            draggableTextbox.style.top = (initialTop + dy) + 'px';

            e.preventDefault();
        });

        document.addEventListener('touchend', function () {
            isDragging = false;
        });
    }
});
// 轮播图功能
 document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM已加载');
      const carouselContainer = document.querySelector('.carousel-container');
      console.log('轮播容器:', carouselContainer);
      
      const prevBtn = carouselContainer.querySelector('.carousel-prev');
      const nextBtn = carouselContainer.querySelector('.carousel-next');
      console.log('上一页按钮:', prevBtn);
      console.log('下一页按钮:', nextBtn);
      
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
          console.log('上一页按钮被点击');
        });
        
        nextBtn.addEventListener('click', function() {
          console.log('下一页按钮被点击');
        });
      }
    });
 // 返回顶部按钮功能
    if (backToTopBtn) {
        // 滚动事件监听
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // 点击事件处理
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 平滑滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }