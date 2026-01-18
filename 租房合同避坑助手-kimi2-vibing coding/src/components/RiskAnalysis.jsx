import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Eye, 
  ExternalLink, 
  BookOpen, 
  Link,
  ChevronDown,
  ChevronUp,
  FileText,
  Shield,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RiskAnalysis = ({ result }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getRiskIcon = (type) => {
    switch (type) {
      case 'high':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRiskColor = (type) => {
    switch (type) {
      case 'high':
        return {
          border: 'border-red-200',
          bg: 'bg-red-50',
          header: 'bg-red-100',
          text: 'text-red-800'
        };
      case 'medium':
        return {
          border: 'border-yellow-200',
          bg: 'bg-yellow-50',
          header: 'bg-yellow-100',
          text: 'text-yellow-800'
        };
      case 'low':
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          header: 'bg-blue-100',
          text: 'text-blue-800'
        };
      case 'good':
        return {
          border: 'border-green-200',
          bg: 'bg-green-50',
          header: 'bg-green-100',
          text: 'text-green-800'
        };
      default:
        return {
          border: 'border-gray-200',
          bg: 'bg-gray-50',
          header: 'bg-gray-100',
          text: 'text-gray-800'
        };
    }
  };

  const getRiskLevelDisplay = (level) => {
    switch (level) {
      case 'high':
        return { text: '高风险', color: 'text-red-600', bg: 'bg-red-100' };
      case 'medium':
        return { text: '中等风险', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'low':
        return { text: '低风险', color: 'text-green-600', bg: 'bg-green-100' };
      default:
        return { text: '待分析', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  // 安全检查result和riskItems
  if (!result || !result.riskItems || !Array.isArray(result.riskItems)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="h-6 w-6 text-yellow-600" />
          <h2 className="text-xl font-bold text-gray-900">分析结果异常</h2>
        </div>
        <p className="text-gray-600">分析结果格式异常，请重新上传文件进行分析。</p>
      </motion.div>
    );
  }

  const riskLevelDisplay = getRiskLevelDisplay(result.riskLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Analysis Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">分析结果</h2>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${riskLevelDisplay.bg} ${riskLevelDisplay.color}`}>
            {riskLevelDisplay.text}
          </div>
        </div>

        {/* Summary */}
        {result.summary && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">分析总结</h3>
                <p className="text-sm text-blue-800">{result.summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="font-medium text-red-800">高风险</span>
            </div>
            <p className="text-2xl font-bold text-red-600">
              {result.riskItems.filter(item => item.type === 'high').length}
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span className="font-medium text-yellow-800">中等风险</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {result.riskItems.filter(item => item.type === 'medium').length}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-blue-800">低风险</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {result.riskItems.filter(item => item.type === 'low').length}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium text-green-800">良好条款</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {result.riskItems.filter(item => item.type === 'good').length}
            </p>
          </div>
        </div>

        {/* Analysis Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">分析信息</span>
          </div>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• 分析时间：{result.analysisDate ? new Date(result.analysisDate).toLocaleString('zh-CN') : '未知'}</p>
            <p>• 处理文件：{result.fileCount || 0} 个</p>
            <p>• 分析引擎：Kimi AI (kimi-k2-turbo-preview)</p>
          </div>
        </div>
      </div>

      {/* Risk Items */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">详细分析</h3>
        <div className="space-y-4">
          {result.riskItems.map((item, index) => {
            // 安全检查每个风险项
            const safeItem = {
              type: item.type || 'info',
              title: item.title || '风险条款',
              content: item.content || '未识别条款内容',
              suggestion: item.suggestion || '暂无建议',
              source: item.source || 'Kimi AI分析',
              references: Array.isArray(item.references) ? item.references : []
            };

            const colors = getRiskColor(safeItem.type);
            const isExpanded = expandedItems.has(index);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-lg overflow-hidden ${colors.border} ${colors.bg}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full p-4 flex items-center justify-between ${colors.header} hover:opacity-80 transition-opacity`}
                >
                  <div className="flex items-center space-x-3">
                    {getRiskIcon(safeItem.type)}
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">{safeItem.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
                        {safeItem.type === 'high' ? '高风险' : 
                         safeItem.type === 'medium' ? '中等风险' : 
                         safeItem.type === 'low' ? '低风险' : 
                         safeItem.type === 'good' ? '良好条款' : '信息'}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        {/* Content */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">条款内容</h5>
                          <p className="text-gray-700 text-sm bg-white bg-opacity-70 rounded p-3">
                            {safeItem.content}
                          </p>
                        </div>

                        {/* Suggestion */}
                        {safeItem.suggestion && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-blue-600" />
                              <span>专业建议</span>
                            </h5>
                            <p className="text-gray-700 text-sm bg-white bg-opacity-70 rounded p-3">
                              {safeItem.suggestion}
                            </p>
                          </div>
                        )}

                        {/* Source and References */}
                        <div className="space-y-3">
                          {safeItem.source && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <BookOpen className="h-4 w-4" />
                              <span className="font-medium">来源：</span>
                              <span>{safeItem.source}</span>
                            </div>
                          )}
                          
                          {safeItem.references.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                                <Link className="h-4 w-4" />
                                <span>相关案例参考</span>
                              </p>
                              <div className="space-y-2">
                                {safeItem.references.map((ref, refIndex) => (
                                  <a
                                    key={refIndex}
                                    href={ref.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 bg-white bg-opacity-70 rounded p-2 hover:bg-opacity-100 transition-colors"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    <span>{ref.title || '参考链接'}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default RiskAnalysis;
