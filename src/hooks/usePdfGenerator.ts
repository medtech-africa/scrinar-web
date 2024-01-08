import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { MutableRefObject } from 'react'

const usePdfGenerator = () => {
  const generatePdf = (
    htmlRef: MutableRefObject<HTMLElement>,
    fileName = 'document.pdf'
  ) => {
    const content = htmlRef?.current

    // Save the current height and scroll position
    const originalHeight = content.style.height
    const originalScrollTop = content.scrollTop
    const originalWidth = content.style.width

    // Set height to auto before capturing
    content.style.height = 'auto'
    content.style.width = '900px'
    html2canvas(content, {
      scale: 1.5,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.8)
      const pdf = new jsPDF('l', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(
        imgData,
        'JPEG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      )
      pdf.save(fileName)

      // Restore the original height and scroll position
      content.style.height = originalHeight
      content.scrollTop = originalScrollTop
      content.style.width = originalWidth
    })
  }

  return generatePdf
}

export default usePdfGenerator
