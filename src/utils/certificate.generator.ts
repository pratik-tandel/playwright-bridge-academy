import type { ICertificateDefinition, IUserProgress } from '../types';

export async function downloadCertificateAsPng(
  certDef: ICertificateDefinition,
  progress: IUserProgress,
  userName: string = 'QA Engineer',
): Promise<void> {
  const { default: html2canvas } = await import('html2canvas');
  const el = document.getElementById('certificate-canvas');
  if (!el) return;

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = `${certDef.id}-certificate-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function downloadCertificateAsPdf(
  certDef: ICertificateDefinition,
  progress: IUserProgress,
  userName: string = 'QA Engineer',
): Promise<void> {
  const { default: html2canvas } = await import('html2canvas');
  const { jsPDF } = await import('jspdf');

  const el = document.getElementById('certificate-canvas');
  if (!el) return;

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [842, 595] });

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${certDef.id}-certificate-${Date.now()}.pdf`);
}

export function buildCertificateHtml(
  certDef: ICertificateDefinition,
  userName: string,
  earnedAt: string,
): string {
  const date = new Date(earnedAt).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return `
    <div style="width:842px;height:595px;background:${certDef.gradient};display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Georgia,serif;color:#fff;padding:60px;box-sizing:border-box;">
      <div style="font-size:48px;margin-bottom:16px">${certDef.icon}</div>
      <div style="font-size:14px;letter-spacing:4px;text-transform:uppercase;opacity:0.8;margin-bottom:8px">Playwright Bridge Academy</div>
      <div style="font-size:32px;font-weight:bold;margin-bottom:8px">${certDef.title}</div>
      <div style="font-size:16px;opacity:0.9;margin-bottom:32px">${certDef.subtitle}</div>
      <div style="width:120px;height:2px;background:rgba(255,255,255,0.5);margin-bottom:32px"></div>
      <div style="font-size:14px;opacity:0.8;margin-bottom:8px">This certifies that</div>
      <div style="font-size:28px;font-weight:bold;margin-bottom:24px">${userName}</div>
      <div style="font-size:13px;opacity:0.8;text-align:center;max-width:500px;line-height:1.6">${certDef.description}</div>
      <div style="margin-top:32px;font-size:12px;opacity:0.7">Awarded on ${date}</div>
    </div>
  `;
}
