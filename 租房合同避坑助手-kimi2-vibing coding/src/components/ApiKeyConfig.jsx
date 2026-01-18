import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ApiKeyConfig = ({ onApiKeyChange, savedApiKey }) => {
  const [apiKey, setApiKey] = useState(savedApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // 从localStorage加载保存的API密钥
    const saved = localStorage.getItem('kimi_api_key');
    if (saved && !apiKey) {
      setApiKey(saved);
      onApiKeyChange(saved);
    }
  }, [onApiKeyChange, apiKey]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('kimi_api_key', apiKey.trim());
      onApiKeyChange(apiKey.trim());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('kimi_api_key');
    onApiKeyChange('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Key className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Kimi API 配置</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API密钥
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="请输入您的Kimi API密钥"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleSaveApiKey}
            disabled={!apiKey.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>{isSaved ? '已保存' : '保存密钥'}</span>
          </button>

          {apiKey && (
            <button
              onClick={handleClearApiKey}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              清除
            </button>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">获取API密钥：</p>
              <p>请访问 <a href="https://platform.moonshot.cn/" target="_blank" rel="noopener noreferrer" className="underline">Kimi开放平台</a> 注册并获取API密钥</p>
              <p className="mt-1">密钥仅保存在本地，不会上传到服务器</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApiKeyConfig;
