document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 粒子背景初始化 ---
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 2, random: true, anim: { enable: false } },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_opacity: 0.5 },
                push: { particles_nb: 4 },
            }
        },
        retina_detect: true
    });

    // --- 自訂滑鼠游標 ---
    const customCursor = document.querySelector('.custom-cursor');
    if (window.matchMedia("(min-width: 481px)").matches) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(customCursor, { duration: 0.2, x: e.clientX, y: e.clientY });
        });

        document.querySelectorAll('a, button, .portfolio-card, .skill-card').forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('hovered'));
        });
    }

    // --- Header 滾動時隱藏/顯示 ---
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scroll Down
            gsap.to(header, { top: -1000, duration: 0.3 });
        } else {
            // Scroll Up
            gsap.to(header, { top: 0, duration: 0.3 });
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // --- Hero Section 打字機效果 ---
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const titleText = "Welcome, I'm Noopycai";
    const subtitleText = "A passionate front-end developer crafting digital experiences.";

    function typeWriter(element, text, onComplete = () => {}, i = 0) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(element, text, onComplete, i + 1), 60);
        } else {
            if (onComplete) onComplete();
        }
    }

    gsap.from('.hero-content', { duration: 1, opacity: 0, y: 50, delay: 0.5, onComplete: () => {
        typeWriter(heroTitle, titleText, () => {
            typeWriter(heroSubtitle, subtitleText);
        });
    }});

    // --- 平滑滾動 ---
    document.querySelectorAll('nav a, .scroll-down-indicator').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            gsap.to(window, { duration: 1.5, scrollTo: { y: targetId, offsetY: 50 }, ease: 'power3.inOut' });
        });
    });

    // --- GSAP 滾動觸發動畫 ---
    gsap.utils.toArray('.scroll-section').forEach(section => {
        const tl = gsap.timeline({ 
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
            }
        });

        tl.to(section, { opacity: 1, visibility: 'visible', duration: 0.1 });

        const h2 = section.querySelector('h2');
        if (h2) {
            tl.from(h2, { duration: 0.8, y: -50, opacity: 0, ease: 'power3.out' }, '-=0.4');
        }

        if (section.id === 'about') {
            tl.from('.about-image', { duration: 1, x: -100, opacity: 0, ease: 'power3.out' }, '-=0.5');
            tl.from('.about-text p', { duration: 1, x: 100, opacity: 0, ease: 'power3.out' }, '-=0.8');
        }

        if (section.id === 'skills') {
            tl.from('.skill-card', { 
                duration: 0.5, 
                y: 50, 
                opacity: 0, 
                scale: 0.9, 
                stagger: 0.1, 
                ease: 'back.out(1.7)' 
            }, '-=0.5');
        }

        if (section.id === 'portfolio') {
            tl.from('.portfolio-card', { 
                duration: 0.6, 
                y: 50, 
                opacity: 0, 
                stagger: 0.15, 
                ease: 'power3.out' 
            }, '-=0.5');
        }

        if (section.id === 'contact') {
            tl.from('.form-group', { duration: 0.6, x: -50, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '-=0.5');
            tl.from('.cta-button', { duration: 0.6, scale: 0.8, opacity: 0, ease: 'back.out(1.7)' }, '-=0.3');
            tl.from('.contact-links a', { duration: 0.5, y: 20, opacity: 0, stagger: 0.1, ease: 'power3.out' }, '-=0.3');
        }
    });

    // --- 動態生成技能卡片 ---
    const skillsContainer = document.querySelector('.skills-container');
    const skills = [
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    ];

    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-card-content">
                <img src="${skill.icon}" alt="${skill.name}">
                <p>${skill.name}</p>
            </div>
        `;
        skillsContainer.appendChild(card);
    });

    // --- 動態生成作品集卡片 & Modal 邏輯 ---
    const portfolioContainer = document.querySelector('.portfolio-container');
    const projects = [
        {
            title: '專案一：電商網站',
            description: '使用原生JS實現的響應式電商網站，包含購物車功能。這是一個展示前端開發技能的綜合性專案。',
            image: './image/icon.png',
            demoLink: '#',
            githubLink: '#'
        },
        {
            title: '專案二：任務管理工具',
            description: '一個使用 React 和 Node.js 開發的任務管理工具，支援任務的增刪改查，並具備使用者身份驗證功能。',
            image: './image/icon.png',
            demoLink: '#',
            githubLink: '#'
        },
        {
            title: '專案三：部落格平台',
            description: '基於 Next.js 搭建的靜態網站生成個人部落格，支援 Markdown 語法，並整合了 Disqus 評論系統。',
            image: './image/icon.png',
            demoLink: '#',
            githubLink: '#'
        },
    ];

    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDemoLink = document.getElementById('modal-demo-link');
    const modalGithubLink = document.getElementById('modal-github-link');
    const closeModal = document.querySelector('.close-button');

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="portfolio-card-content">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 60)}...</p>
            </div>
        `;
        portfolioContainer.appendChild(card);

        card.addEventListener('click', () => {
            modalImg.src = project.image;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalDemoLink.href = project.demoLink;
            modalGithubLink.href = project.githubLink;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});