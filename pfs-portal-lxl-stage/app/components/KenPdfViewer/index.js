// import React from 'react';
// // Core viewer
// import { Viewer } from '@react-pdf-viewer/core';
// import { Worker } from '@react-pdf-viewer/core';

// // Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
// import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';

// // Import styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

// const KenPdfViewer = ({ pdfFileUrl }) => {
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//   const pageNavigationPluginInstance = pageNavigationPlugin();
//   const scrollModePluginInstance = scrollModePlugin();

//   return (
//     <div style={{ height: '500px' }}>
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//         <Viewer
//           fileUrl={pdfFileUrl}
//           plugins={[
//             defaultLayoutPluginInstance,
//             pageNavigationPluginInstance,
//             scrollModePluginInstance,
//           ]}
//         />
//       </Worker>
//     </div>
//   );
// };

// export default KenPdfViewer;
