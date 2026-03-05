 // 弹窗功能
        function openModal(title, content) {
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalBody').textContent = content;
            document.getElementById('modalOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal() {
            document.getElementById('modalOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }
