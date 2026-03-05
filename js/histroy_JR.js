// 匠人新语数据
const artisanData = [
    {
        id: 1,
        name: "陶永红",
        bio: "陶永红，国家级发绣项目代表性传承人。从事发绣艺术创作40余年，作品多次获奖并被博物馆收藏。，国家级非物质文化遗产发绣项目代表性传承人，从事发绣艺术创作40余年。自幼跟随祖母学习发绣技艺，在传统基础上不断创新，形成了自己独特的艺术风格。其作品多次在国内外展览中获奖，被多家博物馆收藏。",
        achievements: [
            { icon: "🏆", text: "国家级传承人" },
            { icon: "🎨", text: "40年创作经验" },
            { icon: "📚", text: "作品被博物馆收藏" }
        ],
        works: [
            {
                title: "《清明上河图》局部",
                image: "img/work1.jpg",
                description: "耗时3年完成，使用多种发质表现画面层次，细节丰富，色彩自然。"
            },
            {
                title: "《观音像》",
                image: "img/work2.jpg",
                description: "采用传统针法，结合现代审美，展现了观音的慈悲与庄严。"
            },
            {
                title: "《山水图》",
                image: "img/work3.jpg",
                description: "利用不同发质的自然色彩，表现山水的远近层次，意境深远。"
            }
        ],
        story: "陶永红出生于发绣世家，祖母是当地有名的发绣艺人。从小在祖母的熏陶下，张大师对发绣产生了浓厚的兴趣。12岁开始正式学习发绣技艺，从最基础的穿针引线开始，一步步掌握了各种针法。在学艺过程中，张大师经历了无数次的失败和挫折，但他始终坚持下来。他说：\"发绣是一门需要耐心和毅力的艺术，每一针每一线都要用心去绣，容不得半点马虎。\"为了传承和发展发绣艺术，张大师不仅自己坚持创作，还收徒授艺，培养了一大批年轻的发绣艺人。他希望通过自己的努力，让更多的人了解和喜爱发绣这门传统艺术。近年来，张大师不断探索创新，将现代艺术元素融入传统发绣中，创作出了许多具有时代特色的作品，为发绣艺术注入了新的活力。"
    },
    {
        id: 2,
        name: "刘昱含",
        bio: "刘昱含，国家级发绣项目代表性传承人。从事发绣艺术创作30余年，擅长人物肖像和花鸟题材的创作，其作品细腻传神，深受收藏家喜爱。，省级非物质文化遗产发绣项目代表性传承人，从事发绣艺术创作30余年。擅长人物肖像和花鸟题材的发绣创作，其作品细腻传神，深受收藏家喜爱。",
        achievements: [
            { icon: "🏅", text: "省级传承人" },
            { icon: "🎯", text: "30年创作经验" },
            { icon: "🌟", text: "擅长人物肖像" }
        ],
        works: [
            {
                title: "《牡丹图》",
                image: "img/work4.jpg",
                description: "以发代丝，绣制的牡丹图色彩艳丽，层次分明，栩栩如生。"
            },
            {
                title: "《人物肖像》",
                image: "img/work5.jpg",
                description: "运用精细的针法，表现人物的神态和气质，惟妙惟肖。"
            },
            {
                title: "《梅兰竹菊》",
                image: "img/work6.jpg",
                description: "传统题材的创新表现，展现了发绣的独特魅力。"
            }
        ],
        story: "刘昱含出身于普通家庭，偶然机会接触到发绣艺术，从此一发不可收拾。为了学习发绣技艺，他遍访名师，刻苦钻研，终于在30岁时成为当地有名的发绣艺人。李师傅对发绣艺术有着独特的理解，他认为发绣不仅是一门技艺，更是一种情感的表达。每一件作品都融入了他的心血和情感，因此显得格外生动传神。近年来，李师傅致力于发绣技艺的传承和推广，开设了发绣培训班，培养了许多年轻的发绣爱好者。他希望通过自己的努力，让更多的人了解发绣艺术，让这门传统技艺在新时代焕发出新的光彩。"
    },
    {
        id: 3,
        name: "王老师",
        bio: "王老师，年轻一代发绣传承人，毕业于艺术学院，将现代艺术理念与传统发绣技艺相结合，创作出许多富有时代特色的发绣作品。",
        achievements: [
            { icon: "🎓", text: "艺术学院毕业" },
            { icon: "💡", text: "创新发绣技法" },
            { icon: "✨", text: "年轻一代传承人" }
        ],
        works: [
            {
                title: "《现代抽象》",
                image: "img/work7.jpg",
                description: "将现代抽象艺术与传统发绣相结合，创造出独特的视觉效果。"
            },
            {
                title: "《城市风光》",
                image: "img/work8.jpg",
                description: "以发绣表现现代城市的繁华与活力，题材新颖。"
            },
            {
                title: "《时尚人物》",
                image: "img/work9.jpg",
                description: "运用发绣技艺表现现代时尚人物，风格独特。"
            }
        ],
        story: "王老师是年轻一代发绣传承人的代表，她毕业于艺术学院，有着扎实的艺术功底。在接触到发绣艺术后，她被这种独特的艺术形式深深吸引，决定将现代艺术理念与传统发绣技艺相结合，开创发绣艺术的新境界。王老师的作品题材新颖，风格独特，深受年轻人的喜爱。她认为，传统技艺要想在现代社会立足，必须不断创新，与时俱进。因此，她在保留传统发绣精髓的同时，大胆尝试新的题材和表现形式，为发绣艺术注入了新的活力。王老师还利用互联网平台推广发绣艺术，通过社交媒体和在线课程，让更多的年轻人了解和喜爱发绣这门传统技艺。她希望通过自己的努力，让发绣艺术在新时代得到更好的传承和发展。"
    }
];

