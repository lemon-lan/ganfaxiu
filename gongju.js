// 工具详情模态框功能
document.addEventListener('DOMContentLoaded', function () {
    const toolCards = document.querySelectorAll('.tool-card');
    const modal = document.getElementById('toolModal');
    const closeBtn = document.querySelector('.close');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');

    // 打开模态框
    toolCards.forEach(card => {
        card.addEventListener('click', function () {
            const toolName = this.querySelector('.tool-name').textContent;
            const toolImage = this.querySelector('.tool-image').src;
            const toolDetails = this.querySelector('.tool-details').innerHTML;

            modalTitle.textContent = toolName;
            modalImage.src = toolImage;
            modalDescription.innerHTML = toolDetails;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭模态框
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 添加滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有工具卡片
    toolCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});