import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, FileText, Loader2, AlertCircle, X, Image } from 'lucide-react';
import { motion } from 'framer-motion';

const ContractUploader = ({ onAnalysisComplete, onStartAnalysis, isAnalyzing, onFileUpload, disabled }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (disabled) {
      setError('请先配置Kimi API密钥');
      return;
    }

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some(e => e.code === 'file-too-large')) {
        setError('文件过大，请上传小于10MB的文件');
      } else if (rejection.errors.some(e => e.code === 'too-many-files')) {
        setError('文件数量过多，最多上传5个文件');
      } else {
        setError('文件格式不支持，请上传JPG、PNG格式的图片');
      }
      return;
    }

    setError('');
    setUploadedFiles(acceptedFiles);
    
    if (onFileUpload) {
      await onFileUpload(acceptedFiles);
    }
  }, [onFileUpload, disabled]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    disabled: disabled || isAnalyzing
  });

  const removeFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          disabled 
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50' 
            : isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        } ${isAnalyzing ? 'pointer-events-none opacity-50' : ''}`}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        <input {...getInputProps()} />
        
        {isAnalyzing ? (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
            <div>
              <p className="text-lg font-medium text-gray-900">正在分析合同...</p>
              <p className="text-sm text-gray-600">Kimi AI正在智能识别风险条款，请稍候</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Upload className="h-12 w-12 text-gray-400" />
              <Camera className="h-12 w-12 text-gray-400" />
              <Image className="h-12 w-12 text-gray-400" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? '释放文件开始分析' : '拖拽图片到此处或点击上传'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                支持 JPG、PNG 格式，单个文件最大 10MB，最多上传 5 个文件
              </p>
            </div>

            {disabled && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    请先在上方配置Kimi API密钥以启用分析功能
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <h3 className="font-medium text-gray-900 mb-3">已上传文件：</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                <div className="flex items-center space-x-3">
                  <Image className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  disabled={isAnalyzing}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">上传提示：</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 确保合同照片清晰，文字可辨认</li>
          <li>• 可以多张图片上传，系统会自动拼接分析</li>
          <li>• 支持直接上传图片，Kimi AI会自动识别文本内容</li>
          <li>• 所有处理均在本地完成，保护隐私安全</li>
          <li>• 分析结果基于Kimi AI，仅供参考，建议咨询专业律师</li>
        </ul>
      </div>
    </div>
  );
};

export default ContractUploader;