// 初始化匠人新语版块
function initArtisanSection() {
    const avatars = document.querySelectorAll('.xiuyuan-artisan-avatar');
    const tabs = document.querySelectorAll('.xiuyuan-artisan-tab');
    const contentWrapper = document.querySelector('.xiuyuan-artisan-content-wrapper');
    
    // 头像点击事件
    avatars.forEach(avatar => {
        avatar.addEventListener('click', function() {
            const artisanId = parseInt(this.dataset.artisan);
            
            // 添加加载动画
            contentWrapper.style.opacity = '0.7';
            contentWrapper.style.transform = 'scale(0.98)';
            
            // 延迟加载数据，添加动画效果
            setTimeout(() => {
                // 加载对应传承人的数据
                loadArtisanData(artisanId);
                
                // 恢复内容区域状态
                contentWrapper.style.opacity = '1';
                contentWrapper.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // 标签页点击事件
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // 更新标签页选中状态
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应标签内容
            const tabContents = document.querySelectorAll('.xiuyuan-artisan-tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tab === tabName) {
                    // 添加延迟，使动画效果更明显
                    setTimeout(() => {
                        content.classList.add('active');
                    }, 100);
                }
            });
        });
    });
}

// 加载传承人数据
function loadArtisanData(artisanId) {
    const artisan = artisanData.find(a => a.id === artisanId);
    if (!artisan) return;
    
    // 更新个人简介
    const artisanName = document.getElementById('artisanName');
    const artisanBio = document.getElementById('artisanBio');
    const achievementsContainer = document.querySelector('.xiuyuan-artisan-achievements');
    
    if (artisanName) artisanName.textContent = artisan.name;
    if (artisanBio) artisanBio.textContent = artisan.bio;
    
    // 更新成就
    if (achievementsContainer) {
        achievementsContainer.innerHTML = '';
        artisan.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = 'xiuyuan-achievement-item';
            achievementElement.innerHTML = `
                <span class="xiuyuan-achievement-icon">${achievement.icon}</span>
                <span class="xiuyuan-achievement-text">${achievement.text}</span>
            `;
            achievementsContainer.appendChild(achievementElement);
        });
    }
    
    // 更新代表作品
    const worksContainer = document.querySelector('.xiuyuan-artisan-works');
    if (worksContainer) {
        worksContainer.innerHTML = '';
        artisan.works.forEach(work => {
            const workElement = document.createElement('div');
            workElement.className = 'xiuyuan-work-item';
            workElement.innerHTML = `
                <div class="xiuyuan-work-image">
                    <img src="${work.image}" alt="${work.title}">
                </div>
                <div class="xiuyuan-work-info">
                    <h4>${work.title}</h4>
                    <p>${work.description}</p>
                </div>
            `;
            worksContainer.appendChild(workElement);
        });
    }
    
    // 更新传承故事
    const storyContainer = document.querySelector('.xiuyuan-artisan-story');
    if (storyContainer) {
        storyContainer.innerHTML = '';
        const paragraphs = artisan.story.split('。').filter(p => p.trim() !== '');
        paragraphs.forEach(paragraph => {
            const pElement = document.createElement('p');
            pElement.textContent = paragraph + '。';
            storyContainer.appendChild(pElement);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initArtisanSection();
});