export default {
  header: {
    title: 'Testools',
    github: 'Github'
  },
  common: {
    copySuccess: 'Copied successfully!',
    copyFailed: 'Copy failed. Please copy manually.',
    systemError: 'System error: {error}',
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...'
  },
  categories: {
    daily: {
      name: 'Daily Tools',
      tools: {
        uuid: 'UUID Generator',
        timestamp: 'Timestamp Converter'
      }
    },
    text: {
      name: 'Text Processing',
      tools: {
        blankClear: 'Blank Character Cleaner'
      }
    },
    debug: {
      name: 'Development & Debug',
      tools: {
        apiMock: 'API Debug Tool'
      }
    },
    mock: {
      name: 'Mock Data',
      tools: {
        userInfo: 'User Info Generator'
      }
    },
    json: {
      name: 'JSON Tools',
      tools: {
        jsonFormat: 'JSON Formatter',
        jsonCompare: 'JSON Comparator'
      }
    }
  },
  language: {
    en: 'English',
    zh: '中文'
  },
  cards: {
    uuid: {
      title: 'UUID Generator',
      description: 'Generate random UUID and copy to clipboard automatically',
      version: 'Version',
      generate: 'Generate & Copy',
      copy: 'Copy',
      clear: 'Clear',
      lowercase: 'Lowercase UUID',
      uppercase: 'Uppercase UUID',
      placeholder: 'Click Generate button to create UUID'
    },
    timestamp: {
      title: 'Timestamp Converter',
      description: 'Convert between UTC time and timestamp',
      utcToTimestamp: 'UTC Time to Timestamp',
      timestampToUtc: 'Timestamp to UTC Time',
      utcTime: 'UTC Time',
      timestampMs: 'Timestamp (ms)',
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      convert: 'Convert',
      copy: 'Copy',
      clear: 'Clear',
      currentTime: 'Current Time',
      resetAll: 'Reset to Current Time'
    },
    blankClear: {
      title: 'Blank Character Cleaner',
      description: 'Remove all blank characters from text with one click',
      placeholder: 'Enter text to remove blank characters',
      clean: 'Clean & Copy',
      reset: 'Reset',
      copySuccess: 'Blanks removed and copied to clipboard',
      copyError: 'Failed to copy to clipboard'
    },
    apiMock: {
      title: 'API Debug Tool',
      description: 'Mock API requests with cURL command import support',
      startDebug: 'Start Debug',
      dialogTitle: 'API Debug',
      importCurl: 'Import cURL',
      method: 'Method',
      path: 'Path',
      headers: 'Headers',
      headerName: 'Header Name',
      headerValue: 'Header Value',
      params: 'Parameters',
      paramName: 'Parameter Name',
      paramValue: 'Parameter Value',
      body: 'Body',
      bodyPlaceholder: 'Enter JSON format request body',
      response: 'Response',
      send: 'Send Request',
      curlDialogTitle: 'Import cURL Command',
      curlPlaceholder: 'Paste cURL command here...',
      import: 'Import'
    },
    userInfo: {
      title: 'User Info Generator',
      description: 'Generate random user identity information', 
      name: 'Name (Simplified Chinese)',
      birthday: 'Birthday',
      phone: 'Phone Number',
      idCard: 'ID Card Number',
      bankCard: 'Bank Card Number',
      email: 'Email',
      generate: 'Generate New Info',
      copy: 'Copy All',
      clear: 'Clear'
    },
    jsonFormat: {
      title: 'JSON Formatter',
      description: 'Format, compress and edit JSON data',
      format: 'Format',
      compress: 'Compress',
      clear: 'Clear',
      copy: 'Copy',
      invalidJson: 'Invalid JSON',
      formatSuccess: 'Format successful',
      compressSuccess: 'Compress successful'
    },
    jsonCompare: {
      title: 'JSON Comparator',
      description: 'Compare differences between two JSON contents',
      startCompare: 'Start Compare',
      dialogTitle: 'JSON Compare',
      original: 'Original JSON',
      originalPlaceholder: 'Enter original JSON',
      target: 'Target JSON', 
      targetPlaceholder: 'Enter JSON to compare',
      compare: 'Compare',
      clear: 'Clear',
      differences: 'Compare Results',
      noDifference: 'No differences found',
      invalidJson: 'Invalid JSON'
    }
  }
}
