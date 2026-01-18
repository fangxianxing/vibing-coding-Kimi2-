import { KimiApiService } from '../services/kimiApi';

// 创建Kimi API服务实例
let kimiService = null;

export const initializeKimiService = (apiKey) => {
  if (apiKey) {
    kimiService = new KimiApiService(apiKey);
    return true;
  }
  return false;
};

// 分析合同文件
export const analyzeContract = async (files, apiKey) => {
  if (!apiKey) {
    throw new Error('请先配置Kimi API密钥');
  }

  // 初始化服务
  if (!kimiService || kimiService.apiKey !== apiKey) {
    initializeKimiService(apiKey);
  }

  try {
    // 验证文件类型
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );

    if (validFiles.length === 0) {
      throw new Error('请上传有效的图片文件（JPG、PNG）');
    }

    // 使用Kimi API分析合同
    const analysisResult = await kimiService.analyzeContract(validFiles);

    // 确保返回结果的数据完整性
    return {
      riskLevel: analysisResult.riskLevel || 'medium',
      riskItems: Array.isArray(analysisResult.riskItems) ? analysisResult.riskItems.map(item => normalizeRiskItem(item)) : [],
      summary: analysisResult.summary || '分析完成',
      analysisDate: analysisResult.analysisDate || new Date().toISOString(),
      fileCount: validFiles.length
    };
  } catch (error) {
    console.error('合同分析失败:', error);
    throw new Error(error.message || '合同分析失败，请稍后重试');
  }
};

// 标准化风险项数据
const normalizeRiskItem = (item) => {
  return {
    type: item.type || 'info',
    title: item.title || '风险条款',
    content: item.content || '未识别条款内容',
    suggestion: item.suggestion || '暂无建议',
    source: item.source || 'Kimi AI分析',
    references: Array.isArray(item.references) ? item.references : []
  };
};

// 小红书案例链接
export const xiaohongshuCases = {
  deposit: [
    { title: '租房押金纠纷案例', url: 'https://www.xiaohongshu.com/explore/租房押金纠纷案例' },
    { title: '押金退还注意事项', url: 'https://www.xiaohongshu.com/explore/押金退还注意事项' },
    { title: '租房押金被扣怎么办', url: 'https://www.xiaohongshu.com/explore/租房押金被扣怎么办' },
    { title: '押金退还时间规定', url: 'https://www.xiaohongshu.com/explore/押金退还时间规定' }
  ],
  contract: [
    { title: '租房合同避坑指南', url: 'https://www.xiaohongshu.com/explore/租房合同避坑指南' },
    { title: '合同条款分析', url: 'https://www.xiaohongshu.com/explore/合同条款分析' },
    { title: '租房合同注意事项', url: 'https://www.xiaohongshu.com/explore/租房合同注意事项' },
    { title: '合同陷阱识别', url: 'https://www.xiaohongshu.com/explore/合同陷阱识别' }
  ],
  violation: [
    { title: '违约金纠纷案例', url: 'https://www.xiaohongshu.com/explore/违约金纠纷案例' },
    { title: '提前退租经验分享', url: 'https://www.xiaohongshu.com/explore/提前退租经验分享' },
    { title: '违约金过高怎么办', url: 'https://www.xiaohongshu.com/explore/违约金过高怎么办' },
    { title: '提前退租违约金', url: 'https://www.xiaohongshu.com/explore/提前退租违约金' }
  ],
  maintenance: [
    { title: '房屋维修责任划分', url: 'https://www.xiaohongshu.com/explore/房屋维修责任划分' },
    { title: '维修费用承担', url: 'https://www.xiaohongshu.com/explore/维修费用承担' },
    { title: '房屋损坏赔偿', url: 'https://www.xiaohongshu.com/explore/房屋损坏赔偿' },
    { title: '维修不及时投诉', url: 'https://www.xiaohongshu.com/explore/维修不及时投诉' }
  ],
  sublet: [
    { title: '转租规定和限制', url: 'https://www.xiaohongshu.com/explore/转租规定和限制' },
    { title: '转租流程和注意事项', url: 'https://www.xiaohongshu.com/explore/转租流程和注意事项' },
    { title: '转租风险提示', url: 'https://www.xiaohongshu.com/explore/转租风险提示' },
    { title: '转租合同模板', url: 'https://www.xiaohongshu.com/explore/转租合同模板' }
  ],
  safety: [
    { title: '房屋安全检查', url: 'https://www.xiaohongshu.com/explore/房屋安全检查' },
    { title: '租房安全隐患', url: 'https://www.xiaohongshu.com/explore/租房安全隐患' },
    { title: '燃气安全使用', url: 'https://www.xiaohongshu.com/explore/燃气安全使用' },
    { title: '电路安全检查', url: 'https://www.xiaohongshu.com/explore/电路安全检查' }
  ]
};
