import type { RefObject } from 'react';
import html2canvas from 'html2canvas-pro';

export const useCapture = (elementRef: RefObject<HTMLElement>) => {
  const captureAndDownload = async (
    fileName: string = `screenshot-${Date.now()}.png`
  ) => {
    if (!elementRef.current) return;

    try {
      // 캡처
      const canvas = await html2canvas(elementRef.current, {
        // html2canvas-pro의 고급 옵션
        scale: 2, // 2배 해상도
        backgroundColor: '#FFFFFF',
        useCORS: true,
        logging: true,
        allowTaint: true,
        ignoreElements: (element: HTMLElement) => {
          // 특정 요소를 캡처에서 제외
          return element.classList.contains('ignore-capture');
        },
        onclone: (clonedDoc: Document) => {
          // 모든 요소의 oklch 색상 변환
          const elements = clonedDoc.querySelectorAll('*');
          elements.forEach((el) => {
            if (el instanceof HTMLElement) {
              const style = window.getComputedStyle(el);
              if (style.color.includes('oklch')) {
                el.style.color = '#000000';
              }
              if (style.backgroundColor.includes('oklch')) {
                el.style.backgroundColor = '#FFFFFF';
              }
            }
          });
        },
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);

      // 다운로드
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      link.click();

      return true;
    } catch (error) {
      console.error('이미지 저장 중 오류 발생:', error);
      return false;
    }
  };

  return { captureAndDownload };
};
