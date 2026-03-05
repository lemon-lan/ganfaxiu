// 数字发绣生成器核心功能
class BXGenerator {
    constructor() {
        this.currentStep = 1;
        this.uploadedImage = null;
        this.selectedStyle = 'traditional';
        this.parameters = {
            density: 50,
            contrast: 100,
            brightness: 100,
            detail: 70
        };
        this.init();
    }

    // 初始化
    init() {
        this.bindEvents();
        this.updateStepUI();
    }

    // 绑定事件
    bindEvents() {
        // 步骤导航点击
        document.querySelectorAll('.bx-step').forEach(step => {
            step.addEventListener('click', (e) => {
                const stepNum = parseInt(e.currentTarget.dataset.step);
                if (stepNum <= this.currentStep) {
                    this.goToStep(stepNum);
                }
            });
        });

        // 导航按钮
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevStep());

        // 上传区域点击
        const uploadArea = document.getElementById('uploadArea');
        const imageUpload = document.getElementById('imageUpload');
        const reuploadBtn = document.getElementById('reuploadBtn');

        uploadArea.addEventListener('click', () => imageUpload.click());
        reuploadBtn.addEventListener('click', () => imageUpload.click());

        // 文件选择
        imageUpload.addEventListener('change', (e) => this.handleImageUpload(e));

        // 拖拽上传
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#8b5a2b';
            uploadArea.style.background = '#f9f5f0';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#e0e0e0';
            uploadArea.style.background = 'white';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#e0e0e0';
            uploadArea.style.background = 'white';

