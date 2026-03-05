// 标签切换和工序选择功能
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const phaseProcesses = document.querySelectorAll('.phase-processes');
    const processItems = document.querySelectorAll('.process-item');

    // 工序数据
    const processData = [
        { id: 1, name: '选布料', description: '传统的刺绣多以轻盈柔软的丝绢为载体，赣发绣则不同，底料所需的特质为密度高、布料结实，因而多选用高密度纯棉土布，使发丝与布料完美贴合，成品可水洗不脱色。', image: './img/gongxu/GX-1.png' },
        { id: 2, name: '缝布边', description: '将布料四边用棉线密缝锁边，防止绣制中脱丝、卷边、变形，保持底料平整稳定，为上绷与绣制奠定基础。', image: './img/gongxu/GX-2.png' },
        { id: 3, name: '卷绷', description: '将布料平整固定于木质卷绷，四边均匀拉紧、无褶皱、无松弛，用棉线缝固绷杆，确保绣制时底料不动不移。。', image: './img/gongxu/GX-3.png' },
        { id: 4, name: '画稿', description: '与其他绣品不同的是，赣发绣为绣画一体，因而传统赣发绣对绣工要求极高，需掌握绘画、书法、素描等技法手工起稿。而在现代非遗的普及教学中，会采用打印的底稿，降低入门门槛。', image: './img/gongxu/GX-4.png' },
        { id: 5, name: '拼接发丝', description: '因为有些人的头发较短或者过于稀少，需要采用拼接工艺。将几根短发拼接成一根长线，适配绣制的长度，提升绣制效率。', image: './img/gongxu/GX-5.png' },
        { id: 6, name: '选发', description: '头发质量不一，有粗有细，无法像普通的线一样劈丝。而不同的作品需要选择头发的粗细、软硬等也有所不同。', image: './img/gongxu/GX-6.png' },
        { id: 7, name: '整理', description: '梳顺发丝、去除毛躁，按颜色、长度、粗细分类捆扎，备用有序。', image: './img/gongxu/GX-7.png' },
        { id: 8, name: '烘干', description: '烘干定型，去除多余水分，保持发丝顺滑、有韧性，便于穿针走线。', image: './img/gongxu/GX-8.png' },
        { id: 9, name: '晾发', description: '染色后的头发需要进行晾晒处理，自然摊开晾晒，使颜色充分附着、发色稳定一致。', image: './img/gongxu/GX-9.png' },
        { id: 10, name: '漂染', description: '想要将“墨绣”变成彩绣，要对选取好的头发进行漂染，保证着色均匀、发质柔韧不断裂。', image: './img/gongxu/GX-10.png' },
        { id: 11, name: '制色', description: '为了不侵蚀底料，选用天然植物与矿物进行提炼制色，加入食盐与醋进行固色，需要煮满8小时，确保久用而不掉色。', image: './img/gongxu/GX-11.png' },
        { id: 12, name: '绣制', description: '赣发绣的针法多种多样。在绣制过程中，头发脆弱易断且打滑，难以与布料服贴，在绣制的过程中对针法的要求非常高：发根绣轮廓、发梢绣细节，正反两面平整光洁，做到针脚细密、不露底、不跳线。', image: './img/gongxu/GX-12.png' },
        { id: 13, name: '托裱', description: '在赣发绣载体在绣品背面托上一层背纸或背布，起到加固和保护的作用，有助于延长作品的保存时间。', image: './img/gongxu/GX-13.png' },
        { id: 14, name: '戳孔', description: '托裱后因发丝具有厚度，易产生气泡，可用细针戳孔排出内部空气，使绣面平整服帖。。', image: './img/gongxu/GX-14.png' },
        { id: 15, name: '熨烫', description: '低温熨烫，平整绣面，不伤发丝与布料。', image: './img/gongxu/GX-15.png' },
        { id: 16, name: '下绷', description: '绣制完成后，将作品从绣绷上取下，避免拉扯导致变形。', image: './img/gongxu/GX-16.png' },
        { id: 17, name: '去边', description: '裁去托裱后多余边缘，使尺寸符合装裱标准。', image: './img/gongxu/GX-17.png' },
        { id: 18, name: '装框', description: '作品配专用画框、玻璃、背板，密封防尘防潮。', image: './img/gongxu/GX-18.png' },
        { id: 19, name: '装轴', description: '卷轴作品安装木轴、轴头，固定牢固、开合顺畅。', image: './img/gongxu/GX-19.png' },
        { id: 20, name: '装凌布', description: '为合格产品准备传统包装材料，确保产品在运输过程中的安全。', image: './img/gongxu/GX-20.png' },
        { id: 21, name: '剪切', description: '绣成后按画稿边缘进行裁切，留足装裱余量，切口整齐。', image: './img/gongxu/GX-21.png' },
        { id: 22, name: '质检', description: '对最终成品进行检查，确保绣面平整、发丝牢固、无脱色等问题。赣发绣成品可水浸也可擦洗，能长久地保存下去。', image: './img/gongxu/GX-22.png' },
        { id: 23, name: '修线头', description: '去除秀布上多余的线头，保证画面整洁平整。', image: './img/gongxu/GX-23.png' }
    ];

    // 阶段切换功能
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // 更新按钮状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // 更新工序列表显示
            phaseProcesses.forEach(process => {
                process.classList.remove('active');
            });
            const activeProcesses = document.getElementById(tabId + '-processes');
            if (activeProcesses) {
                activeProcesses.classList.add('active');
            }

            // 自动选择第一个工序
            setTimeout(() => {
                const firstProcessItem = activeProcesses.querySelector('.process-item');
                if (firstProcessItem) {
                    selectProcess(firstProcessItem);
                }
            }, 100);
        });
    });

    // 工序选择功能
    processItems.forEach(item => {
        item.addEventListener('click', function () {
            selectProcess(this);
        });
    });

    // 选择工序函数
    function selectProcess(item) {
        // 更新工序项状态
        processItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // 获取工序ID
        const processId = parseInt(item.getAttribute('data-process'));

        // 更新主视图
        updateMainView(processId);
    }

    // 更新主视图函数
    function updateMainView(processId) {
        const process = processData.find(p => p.id === processId);
        if (process) {
            // 确保元素存在后再操作
            const mainImage = document.getElementById('mainImage');
            const mainNumber = document.getElementById('mainNumber');
            const mainName = document.getElementById('mainName');
            const mainDescription = document.getElementById('mainDescription');
            
            if (mainImage) mainImage.src = process.image;
            if (mainNumber) mainNumber.textContent = process.id.toString().padStart(2, '0');
            if (mainName) mainName.textContent = process.name;
            if (mainDescription) mainDescription.textContent = process.description;
        }
    }

    // 初始化显示第一个工序
    const firstProcessItem = document.querySelector('.process-item');
    if (firstProcessItem) {
        selectProcess(firstProcessItem);
    }
});