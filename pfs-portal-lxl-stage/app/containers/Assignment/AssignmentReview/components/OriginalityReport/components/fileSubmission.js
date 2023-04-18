import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function FileSubmission(props) {
  const { url } = props
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js">
      <Viewer
        fileUrl={url}
        plugins={[defaultLayoutPluginInstance]}
        renderError={console.log}
      />
    </Worker>
  )
}
