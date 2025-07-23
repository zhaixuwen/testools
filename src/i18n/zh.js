export default {
  header: {
    title: 'Testools',
    github: 'Github'
  },
  common: {
    copySuccess: '复制成功！',
    copyFailed: '复制失败，请手动复制。',
    systemError: '系统错误：{error}',
    confirm: '确认',
    cancel: '取消',
    close: '关闭',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    loading: '加载中...'
  },
  categories: {
    daily: {
      name: '日常工具',
      tools: {
        uuid: 'UUID 生成器',
        timestamp: '时间戳转换'
      }
    },
    text: {
      name: '字符处理',
      tools: {
        blankClear: '空白字符清理'
      }
    },
    debug: {
      name: '开发调试',
      tools: {
        apiMock: 'API 调试工具'
      }
    },
    mock: {
      name: '模拟数据',
      tools: {
        userInfo: '用户信息生成'
      }
    },
    json: {
      name: 'JSON 工具',
      tools: {
        jsonFormat: 'JSON 格式化',
        jsonCompare: 'JSON 对比工具'
      }
    }
  },
  language: {
    en: 'English',
    zh: '中文'
  },
  cards: {
    uuid: {
      title: 'UUID 生成器',
      description: '生成随机 UUID 并自动复制到剪贴板',
      version: '版本',
      generate: '生成并复制',
      copy: '复制',
      clear: '清空',
      lowercase: '小写 UUID',
      uppercase: '大写 UUID',
      placeholder: '点击生成按钮创建 UUID'
    },
    timestamp: {
      title: '时间戳转换工具',
      description: '在 UTC 时间和时间戳之间进行转换',
      utcToTimestamp: 'UTC 时间转时间戳',
      timestampToUtc: '时间戳转 UTC 时间',
      utcTime: 'UTC 时间',
      timestampMs: '时间戳 (毫秒)',
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      convert: '转换',
      copy: '复制',
      clear: '清空',
      currentTime: '当前时间',
      resetAll: '重置为当前时间'
    },
    blankClear: {
      title: '空格清除工具',
      description: '一键清除文本中的所有空格',
      placeholder: '请输入需要清除空格的文本',
      clean: '清除空格并复制',
      reset: '重置',
      copySuccess: '已清除空格并复制到剪贴板',
      copyError: '复制到剪贴板失败'
    },
    apiMock: {
      title: 'API 调试工具',
      description: '模拟 API 请求，支持导入 cURL 命令',
      startDebug: '开始调试',
      dialogTitle: 'API 调试',
      importCurl: '导入 cURL',
      method: '请求方法',
      path: 'Path',
      headers: 'Header',
      headerName: 'Header Name',
      headerValue: 'Header Value',
      params: '参数',
      paramName: '参数名',
      paramValue: '参数值',
      body: '请求体',
      bodyPlaceholder: '请输入 JSON 格式的请求体',
      response: '响应',
      send: '发送请求',
      curlDialogTitle: '导入 cURL 命令',
      curlPlaceholder: '在此粘贴 cURL 命令...',
      import: 'Import'
    },
    userInfo: {
      title: '用户信息生成器',
      description: '生成随机的用户身份信息',
      name: '姓名（简体中文）',
      birthday: '出生日期',
      phone: '手机号码',
      idCard: '身份证号',
      bankCard: '银行卡号',
      email: '邮箱',
      generate: '生成新信息',
      copy: '复制全部',
      clear: '清空'
    },
    jsonFormat: {
      title: 'JSON 格式化工具',
      description: '格式化、压缩和编辑 JSON 数据',
      format: '格式化',
      compress: '压缩',
      clear: '清空',
      copy: '复制',
      invalidJson: '无效的 JSON',
      formatSuccess: '格式化成功',
      compressSuccess: '压缩成功'
    },
    jsonCompare: {
      title: 'JSON 对比工具',
      description: '比较两段 JSON 内容的差异',
      startCompare: '开始对比',
      dialogTitle: 'JSON 对比',
      original: '原始 JSON',
      originalPlaceholder: '请输入原始 JSON',
      target: '对比 JSON',
      targetPlaceholder: '请输入要对比的 JSON',
      compare: '对比',
      clear: '清空',
      differences: '对比结果',
      noDifference: '未发现差异',
      invalidJson: '无效的 JSON'
    }
  }
}
