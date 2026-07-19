import QRCode from 'qrcode.react'

export const generateQRCode = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const qrElement = document.createElement('canvas')
      const canvas = QRCode.toCanvas(qrElement, data, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
        margin: 10,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }, (error) => {
        if (error) reject(error)
        else resolve(qrElement.toDataURL())
      })
    } catch (error) {
      reject(error)
    }
  })
}

export const getProgressiveQRCode = (data, revealPercentage) => {
  // This function will progressively reveal QR code
  // revealPercentage: 0-100
  const pixelSize = Math.ceil(300 * (100 - revealPercentage) / 100 / 10)
  return {
    data,
    pixelSize,
    isFullyRevealed: revealPercentage === 100,
  }
}

export default { generateQRCode, getProgressiveQRCode }
