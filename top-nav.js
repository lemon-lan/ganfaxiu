// 顶部导航栏功能模块
(function() {
    // 确保DOM完全加载后执行
    document.addEventListener('DOMContentLoaded', function () {
        // 初始化导航功能
        initNavigation();
    });

    // 初始化所有导航功能
    function initNavigation() {
        // 设置当前页面导航项高亮
        setActiveNavItem();
        
        // 初始化滚动检测（导航栏自动隐藏）
        initScrollDetection();
        
        // 初始化汉堡菜单功能
        initHamburgerMenu();
    }

    // 设置当前页面导航项高亮
    function setActiveNavItem() {
        const navItems = document.querySelectorAll('.nav-menu a');

        // 移除所有激活状态
        navItems.forEach(item => item.classList.remove('active'));

        // 获取当前页面信息
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        // 定义首页文件名列表（只包含真正的首页文件）
        const homePages = ['index.html', ''];

        // 正常匹配页面文件名
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            const hrefPage = href.split('#')[0];

            // 精确匹配当前页面
            if (hrefPage === currentPage) {
                item.classList.add('active');
            }
        });
    }

    // 初始化滚动检测 - 顶部导航栏自动隐藏
    function initScrollDetection() {
        let lastScrollTop = 0;
        const scrollThreshold = 100;
        const topNav = document.querySelector('.top-nav');
        
        if (!topNav) return;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollingDown = scrollTop > lastScrollTop;
            
            // 只在向下滚动时隐藏顶部导航栏
            if (scrollTop > scrollThreshold && scrollingDown) {
                topNav.classList.add('hidden');
            } else if (scrollTop <= scrollThreshold || !scrollingDown) {
                // 向上滚动时显示顶部导航栏
                topNav.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }

    // 初始化汉堡菜单功能
    function initHamburgerMenu() {
        const menuBtn = document.querySelector('.nav-actions .menu-btn');
        const closeBtn = document.querySelector('.close-btn');
        const body = document.body;
        const navLinks = document.querySelectorAll('.fullscreen-nav a');
        const topNav = document.querySelector('.top-nav');
        const fullscreenNav = document.querySelector('.fullscreen-nav');
        
        if (!menuBtn || !fullscreenNav) return;

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
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeNav); // 关闭按钮关闭
        }
        
        navLinks.forEach(link => link.addEventListener('click', closeNav)); // 点击链接关闭
    }
})();