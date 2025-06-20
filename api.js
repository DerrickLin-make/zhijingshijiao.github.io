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
// api.js
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
            // 如果你希望在API请求失败时显示通知，这里可以调用通知系统
            // window.app.notifications.show(data.error || `请求失败: ${response.status}`, 'error');
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        console.error('API请求失败:', error);
        // 如果你希望在API请求失败时显示通知，这里可以调用通知系统
        // window.app.notifications.show(`API请求失败: ${error.message}`, 'error');
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

// 导出API对象到全局。注意：这里不再导出 `utils`
window.materialsAPI = materialsAPI;
window.chatAPI = chatAPI;
window.analysisAPI = analysisAPI;
// window.utils = utils; // 这一行被移除，因为 utils 在 utils.js 中单独暴露

// 导出API对象
window.materialsAPI = materialsAPI;
window.chatAPI = chatAPI;
window.analysisAPI = analysisAPI;


