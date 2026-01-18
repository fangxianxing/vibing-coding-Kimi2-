import axios from 'axios';

const KIMI_API_BASE = 'https://api.moonshot.cn/v1';

export class KimiApiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: KIMI_API_BASE,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async analyzeContract(files) {
    try {
      // 上传文件并获取文件内容
      const fileContents = await this.uploadAndExtractFiles(files);
      
      // 构建消息内容
      const messages = [
        {
          role: 'system',
          content: '你是一个专业的租房合同分析专家，擅长识别合同风险条款并提供法律建议。请详细分析用户上传的合同内容，重点关注押金、违约金、维修责任、提前退租等关键条款。'
        },
        {
          role: 'user',
          content: `请分析以下租房合同内容，识别其中的风险条款并提供专业建议。

要求：
1. 给出整体风险等级评估（高/中/低）
2. 详细列出所有发现的风险条款，每个条款包含：
   - 风险类型（高风险/中等风险/低风险/良好条款）
   - 具体条款内容
   - 风险描述
   - 改进建议
   - 相关法律依据
   - 小红书相关案例参考链接（请使用联网搜索功能获取真实的小红书案例链接）

重点关注：
- 押金退还条款是否合理
- 违约金是否过高
- 维修责任划分是否明确
- 提前退租条款是否公平
- 转租限制是否合理
- 房屋损坏赔偿责任是否明确

请用JSON格式返回结果，包含以下字段：
- riskLevel: 整体风险等级
- riskItems: 风险条款数组，每个对象包含type, title, content, suggestion, source, references字段
- summary: 总结建议

合同内容如下：
${fileContents.join('\n\n---\n\n')}`
        }
      ];

      const response = await this.client.post('/chat/completions', {
        model: 'kimi-k2-turbo-preview',
        messages: messages,
        temperature: 0.3,
        max_tokens: 4000,
        // 启用联网搜索功能 - 修正调用方式
        tools: [
          {
            type: 'builtin_function',
            function: {
              name: '$web_search'
            }
          }
        ]
      });

      const content = response.data.choices[0].message.content;
      
      // 尝试解析JSON响应
      try {
        // 提取JSON部分
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          
          // 确保每个风险项都有必要的字段和正确的数据类型
          if (result.riskItems && Array.isArray(result.riskItems)) {
            result.riskItems = result.riskItems.map(item => this.normalizeRiskItem(item));
          } else {
            result.riskItems = [];
          }
          
          return {
            riskLevel: this.normalizeRiskLevel(result.riskLevel),
            riskItems: result.riskItems,
            summary: result.summary || '分析完成',
            analysisDate: new Date().toISOString(),
            fileCount: files.length
          };
        } else {
          // 如果没有找到JSON，返回格式化结果
          return this.createFallbackResult(content, files.length);
        }
      } catch (e) {
        console.error('JSON解析失败:', e);
        // 如果无法解析JSON，返回格式化结果
        return this.createFallbackResult(content, files.length);
      }
    } catch (error) {
      console.error('Kimi API调用失败:', error);
      throw new Error(error.response?.data?.error?.message || '合同分析失败，请检查API密钥或稍后重试');
    }
  }

  // 标准化风险项数据
  normalizeRiskItem(item) {
    return {
      type: this.normalizeRiskType(item.type),
      title: item.title || '风险条款',
      content: item.content || item.text || '未识别条款内容',
      suggestion: item.suggestion || '暂无建议',
      source: item.source || 'Kimi AI分析',
      references: this.normalizeReferences(item.references)
    };
  }

  // 标准化引用数据
  normalizeReferences(references) {
    if (!references) {
      return [];
    }
    
    if (Array.isArray(references)) {
      return references.map(ref => ({
        title: ref.title || '参考链接',
        url: ref.url || '#'
      }));
    }
    
    // 如果references不是数组，返回空数组
    return [];
  }

  // 标准化风险等级
  normalizeRiskLevel(level) {
    if (!level) return 'medium';
    
    const levelStr = level.toString().toLowerCase();
    if (levelStr.includes('high') || levelStr.includes('高')) {
      return 'high';
    } else if (levelStr.includes('low') || levelStr.includes('低')) {
      return 'low';
    }
    return 'medium';
  }

  // 创建备用结果
  createFallbackResult(content, fileCount) {
    return {
      riskLevel: 'medium',
      riskItems: [{
        type: 'info',
        title: '分析结果',
        content: 'Kimi AI分析完成',
        suggestion: content,
        source: 'Kimi AI分析',
        references: []
      }],
      summary: content,
      analysisDate: new Date().toISOString(),
      fileCount: fileCount
    };
  }

  // 上传文件并提取内容
  async uploadAndExtractFiles(files) {
    const fileContents = [];
    
    for (const file of files) {
      try {
        // 上传文件
        const formData = new FormData();
        formData.append('file', file);
        formData.append('purpose', 'file-extract');
        
        const uploadResponse = await axios.post(
          `${KIMI_API_BASE}/files`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        const fileId = uploadResponse.data.id;
        
        // 获取文件内容
        const contentResponse = await this.client.get(`/files/${fileId}/content`);
        fileContents.push(contentResponse.data);
      } catch (error) {
        console.error(`文件 ${file.name} 处理失败:`, error);
        fileContents.push(`[文件 ${file.name} 处理失败: ${error.message}]`);
      }
    }
    
    return fileContents;
  }

  // 标准化风险类型
  normalizeRiskType(type) {
    if (!type) return 'info';
    
    const typeStr = type.toString().toLowerCase();
    if (typeStr.includes('high') || typeStr.includes('error') || typeStr.includes('高风险')) {
      return 'high';
    } else if (typeStr.includes('medium') || typeStr.includes('warning') || typeStr.includes('中等风险')) {
      return 'medium';
    } else if (typeStr.includes('low') || typeStr.includes('info') || typeStr.includes('低风险')) {
      return 'low';
    } else if (typeStr.includes('good') || typeStr.includes('良好')) {
      return 'good';
    }
    return 'info';
  }
}
