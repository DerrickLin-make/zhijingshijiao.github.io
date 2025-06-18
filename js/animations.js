// 动画效果和交互增强

// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    initPageAnimations();
    initInteractiveElements();
    initParallaxEffects();
    initHoverEffects();
});

// 初始化页面动画
function initPageAnimations() {
    // 页面加载时的淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 元素依次出现动画
    const animatedElements = document.querySelectorAll('.feature-card, .step, .hero-content > *');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + index * 100);
    });
}

// 交互元素增强
function initInteractiveElements() {
    // 按钮点击波纹效果
    const buttons = document.querySelectorAll('.btn, .feature-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.feature-card, .hero-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 创建波纹效果
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // 确保按钮有相对定位
    if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
    }
    
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // 动画结束后移除元素
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// 添加波纹动画CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// 视差滚动效果
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .hero-section::before');
    
    window.addEventListener('scroll', utils.throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    }, 16));
}

// 悬停效果增强
function initHoverEffects() {
    // 导航链接悬停效果
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 统计数字悬停效果
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const number = this.querySelector('.stat-number');
            number.style.transform = 'scale(1.1)';
            number.style.color = 'var(--primary-blue)';
        });
        
        item.addEventListener('mouseleave', function() {
            const number = this.querySelector('.stat-number');
            number.style.transform = 'scale(1)';
            number.style.color = '';
        });
    });
}

// 滚动进度指示器
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 文字打字机效果
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 数字滚动动画增强
function animateNumber(element, start, end, duration = 2000) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 元素出现动画观察器
const appearanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.dataset.animation || 'fadeIn';
            
            switch (animationType) {
                case 'slideUp':
                    element.style.animation = 'slideUp 0.6s ease-out forwards';
                    break;
                case 'slideLeft':
                    element.style.animation = 'slideLeft 0.6s ease-out forwards';
                    break;
                case 'slideRight':
                    element.style.animation = 'slideRight 0.6s ease-out forwards';
                    break;
                case 'scaleIn':
                    element.style.animation = 'scaleIn 0.5s ease-out forwards';
                    break;
                default:
                    element.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
            
            appearanceObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// 添加更多动画关键帧
const additionalAnimations = document.createElement('style');
additionalAnimations.textContent = `
    @keyframes slideLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
        }
        40%, 43% {
            transform: translateY(-10px);
        }
        70% {
            transform: translateY(-5px);
        }
        90% {
            transform: translateY(-2px);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    .bounce {
        animation: bounce 1s;
    }
`;
document.head.appendChild(additionalAnimations);

// 鼠标跟随效果
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });
    
    // 在可点击元素上放大
    const clickableElements = document.querySelectorAll('a, button, .clickable');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// 页面切换动画
function pageTransition(targetUrl) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-primary);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 300);
}

// 初始化所有动画效果
function initAllAnimations() {
    initScrollProgress();
    initMouseFollower();
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        appearanceObserver.observe(element);
    });
}

// 在页面加载完成后初始化所有动画
window.addEventListener('load', initAllAnimations);

// 导出动画函数
window.animations = {
    typewriterEffect,
    animateNumber,
    pageTransition,
    createRippleEffect
};

