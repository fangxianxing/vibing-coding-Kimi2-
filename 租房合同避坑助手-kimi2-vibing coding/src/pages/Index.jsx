import React, { useState } from 'react';
import { Upload, FileText, Shield, AlertTriangle, CheckCircle, Sparkles, Key, Camera } from 'lucide-react';
import ContractUploader from '../components/ContractUploader';
import RiskAnalysis from '../components/RiskAnalysis';
import RentingGuide from '../components/RentingGuide';
import ApiKeyConfig from '../components/ApiKeyConfig';
import { analyzeContract } from '../utils/contractAnalyzer';

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
  };

  const handleFileUpload = async (files) => {
    if (!apiKey) {
      alert('请先配置Kimi API密钥');
      setIsAnalyzing(false);
      return;
    }

    handleStartAnalysis();

    try {
      const result = await analyzeContract(files, apiKey);
      handleAnalysisComplete(result);
    } catch (error) {
      console.error('分析失败:', error);
      handleAnalysisComplete({
        riskLevel: 'high',
        riskItems: [
          {
            type: 'error',
            title: '分析失败',
            content: '分析过程中出现错误',
            suggestion: error.message || '请检查API密钥配置或稍后重试',
            source: '系统错误',
            references: []
          }
        ],
        summary: '分析失败，请检查API密钥配置或稍后重试',
        analysisDate: new Date().toISOString(),
        fileCount: files.length
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-blue-600" />
              <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">租房合同避坑助手</h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            基于Kimi AI智能识别合同风险条款，保护您的租房权益
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* API Configuration */}
        <ApiKeyConfig 
          onApiKeyChange={setApiKey}
          savedApiKey={apiKey}
        />

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              {apiKey && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              上传租房合同
            </h2>
            <p className="text-gray-600">
              支持上传合同照片，Kimi AI将智能分析其中的风险条款
            </p>
            {!apiKey && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ 请先配置Kimi API密钥以启用智能分析功能
                </p>
              </div>
            )}
          </div>

          <ContractUploader 
            onAnalysisComplete={handleAnalysisComplete}
            onStartAnalysis={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
            onFileUpload={handleFileUpload}
            disabled={!apiKey}
          />
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <RiskAnalysis result={analysisResult} />
        )}

        {/* Renting Guide */}
        <RentingGuide />

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            为什么选择我们的避坑助手？
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AI智能分析</h4>
              <p className="text-gray-600">
                基于Kimi AI大模型，精准识别合同中的风险条款和法律问题
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">隐私保护</h4>
              <p className="text-gray-600">
                所有处理均在本地完成，API密钥仅保存在您的浏览器中
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">图片直传</h4>
              <p className="text-gray-600">
                支持直接上传合同图片，无需手动输入文本内容
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            ⚠️ 本工具仅供学习参考，不构成法律建议。重要合同请咨询专业律师。
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            所有数据仅在本地处理，不会上传到服务器，保护您的隐私安全
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
