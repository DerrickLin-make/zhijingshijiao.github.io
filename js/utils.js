// js/utils.js
const utils = {
    // === 防抖函数 ===
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // === 节流函数 ===
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // === 会话ID相关 ===
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    getSessionId() {
        let sessionId = localStorage.getItem('recitation_session_id');
        if (!sessionId) {
            sessionId = this.generateSessionId();
            localStorage.setItem('recitation_session_id', sessionId);
        }
        return sessionId;
    },
    
    // === 格式化函数 ===
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    formatTime(dateOrSeconds) {
        // 兼容两种 formatTime (时间字符串或秒数)
        if (typeof dateOrSeconds === 'number') {
            const mins = Math.floor(dateOrSeconds / 60);
            const secs = Math.floor(dateOrSeconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        } else if (typeof dateOrSeconds === 'string' || dateOrSeconds instanceof Date) {
            const date = new Date(dateOrSeconds);
            return date.toLocaleString('zh-CN');
        }
        return '';
    },
    
    // === ID生成 ===
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // === 通知系统辅助函数 (这里只包含纯粹的显示逻辑，不包含NotificationSystem类的创建) ===
    // showNotification 最好作为 NotificationSystem 类的方法，而不是 utils 的通用方法。
    // 但如果想保留 utils 里的，就需要把它移到单独的 utils.js 里，且在 main.js 中不要再定义。
    // 鉴于 main.js 中已经有 NotificationSystem 类，这里不建议把 showNotification 放在 utils 里。
    // 如果你坚持要 utils.showNotification，那么 main.js 中的 NotificationSystem 类应该修改，
    // 或者只在 utils 里放一个简单的通用通知函数，而不是一个完整的类。
    // 暂时，我将你的 `showNotification` 移到 utils，并假设 `main.js` 里的 `NotificationSystem` 类会被移除。
    // 如果你不希望移除 `main.js` 里的 `NotificationSystem`，那么这个 `showNotification` 就不要放在这里，
    // 并且 `api.js` 中调用 `utils.showNotification` 的地方要改为 `window.app.notifications.show`。
    // 考虑到你的初衷和避免重复，我建议保留 main.js 中的 NotificationSystem 类。
    // 所以，这里移除了 api.js 原本的 showNotification 方法，因为它与 main.js 的 NotificationSystem 类重复。
};

// 将 utils 对象暴露到全局，以便其他脚本访问
window.utils = utils;