            if (e.dataTransfer.files.length > 0) {
                this.processImage(e.dataTransfer.files[0]);
            }
        });

        // 风格选择
        document.querySelectorAll('.bx-style-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.bx-style-option').forEach(opt => opt.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.selectedStyle = e.currentTarget.dataset.style;
                this.updatePreview();
            });
        });

        // 参数调整
        const sliders = ['density', 'contrast', 'brightness', 'detail'];
        sliders.forEach(slider => {
            const element = document.getElementById(slider);
            const valueElement = document.getElementById(`${slider}Value`);

            element.addEventListener('input', (e) => {
                this.parameters[slider] = parseInt(e.target.value);
                valueElement.textContent = e.target.value;
                this.updatePreview();
            });
        });

        // 导出按钮
        document.getElementById('exportBtn').addEventListener('click', () => this.exportImage());
    }

    // 处理图片上传
    handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            this.processImage(file);
        }
    }

    // 处理图片文件
    processImage(file) {
        if (!file.type.match('image.*')) {
            alert('请上传有效的图片文件！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.uploadedImage = img;
                this.showPreview(img);
                this.updateStepUI();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // 显示预览
    showPreview(img) {
        const uploadArea = document.getElementById('uploadArea');
        const previewContainer = document.getElementById('previewContainer');
        const imagePreview = document.getElementById('imagePreview');

        uploadArea.style.display = 'none';
        previewContainer.style.display = 'block';

        // 清空预览容器
        imagePreview.innerHTML = '';

        // 创建预览图片
        const previewImg = document.createElement('img');
        previewImg.src = img.src;
        previewImg.style.maxWidth = '100%';
        previewImg.style.maxHeight = '100%';
        imagePreview.appendChild(previewImg);
    }

    // 更新预览
    updatePreview() {
        if (!this.uploadedImage) return;

        // 更新参数预览
        const paramsPreview = document.getElementById('paramsPreview');
        const exportPreview = document.getElementById('exportPreview');

        if (paramsPreview) {
            paramsPreview.innerHTML = '';
            const previewImg = document.createElement('img');
            previewImg.src = this.generatePreview();
            previewImg.style.maxWidth = '100%';
            previewImg.style.maxHeight = '100%';
            paramsPreview.appendChild(previewImg);
        }

        if (exportPreview) {
            exportPreview.innerHTML = '';
            const previewImg = document.createElement('img');
            previewImg.src = this.generatePreview();
            previewImg.style.maxWidth = '100%';
            previewImg.style.maxHeight = '100%';
            exportPreview.appendChild(previewImg);
        }
    }

    // 生成预览
    generatePreview() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置画布尺寸
        canvas.width = 300;
        canvas.height = 300;

        if (this.uploadedImage) {
            // 计算缩放比例
            const scale = Math.min(canvas.width / this.uploadedImage.width, canvas.height / this.uploadedImage.height);
            const x = (canvas.width - this.uploadedImage.width * scale) / 2;
            const y = (canvas.height - this.uploadedImage.height * scale) / 2;

            // 应用样式和参数
            this.applyStyle(ctx, canvas.width, canvas.height);

            // 绘制图片
            ctx.save();
            ctx.globalAlpha = 0.8;
            ctx.drawImage(this.uploadedImage, x, y, this.uploadedImage.width * scale, this.uploadedImage.height * scale);
            ctx.restore();

            // 应用发绣效果
            this.applyEmbroideryEffect(ctx, canvas.width, canvas.height);
        }

        return canvas.toDataURL('image/png');
    }

    // 应用风格
    applyStyle(ctx, width, height) {
        switch (this.selectedStyle) {
            case 'traditional':
                // 传统发绣风格
                ctx.fillStyle = '#f5f0e6';
                ctx.fillRect(0, 0, width, height);
                break;
            case 'modern':
                // 现代简约风格
                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(0, 0, width, height);
                break;
            case 'sketch':
                // 素描风格
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, width, height);
                break;
            case 'colorful':
                // 彩色发绣风格
                ctx.fillStyle = '#fafafa';
                ctx.fillRect(0, 0, width, height);
                break;
        }
    }

    // 应用发绣效果
    applyEmbroideryEffect(ctx, width, height) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // 根据参数调整
        const density = this.parameters.density / 100;
        const contrast = this.parameters.contrast / 100;
        const brightness = this.parameters.brightness / 100;
        const detail = this.parameters.detail / 100;

        for (let i = 0; i < data.length; i += 4) {
            // 调整亮度和对比度
            let r = data[i] * brightness * contrast;
            let g = data[i + 1] * brightness * contrast;
            let b = data[i + 2] * brightness * contrast;

            // 应用发绣质感
            if (Math.random() > density) {
                // 模拟发丝效果
                const gray = (r + g + b) / 3;
                const hairColor = this.getHairColor(gray, detail);
                data[i] = hairColor.r;
                data[i + 1] = hairColor.g;
                data[i + 2] = hairColor.b;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    // 获取发丝颜色
    getHairColor(gray, detail) {
        // 根据灰度值生成发丝颜色
        const baseColor = { r: 139, g: 90, b: 43 }; // 基础发色
        const variation = (1 - detail) * 50; // 细节越少，颜色变化越大

        return {
            r: Math.max(0, Math.min(255, baseColor.r + (Math.random() - 0.5) * variation)),
            g: Math.max(0, Math.min(255, baseColor.g + (Math.random() - 0.5) * variation)),
            b: Math.max(0, Math.min(255, baseColor.b + (Math.random() - 0.5) * variation))
        };
    }

    // 下一步
    nextStep() {
        if (this.currentStep === 1 && !this.uploadedImage) {
            alert('请先上传图片！');
            return;
        }

        if (this.currentStep < 4) {
            this.currentStep++;
            this.goToStep(this.currentStep);
        }
    }

    // 上一步
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.goToStep(this.currentStep);
        }
    }

    // 跳转到指定步骤
    goToStep(stepNum) {
        this.currentStep = stepNum;
        this.updateStepUI();
    }

    // 更新步骤UI
    updateStepUI() {
        // 更新步骤导航
        document.querySelectorAll('.bx-step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            if (stepNum < this.currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (stepNum === this.currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // 更新步骤面板
        document.querySelectorAll('.bx-step-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelector(`.bx-step-panel[data-step="${this.currentStep}"]`).classList.add('active');

        // 更新导航按钮
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        prevBtn.disabled = this.currentStep === 1;
        nextBtn.textContent = this.currentStep === 4 ? '完成' : '下一步';

        // 如果在第四步，更新预览
        if (this.currentStep === 4) {
            this.updatePreview();
        }
    }

    // 导出图片
    exportImage() {
        if (!this.uploadedImage) return;

        const format = document.getElementById('exportFormat').value;
        const size = document.getElementById('exportSize').value;

        // 创建导出画布
        const canvas = document.createElement('canvas');
        let width, height;

        if (size === 'original') {
            width = this.uploadedImage.width;
            height = this.uploadedImage.height;
        } else {
            width = parseInt(size);
            height = parseInt(size);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // 应用风格和效果
        this.applyStyle(ctx, width, height);

        // 绘制图片
        const scale = Math.min(width / this.uploadedImage.width, height / this.uploadedImage.height);
        const x = (width - this.uploadedImage.width * scale) / 2;
        const y = (height - this.uploadedImage.height * scale) / 2;

        ctx.drawImage(this.uploadedImage, x, y, this.uploadedImage.width * scale, this.uploadedImage.height * scale);

        // 应用发绣效果
        this.applyEmbroideryEffect(ctx, width, height);

        // 导出
        let mimeType, filename;
        switch (format) {
            case 'png':
                mimeType = 'image/png';
                filename = 'hair-embroidery.png';
                break;
            case 'jpg':
                mimeType = 'image/jpeg';
                filename = 'hair-embroidery.jpg';
                break;
            case 'svg':
                // SVG 导出（简化版）
                this.exportSVG(canvas, width, height);
                return;
        }

        // 下载图片
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert('导出成功！作品已保存到您的设备。');
        }, mimeType, 0.95);
    }

    // 导出SVG
    exportSVG(canvas, width, height) {
        const svg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <image width="${width}" height="${height}" href="${canvas.toDataURL('image/png')}" />
                <text x="50%" y="90%" text-anchor="middle" fill="#333" font-family="Arial" font-size="12">
                    数字发绣作品
                </text>
            </svg>
        `;

        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hair-embroidery.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('导出成功！SVG作品已保存到您的设备。');
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new BXGenerator();
});