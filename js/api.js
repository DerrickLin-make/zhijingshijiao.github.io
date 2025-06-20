// API配置
const API_BASE_URL = 'http://localhost:5000/api';

// 通用API请求函数
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, finalOptions);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        console.error('API请求失败:', error);
        throw error;
    }
}

// 材料API
const materialsAPI = {
    // 获取材料列表
    async getMaterials(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/materials${queryString ? '?' + queryString : ''}`;
        return await apiRequest(endpoint);
    },
    
    // 获取单个材料
    async getMaterial(id) {
        return await apiRequest(`/materials/${id}`);
    },
    
    // 获取分类
    async getCategories() {
        return await apiRequest('/materials/categories');
    },
    
    // 切换收藏
    async toggleFavorite(materialId, sessionId) {
        return await apiRequest('/materials/favorites', {
            method: 'POST',
            body: JSON.stringify({
                material_id: materialId,
                session_id: sessionId
            })
        });
    },
    
    // 获取收藏列表
    async getFavorites(sessionId) {
        return await apiRequest(`/materials/favorites?session_id=${sessionId}`);
    }
};

// 对话API
const chatAPI = {
    // 发送消息
    async sendMessage(message, sessionId, conversationId = '') {
        return await apiRequest('/chat/send', {
            method: 'POST',
            body: JSON.stringify({
                message,
                session_id: sessionId,
                conversation_id: conversationId
            })
        });
    },
    
    // 获取聊天历史
    async getChatHistory(sessionId, page = 1) {
        return await apiRequest(`/chat/history?session_id=${sessionId}&page=${page}`);
    },
    
    // 清空聊天历史
    async clearChatHistory(sessionId) {
        return await apiRequest('/chat/clear', {
            method: 'POST',
            body: JSON.stringify({
                session_id: sessionId
            })
        });
    }
};

// 分析API
const analysisAPI = {
    // 上传视频
    async uploadVideo(file, sessionId) {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('session_id', sessionId);
        
        return await apiRequest('/analysis/upload', {
            method: 'POST',
            headers: {}, // 让浏览器自动设置Content-Type
            body: formData
        });
    },
    
    // 开始分析
    async analyzeVideo(recordId) {
        return await apiRequest(`/analysis/analyze/${recordId}`, {
            method: 'POST'
        });
    },
    
    // 获取分析结果
    async getAnalysisResult(recordId) {
        return await apiRequest(`/analysis/result/${recordId}`);
    },
    
    // 获取分析历史
    async getAnalysisHistory(sessionId, page = 1) {
        return await apiRequest(`/analysis/history?session_id=${sessionId}&page=${page}`);
    },
    
    // 删除分析记录
    async deleteAnalysisRecord(recordId) {
        return await apiRequest(`/analysis/delete/${recordId}`, {
            method: 'DELETE'
        });
    }
};

// 工具函数
const utils = {
    // 生成会话ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // 获取或创建会话ID
    getSessionId() {
        let sessionId = localStorage.getItem('recitation_session_id');
        if (!sessionId) {
            sessionId = this.generateSessionId();
            localStorage.setItem('recitation_session_id', sessionId);
        }
        return sessionId;
    },
    
    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // 格式化时间
    formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('zh-CN');
    },
    
    // 显示通知
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // 根据类型设置背景色
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// 导出API对象
window.materialsAPI = materialsAPI;
window.chatAPI = chatAPI;
window.analysisAPI = analysisAPI;
window.utils = utils;

