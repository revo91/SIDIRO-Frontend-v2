import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export const exportPDF = () => {
  // html2canvas(document.body, {
  //   scrollX: 0,
  //   scrollY: 0
  // }).then(function (canvas) {
  //   var imgData = canvas.toDataURL(
  //     'image/jpeg', 50);
  //   var doc = new jsPDF({
  //     orientation: canvas.width > canvas.height ? "landscape" : "portrait",
  //     unit: "px",
  //     format: [canvas.width, canvas.height]
  //   });
  //   doc.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
  //   doc.save('sidiro-export.pdf');
  // });
  window.print()
}