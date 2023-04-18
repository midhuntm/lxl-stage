import React, { useContext } from 'react';
import configContext from '../../utils/helpers/configHelper';

class ViewSDKClient {
    constructor() {
        const { config } = useContext(configContext);
        this.readyPromise = new Promise((resolve) => {
            if (window.AdobeDC) {
                resolve();
            } else {
                document.addEventListener("pdf-div_sdk.ready", () => {
                    resolve();
                });
            }
        });
        this.adobeDCView = undefined;
        this.clientId = window.location.href.includes('localhost') ?
            config?.lmsAPIKeys?.annotatorLocalClientId :
            config?.lmsAPIKeys?.annotatorClientId
    }
    arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    ready() {
        return this.readyPromise;
    }
    //Use this function when u have a file in local or url endpoints 

    previewFile(divId, viewerConfig, url, pdfFileName) {
        const config = {
            clientId: this.clientId //Enter your Client ID here
        };
        if (divId) {
            config.divId = divId;
        }
        this.adobeDCView = new window.AdobeDC.View(config);
        const previewFilePromise = this.adobeDCView.previewFile(
            {
                content: {
                    location: {
                        url: url
                    }
                },
                metaData: {
                    fileName: pdfFileName,
                    id: "6d07d124-ac85-43b3-a867-36930f502ac6"
                }
            },
            viewerConfig
        );
        return previewFilePromise;
    }
    //Use this function when u have a file data like fetch call api
    previewFileUsingFilePromise(divId, filePromise, fileName) {
        this.adobeDCView = new window.AdobeDC.View({
            clientId: this.clientId,
            divId
        });
        this.adobeDCView.previewFile({
            content: {
                promise: filePromise
            },
            metaData: {
                fileName: fileName
            }
        }, {}
        );
    }
    //It will trigger automatically when u click the save button on the file previewer
    registerSaveApiHandler(getAnnotatedData,) {
        const saveApiHandler = (metaData, content, options) => {
            console.log(metaData, content, options);
            return new Promise((resolve) => {
                var base64PDF = this.arrayBufferToBase64(content);
                // var fileURL = "data:application/pdf;base64," + base64PDF;
                const response = {
                    code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
                    data: {
                        ...metaData,
                        updatedAt: new Date().getTime(),
                        pdfData: base64PDF
                    }
                };
                console.log('after saved response', response)
                getAnnotatedData(response) //sending Annotated base64 data to previewer component
                resolve(response);
            });
        };
        this.adobeDCView.registerCallback(
            window.AdobeDC.View.Enum.CallbackType.SAVE_API,
            saveApiHandler,
            {}
        );
    }
    //Will trigger when any events happens  (basically it will use for analytics )
    registerEventsHandler() {
        this.adobeDCView.registerCallback(
            window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
            (event) => {
                console.log(event);
            },
            {
                enablePDFAnalytics: true
            }
        );
    }

}
export default ViewSDKClient;