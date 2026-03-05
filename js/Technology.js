// 确保DOM加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 工具数据
    const toolsData = {
        needle: {
            name: "绣针",
            image: "./img/IMG-gongju-zheng-1.png",
            description: "赣发绣专用绣针，针尖锋利，针体坚韧，适合精细的发丝刺绣工艺。绣针的选择直接影响到刺绣的精度和效果，赣发绣的绣针通常比普通刺绣针更细更长，以便更好地操控发丝。"
        },
        thread: {
            name: "绣线",
            image: "./img/thread.png",
            description: "采用优质发丝制作的绣线，色泽自然，质感柔软，能展现细腻的刺绣效果。发丝的选择非常讲究，需要经过多道工序处理，确保其韧性和光泽度，以便在绣布上呈现出丰富的色彩和层次。"
        },
        fabric: {
            name: "绣布",
            image: "./img/fabric.png",
            description: "选用高密度丝绸面料，质地光滑，色彩柔和，为发丝刺绣提供理想的载体。绣布的选择对刺绣效果至关重要，丝绸面料的光滑表面能够更好地展现发丝的细腻质感，同时也便于绣针的穿梭。"
        },
        scissors: {
            name: "剪刀",
            image: "./img/scissors.png",
            description: "专业刺绣剪刀，刀刃锋利，操作灵活，用于精确裁剪发丝和绣线。刺绣剪刀需要具备极高的精度，以便在细小的区域进行精确裁剪，确保刺绣作品的完整性和美观度。"
        },
        frame: {
            name: "绣架",
            image: "./img/frame.png",
            description: "稳固的绣架设计，可调节高度和角度，为刺绣过程提供舒适的工作姿势。绣架的作用是固定绣布，使其保持紧绷状态，便于刺绣操作。好的绣架能够减轻刺绣者的疲劳，提高工作效率。"
        },
        thimble: {
            name: "顶针",
            image: "./img/thimble.png",
            description: "精致的顶针，保护手指的同时，提高刺绣时的针脚控制精度。顶针是刺绣过程中不可或缺的工具，它能够保护手指免受绣针的伤害，同时也能够提供更好的针脚控制，使刺绣更加精准。"
        }
    };

    // DOM元素
    const toolItems = document.querySelectorAll('.tool-item');
    const centerRed = document.querySelector('.center-red');
    const toolOverlay = document.getElementById('toolOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayDescription = document.getElementById('overlayDescription');

    // 检查DOM元素是否存在
    if (!toolItems.length || !centerRed) {
        console.error('部分DOM元素未找到');
        return;
    }

    // 初始化：所有工具默认为灰度
    toolItems.forEach(item => {
        item.style.filter = 'grayscale(100%)';
        item.style.opacity = '0.6';
        // 隐藏详细描述
        const desc = item.querySelector('.tool-description');
        if (desc) {
            desc.style.display = 'none';
        }
    });

    // 工具鼠标进入事件
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const toolType = this.dataset.tool;
            const toolData = toolsData[toolType];
            
            if (!toolData) {
                console.error('工具数据未找到:', toolType);
                return;
            }
            
            // 当前工具恢复彩色并放大
            this.style.filter = 'none';
            this.style.opacity = '1';
            this.style.transform = 'scale(1.5)';
            this.style.zIndex = '10';
            this.style.position = 'relative';
            
            // 显示详细描述
            const desc = this.querySelector('.tool-description');
            if (desc) {
                desc.style.display = 'block';
                desc.style.position = 'absolute';
                desc.style.bottom = '-80px';
                desc.style.left = '50%';
                desc.style.transform = 'translateX(-50%)';
                desc.style.zIndex = '11';
            }
            
            // 其他工具保持灰度
            toolItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.filter = 'grayscale(100%)';
                    otherItem.style.opacity = '0.6';
                    otherItem.style.transform = 'scale(1)';
                    otherItem.style.zIndex = '1';
                    // 隐藏其他工具的描述
                    const otherDesc = otherItem.querySelector('.tool-description');
                    if (otherDesc) {
                        otherDesc.style.display = 'none';
                    }
                }
            });
            
            // 隐藏中心文字
            centerRed.style.opacity = '0';
            centerRed.style.zIndex = '0';
        });
    });

    // 鼠标离开所有工具区域时恢复初始状态
    const toolsContainer = document.querySelector('.tools-container');
    if (toolsContainer) {
        toolsContainer.addEventListener('mouseleave', function() {
            // 所有工具恢复灰度
            toolItems.forEach(item => {
                item.style.filter = 'grayscale(100%)';
                item.style.opacity = '0.6';
                item.style.transform = 'scale(1)';
                item.style.zIndex = '1';
                // 隐藏描述
                const desc = item.querySelector('.tool-description');
                if (desc) {
                    desc.style.display = 'none';
                }
            });
            
            // 显示中心文字
            centerRed.style.opacity = '1';
            centerRed.style.zIndex = '2';
        });
    }

    console.log('赣发绣工具悬停交互功能已加载完成');
});