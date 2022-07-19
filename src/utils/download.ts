const download0 = (response: any, fileName: string, mineType: string) => {
  const { headers } = response
  const data = response.data
  // 创建 blob
  const blob = new Blob([data], { type: mineType })

  const header = headers['content-disposition']
  if (header && header.split(';') > 1 && header.split(';')[1].split('filename=') > 1) {
    fileName = decodeURIComponent(header.split(';')[1].split('filename=')[1])
  }

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, fileName)
  } else if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else { // IE10+下载
    window.open(URL.createObjectURL(blob))
  }
}

const download = {
  // 下载 Excel 方法
  excel: (data: any, fileName: string) => {
    download0(data, fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  },
  // 下载 Word 方法
  word: (data: any, fileName: string) => {
    download0(data, fileName, 'application/msword')
  },
  // 下载 Zip 方法
  zip: (data: any, fileName: string) => {
    download0(data, fileName, 'application/zip')
  },
  // 下载 Html 方法
  html: (data: any, fileName: string) => {
    download0(data, fileName, 'text/html')
  },
  // 下载 Markdown 方法
  markdown: (data: any, fileName: string) => {
    download0(data, fileName, 'text/markdown')
  }
}

export default download
