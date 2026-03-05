// 确保只在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，初始化功能');
    initNotes();
    initNoteForm();
    initFormDrag(); // 初始化表单拖动功能
});

// 初始化便利贴
function initNotes() {
    const notes = document.querySelectorAll('.note');
    const closeButtons = document.querySelectorAll('.note-close');
    
    // 为关闭按钮添加点击事件
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const note = this.closest('.note');
            if (note) {
                note.style.animation = 'none';
                note.style.transform = 'scale(0) rotate(0deg)';
                note.style.opacity = '0';
                setTimeout(() => {
                    note.remove();
                }, 300);
            }
        });
    });
    
    // 为便利贴添加拖拽功能
    notes.forEach(note => {
        makeDraggable(note);
    });
}

// 初始化表单
function initNoteForm() {
    const noteForm = document.getElementById('noteForm');
    
    if (noteForm) {
        noteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const noteContent = document.getElementById('noteContent');
            const noteSignature = document.getElementById('noteSignature');
            const noteTag = document.querySelector('input[name="noteTag"]:checked');
            
            if (noteContent && noteSignature && noteTag) {
                if (noteContent.value.trim() && noteSignature.value.trim()) {
                    addNote(noteContent.value, noteSignature.value, noteTag.value);
                    
                    // 重置表单
                    noteForm.reset();
                    // 确保默认选中第一个标签
                    const defaultTag = document.querySelector('input[name="noteTag"][value="故事"]');
                    if (defaultTag) {
                        defaultTag.checked = true;
                    }
                }
            }
        });
    }
}

// 使元素可拖拽
function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;
    
    element.addEventListener('mousedown', function(e) {
        // 防止点击关闭按钮时触发拖拽
        if (e.target.classList.contains('note-close')) {
            return;
        }
        
        if (!isDragging) {
            // 计算鼠标相对于元素的位置
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            isDragging = true;
            
            // 将当前便利贴置于顶层
            const notes = document.querySelectorAll('.note');
            notes.forEach(note => note.style.zIndex = '1');
            element.style.zIndex = '100';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            // 计算新位置
            const wallContainer = document.querySelector('.wall-container');
            if (wallContainer) {
                const wallRect = wallContainer.getBoundingClientRect();
                
                let newX = e.clientX - wallRect.left - offsetX;
                let newY = e.clientY - wallRect.top - offsetY;
                
                // 限制在容器内
                newX = Math.max(0, Math.min(newX, wallRect.width - element.offsetWidth));
                newY = Math.max(0, Math.min(newY, wallRect.height - element.offsetHeight));
                
                // 更新位置
                element.style.left = `${newX}px`;
                element.style.top = `${newY}px`;
                element.style.transform = `rotate(0deg)`;
            }
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}

// 添加新便利贴的函数
function addNote(content, signature, tag = '故事') {
    const wallContainer = document.querySelector('.wall-container');
    if (!wallContainer) return;
    
    const noteCount = wallContainer.querySelectorAll('.note').length;
    
    // 创建新便利贴元素
    const newNote = document.createElement('div');
    newNote.className = 'note';
    
    // 随机位置和旋转角度
    const wallRect = wallContainer.getBoundingClientRect();
    const randomX = Math.random() * (wallRect.width - 300);
    const randomY = Math.random() * (wallRect.height - 250);
    const randomRotation = (Math.random() - 0.5) * 10; // -5 到 5 度
    
    newNote.style.left = `${randomX}px`;
    newNote.style.top = `${randomY}px`;
    newNote.style.transform = `rotate(${randomRotation}deg)`;
    
    // 设置内容
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10);
    const formattedTime = now.toTimeString().slice(0, 8);
    
    newNote.innerHTML = `
        <div class="note-tag">${tag}</div>
        <div class="note-header">
            <span class="note-id">第[${49568 + noteCount}]条</span>
            <span class="note-time">${formattedDate} ${formattedTime}</span>
            <button class="note-close">×</button>
        </div>
        <div class="note-content">
            <p>${content.replace(/\n/g, '</p><p>')}</p>
            <div class="note-decoration">
                <div class="lollipop"></div>
            </div>
            <p class="note-signature">${signature}</p>
        </div>
        <div class="note-tapes">
            <div class="tape"></div>
            <div class="tape"></div>
            <div class="tape"></div>
            <div class="tape"></div>
            <div class="tape"></div>
        </div>
    `;
    
    // 添加到容器
    wallContainer.appendChild(newNote);
    
    // 初始化新便利贴
    const closeButton = newNote.querySelector('.note-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            newNote.style.animation = 'none';
            newNote.style.transform = 'scale(0) rotate(0deg)';
            newNote.style.opacity = '0';
            setTimeout(() => {
                newNote.remove();
            }, 300);
        });
    }
    
    // 添加拖拽功能
    makeDraggable(newNote);
    
    // 添加出现动画
    newNote.style.opacity = '0';
    newNote.style.transform = `scale(0) rotate(${randomRotation}deg)`;
    setTimeout(() => {
        newNote.style.transition = 'all 0.3s ease';
        newNote.style.opacity = '1';
        newNote.style.transform = `scale(1) rotate(${randomRotation}deg)`;
    }, 10);
}

