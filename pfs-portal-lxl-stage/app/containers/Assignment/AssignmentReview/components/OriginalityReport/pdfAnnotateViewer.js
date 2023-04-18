import React, { useEffect, useCallback, useMemo, useState } from 'react';
import ViewSDKClient from "../../../../ViewSDKClient/ViewSDKClient";
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';


const PDFAnnotateViewer = React.memo(props => {
    const { fileUrl, file, getAnnotatedData } = props

    const loadPDF = () => {
        const viewSDKClient = new ViewSDKClient();
        let fileSplitArr = fileUrl.split('?')[0].split('/')
        let fileName = fileSplitArr[fileSplitArr.length - 1]
        
        const previewFilePromise = viewSDKClient.ready().then(() => {
            viewSDKClient.previewFile(
                "pdf-div", {
                showLeftHandPanel: true,
                showAnnotationTools: true,
                showDownloadPDF: true,
                showPrintPDF: true,
                showPageControls: false,
                enableAnnotationAPIs: true,
                includePDFAnnotations: true
            }, fileUrl, fileName);

            viewSDKClient.registerSaveApiHandler(getAnnotatedData)

            // const eventOptions = {
            //     listenOn: [
            //         "ANNOTATION_ADDED", "ANNOTATION_CLICKED"
            //     ]
            // }
            // previewFilePromise.then((adobeViewer) => {
            //     adobeViewer.getAnnotationManager()
            //         .then(annotationManager => {
            //             annotationManager.getAnnotations()
            //                 .then(result => {
            //                     console.log("GET all annotations", result);
            //                     viewSDKClient.annots = result;
            //                     console.log('viewSDKClient.annots in init');
            //                     console.log(viewSDKClient.annots);
            //                 })
            //                 .catch(e => {
            //                     console.log(e);
            //                 });

            //             annotationManager.registerEventListener(
            //                 function (event) {
            //                     console.log(event.type, event.data)
            //                     if (event.type === 'ANNOTATION_ADDED') {
            //                         viewSDKClient.annots = [...viewSDKClient.annots, event.data];
            //                     } else if (event.type === 'ANNOTATION_UPDATED') {
            //                         viewSDKClient.annots = [...(viewSDKClient.annots.filter(a => a.id !== event.data.id)), event.data]
            //                     } else if (event.type === 'ANNOTATION_DELETED') {
            //                         viewSDKClient.annots = viewSDKClient.annots.filter(a => a.id !== event.data.id);
            //                     }
            //                 },
            //                 eventOptions
            //             );
            //         })
            //         .catch(e => {
            //             console.log(e);
            //         });
            // }).catch(e => {
            //     console.log(e);
            // });
        });
    }

    return (
        <React.Fragment>
            {file &&
                <div
                    id="pdf-div"
                    className="full-window-div"
                    style={{
                        height: '80vh',
                        overflow: 'auto'
                    }}
                    onDocumentLoad={loadPDF()}>
                </div>
            }
        </React.Fragment>
    )
})

export default PDFAnnotateViewer