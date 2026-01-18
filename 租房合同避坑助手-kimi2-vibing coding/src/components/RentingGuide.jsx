import React, { useState } from 'react';
import { 
  Home, 
  DollarSign, 
  Shield, 
  FileText, 
  Phone, 
  Camera,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RentingGuide = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const guideSections = [
    {
      id: 'contract',
      title: '合同条款注意事项',
      icon: <FileText className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        {
          title: '租金及支付方式',
          content: '明确租金金额、支付时间、支付方式。避免现金支付，建议使用银行转账并保留凭证。'
        },
        {
          title: '押金条款',
          content: '押金通常不超过2个月租金。明确押金退还条件和时间，避免无理扣款。'
        },
        {
          title: '违约责任',
          content: '仔细阅读违约条款，了解提前退租、逾期付款等情况的处理方式。'
        },
        {
          title: '房屋维修责任',
          content: '明确房屋维修责任归属，日常小修一般由租客承担，大修由房东负责。'
        },
        {
          title: '转租条款',
          content: '确认是否允许转租，以及转租的条件和程序。'
        }
      ]
    },
    {
      id: 'inspection',
      title: '看房检查清单',
      icon: <Home className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        {
          title: '房屋结构',
          content: '检查墙体是否有裂缝、漏水痕迹，门窗是否完好，地板是否平整。'
        },
        {
          title: '水电设施',
          content: '测试水龙头、马桶、淋浴、开关、插座等是否正常工作。'
        },
        {
          title: '家电设备',
          content: '检查冰箱、洗衣机、空调、热水器等家电是否正常运行。'
        },
        {
          title: '安全隐患',
          content: '检查燃气管道、电路、防盗设施等安全设备是否完善。'
        },
        {
          title: '周边环境',
          content: '了解周边交通、购物、医疗等配套设施，以及噪音、采光等情况。'
        }
      ]
    },
    {
      id: 'questions',
      title: '必问房东问题',
      icon: <Phone className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: [
        {
          title: '房屋产权',
          content: '确认房东身份和房屋产权，要求查看房产证和身份证。'
        },
        {
          title: '费用明细',
          content: '询问水费、电费、燃气费、物业费、网络费等各项费用的承担方。'
        },
        {
          title: '维修责任',
          content: '明确各种维修责任归属，以及维修响应时间。'
        },
        {
          title: '访客留宿',
          content: '了解是否允许访客留宿，以及相关规定。'
        },
        {
          title: '宠物政策',
          content: '确认是否允许养宠物，以及相关要求和费用。'
        }
      ]
    },
    {
      id: 'deposit',
      title: '押金退还要点',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      items: [
        {
          title: '退房检查',
          content: '退房时与房东一起检查房屋，拍照留存房屋现状。'
        },
        {
          title: '费用结算',
          content: '结清所有费用，包括水电费、物业费、网络费等。'
        },
        {
          title: '物品归还',
          content: '归还所有钥匙、门禁卡等物品，确认数量无误。'
        },
        {
          title: '押金凭证',
          content: '要求房东出具押金退还凭证，明确退还时间和金额。'
        },
        {
          title: '争议处理',
          content: '如有争议，保留相关证据，必要时寻求法律援助。'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">租房避坑指南</h2>
          <p className="text-gray-600">
            掌握这些要点，让您的租房之路更加安全顺利
          </p>
        </div>

        <div className="space-y-4">
          {guideSections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full p-4 flex items-center justify-between ${section.bgColor} hover:opacity-80 transition-opacity`}
              >
                <div className="flex items-center space-x-3">
                  <div className={section.color}>
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white space-y-4">
                      {section.items.map((item, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4">
                          <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-700 text-sm">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Tips */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">紧急提醒</h3>
            <ul className="text-red-800 space-y-2 text-sm">
              <li>• 切勿轻信口头承诺，所有约定必须写入合同</li>
              <li>• 避免支付大额现金，保留所有付款凭证</li>
              <li>• 遇到诈骗或纠纷，及时报警并寻求法律援助</li>
              <li>• 重要合同条款不确定时，建议咨询专业律师</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentingGuide;