// 初始化表单拖动功能
function initFormDrag() {
    const formContainer = document.querySelector('.note-form-container');
    const wallContainer = document.querySelector('.wall-container');
    
    if (!formContainer || !wallContainer) {
        console.error('表单容器或墙容器未找到');
        return;
    }
    
    console.log('表单拖动功能初始化成功');
    
    let isDragging = false;
    let offsetX, offsetY;
    
    formContainer.addEventListener('mousedown', function(e) {
        // 防止点击表单内部元素时触发拖动
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.classList.contains('tag')) {
            return;
        }
        
        isDragging = true;
        offsetX = e.clientX - formContainer.getBoundingClientRect().left;
        offsetY = e.clientY - formContainer.getBoundingClientRect().top;
        formContainer.style.zIndex = '10001';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const wallRect = wallContainer.getBoundingClientRect();
            const formRect = formContainer.getBoundingClientRect();
            
            // 计算新位置（相对于文档）
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            
            // 计算相对于墙容器的位置
            const relativeX = newX - wallRect.left;
            const relativeY = newY - wallRect.top;
            
            // 设置禁区（左侧1/4区域为禁区）
            const forbiddenZoneWidth = wallRect.width * 0.25; // 左侧25%区域为禁区
            
            // 检查是否在禁区内
            let allowedX = relativeX;
            if (allowedX < forbiddenZoneWidth) {
                allowedX = forbiddenZoneWidth;
            }
            
            // 限制在墙容器内
            const maxAllowedX = wallRect.width - formRect.width;
            const maxAllowedY = wallRect.height - formRect.height;
            
            allowedX = Math.max(0, Math.min(allowedX, maxAllowedX));
            const allowedY = Math.max(0, Math.min(relativeY, maxAllowedY));
            
            // 更新表单位置
            formContainer.style.left = `${allowedX}px`;
            formContainer.style.top = `${allowedY}px`;
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        if (formContainer) {
            formContainer.style.zIndex = '10000';
        }
    });
}

//上述部分为留言板区域js属性内容区域部分。以下为其它版块内容布局！！！
//*****分享版块内容的js函数声明 */
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，初始化功能');
    initSimpleShare();
});

// 初始化简约分享功能
function initSimpleShare() {
    // 预设内容数据
    const presetContents = [
        {
            title: "传统发绣技艺",
            desc: "展示传统赣发绣的精湛技艺，传承千年文化瑰宝",
            image: "img/IMG-xinxingongyi-1.png",
            tags: ["#赣发绣", "#传统工艺", "#文化传承"]
        },
        {
            title: "创新发绣设计",
            desc: "融合现代设计元素，展现发绣艺术的新生命力",
            image: "img/IMG-xiuxin-shenghuo-1.png",
            tags: ["#赣发绣", "#创新设计", "#现代风格"]
        },
        {
            title: "精细发绣作品",
            desc: "每一针每一线都凝聚着绣师的匠心与智慧",
            image: "img/IMG-xiuxin-yingyong-1.png",
            tags: ["#赣发绣", "#精细绣工", "#匠心工艺"]
        },
        {
            title: "文化传承使命",
            desc: "通过发绣艺术，传承和弘扬中华优秀传统文化",
            image: "img/IMG-in-10.png",
            tags: ["#赣发绣", "#文化传承", "#使命担当"]
        }
    ];
    
    // DOM元素
    const openShareModal = document.getElementById('openShareModal');
    const closeShareModal = document.getElementById('closeShareModal');
    const simpleShareModal = document.getElementById('simpleShareModal');
    const randomizeBtn = document.getElementById('randomizeBtn');
    const shareBtn = document.getElementById('shareBtn');
    const shareSuccess = document.getElementById('shareSuccess');
    const closeSuccess = document.getElementById('closeSuccess');
    const displayImage = document.getElementById('displayImage');
    const contentTitle = document.getElementById('contentTitle');
    const contentDesc = document.getElementById('contentDesc');
    const contentTags = document.getElementById('contentTags');
    
    // 检查元素是否存在
    if (!openShareModal || !closeShareModal || !simpleShareModal) {
        console.log('分享相关元素未找到，跳过初始化');
        return;
    }
    
    // 打开分享弹窗
    openShareModal.addEventListener('click', function() {
        simpleShareModal.style.display = 'flex';
    });
    
    // 关闭分享弹窗
    closeShareModal.addEventListener('click', function() {
        simpleShareModal.style.display = 'none';
    });
    
    // 随机内容按钮
    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * presetContents.length);
            const randomContent = presetContents[randomIndex];
            
            // 更新内容
            if (displayImage) displayImage.src = randomContent.image;
            if (contentTitle) contentTitle.textContent = randomContent.title;
            if (contentDesc) contentDesc.textContent = randomContent.desc;
            
            // 更新标签
            if (contentTags) {
                contentTags.innerHTML = '';
                randomContent.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'tag';
                    tagElement.textContent = tag;
                    contentTags.appendChild(tagElement);
                });
            }
        });
    }
    
    // 分享按钮
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            // 显示分享成功提示
            if (shareSuccess) shareSuccess.style.display = 'flex';
        });
    }
    
    // 关闭成功提示
    if (closeSuccess) {
        closeSuccess.addEventListener('click', function() {
            if (shareSuccess) shareSuccess.style.display = 'none';
            if (simpleShareModal) simpleShareModal.style.display = 'none';
        });
    }
}

////以下为传承理念部分js属性内容区域
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
        // 注意：根据CSS设置，展开后按钮会隐藏，所以这里不需要修改按钮文本
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
   // 视频播放和暂停事件监听
    const video = document.getElementById('inheritanceVideo');
    const videoControls = document.querySelector('.video-controls');
    
    if (video && videoControls) {
        video.addEventListener('play', function() {
            videoControls.classList.add('video-playing');
        });
        
        video.addEventListener('pause', function() {
            videoControls.classList.remove('video-playing');
        });
    }
});
// 页面加载完成后绑定事件
document.addEventListener('DOMContentLoaded', function() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleVideoPlayback);
    }
});


