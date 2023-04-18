import {
  Box,
  Button,
  Card,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import KenButton from '../../../../../../global_components/KenButton';
import KenChip from '../../../../../../global_components/KenChip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import Routes from '../../../../../../utils/routes.json';
import { Link, useHistory } from 'react-router-dom';
// import PreviewJson from '../PresentationPreview/preview.json';
import {
  getResource,
  getURLResource,
} from '../../../../../../utils/ApiService';
import { getUserDetails } from '../../../../../../utils/helpers/storageHelper';
import ReactPlayer from 'react-player';
import parse from 'html-react-parser';
// import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  presentationFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '120%',
    cursor: 'pointer',
    color: '#00218D',
  },
  HoverLink: {
    textDecoration: 'none',
    '&:hover': {
      color: ' #2862FF',
    },
  },
  sectionShape: {
    background: '#FDEECF',
    borderRadius: '21px',
    height: '30px',
    margin: '8px',
  },
  subjectShape: {
    background: '#D6EFFF',
    borderRadius: '21px',
    height: '30px',
  },
  discriptionFont: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '150%',
  },
  discription: {
    fontFamily: "'Open Sans'",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '150%',
    paddingLeft: '5px'
  },
  title: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#2862FF',
    textTransform: 'capitalize',
    paddingLeft: '8px',
  },
  resourceIcons: {
    width: '41px',
    height: '41px',
  },
}));
export default function PresentationPreview(props) {
  const { sectionDataSend } = props?.history?.location?.state;
  const classes = useStyles();
  const history = useHistory();
  const userDetails = getUserDetails();
  const [resourceId, setResourceId] = React.useState(
    props?.history?.location?.state?.resourceId
  );
  const [fileType, setFileType] = React.useState(
    props?.history?.location?.state?.allowedFilesTypes
  );
  const [previewURL, setPreviewURL] = React.useState('');
  const [previewType, setPreviewType] = React.useState(
    props?.history?.location?.state?.previewType || 'ppt'
  );
  const [PreviewJson, setPreviewJson] = React.useState([]);
  const [URLData, setURLData] = React.useState({});
  const [token, setToken] = React.useState(localStorage.getItem('fileToken'));
  const [excelDownloadUrl, setExcelDownloadUrl] = React.useState('');
  const [docs, setDocs] = React.useState([]);

  const getFileSize = bytes => {
    if (bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
      if (i === 0) return `${bytes} ${sizes[i]})`;
      return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
    }
  };

  const getDecodedTitle = title => {
    const parseResult = new DOMParser().parseFromString(title, 'text/html');
    return parseResult?.documentElement?.textContent || '';
  };

  //get respurce api
  useEffect(() => {
    //Other Resources
    if (previewType !== 'url') {
      console.log(sectionDataSend);
      const payload = {
        method: 'post',
        cmid: resourceId,
      };
      getResource(payload)
        .then(res => {
          let url = String(res[0]?.contents[0]?.fileurl).split('?');
          let prevUrl = '';
          let downloadUrl = res[0]?.contents[0]?.fileurl + `&token=${token}`;
          let docs = [];
          if (previewType == 'ppt' || previewType == 'word') {
            prevUrl =
              // `https://view.officeapps.live.com/op/embed.aspx?src=` +
              `https://docs.google.com/gview?url=` +
              url[0] +
              `?token=${token}&embedded=true`;
            // url[0] + `?token=${token}`
            console.log(prevUrl);
            let urlLink = { uri: url[0] + `?token=${token}` };
            docs.push(urlLink);
            setDocs(docs);
            setPreviewURL(prevUrl);
          } else if (previewType == 'excel') {
            prevUrl =
              `https://view.officeapps.live.com/op/embed.aspx?src=` +
              url[0] +
              `?token=${token}`;
            console.log(prevUrl);
            setPreviewURL(prevUrl);
          } else if (previewType == 'pdf') {
            prevUrl = url[0] + `?token=${token}#toolbar=0`;
            console.log(prevUrl);
            setPreviewURL(prevUrl);
          } else {
            prevUrl = res[0]?.contents[0]?.fileurl + `&token=${token}`;
            console.log(prevUrl);
            setPreviewURL(prevUrl);
          }
          let item = {
            title: getDecodedTitle(res[0]?.name),
            fileURL: res[0]?.contents[0]?.fileurl,
            fileSize: getFileSize(Number(res[0]?.contents[0]?.filesize)),
            section: `${sectionDataSend.accountname +
              '-' +
              sectionDataSend.Section}`,
            subject: `${sectionDataSend.hed__Course__cName}`,
            resourceDescription: res[0]?.description,
            fileName: res[0]?.contents[0]?.filename,
          };
          let data = [];
          data.push(item);
          setPreviewJson(data);
          setPreviewURL(prevUrl);
          setExcelDownloadUrl(downloadUrl);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(sectionDataSend);
      const payload = {
        method: 'post',
        cmid: resourceId,
      };

      getURLResource(payload)
        .then(res => {
          console.log('res');
          if (res) {
            setURLData(res);
            let item = {
              urlType: true,
              title: res?.name,
              externalURL: res?.externalurl,
              section: `${sectionDataSend.accountname +
                '-' +
                sectionDataSend.section}`,
              subject: `${sectionDataSend.hed__Course__cName}`,
              resourceDescription: parse(`${res?.intro}`),
            };
            setPreviewJson([{ ...item }]);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }

    //else get_url api
  }, []);

  const handleEditing = () => {
    let fileTypes = '';
    let resourceType = '';

    if (previewType == 'ppt') {
      fileTypes = '.ppt,.pptx';
      resourceType = 'Presentation';
    }
    if (previewType == 'word') {
      fileTypes = '.doc,.docx';
      resourceType = 'Document';
    }
    if (previewType == 'excel') {
      fileTypes = '.xlsx,.xls';
      resourceType = 'Excel';
    }
    if (previewType == 'pdf') {
      fileTypes = '.pdf';
      resourceType = 'PDF';
    }
    if (previewType == 'mp4') {
      fileTypes = '.mp4';
      resourceType = 'Video';
    }
    if (previewType == 'url') {
      fileTypes = null;
      resourceType = 'URL';
    }
    props.history.push({
      pathname: Routes.addResource,
      state: {
        resourceId: resourceId,
        resourceType: resourceType,
        allowedFilesTypes: fileTypes,
        mode: 'edit',
      },
    });
  };

  const getResourceIcon = () => {
    if (previewType) {
      let icon = '';
      switch (previewType) {
        case 'ppt':
          icon = <img src={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/pptPngLogo.png`} alt="" />;

          break;
        case 'mp4':
          icon = <img src={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/videoPngLogo.png`} alt="" />;

          break;
        case 'pdf':
          icon = <img src={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/pdfPngLogo.png'} alt="" />;

          break;
        case 'excel':
          icon = (
            <img src={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/excelIcon.svg`} alt="" style={{ width: 40, height: 40 }} />
          );

          break;
        case 'word':
          icon = (
            <img src={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/lms-wordFile-icon.png'} alt="" style={{ width: 40, height: 40 }} />
          );

          break;
        case 'url':
          icon = (
            <img src={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/lms-links-icon.svg'} alt="" className={classes.resourceIcons} />
          );

          break;

        default:
          icon = '';
          break;
      }

      return icon;
    }
  };
  return (
    <>
      <Paper elevation={0} style={{ padding: '16px' }}>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          container
          spacing={2}
          alignItems="center"
        >
          <Grid item md={3} sm={4} xs={12}>
            <Typography
              className={classes.presentationFont}
              onClick={() => history.goBack()}
            >
              {<KeyboardBackspaceOutlinedIcon />}&nbsp;{' '}
              {userDetails.Type === 'Faculty' ? 'Preview' : 'View'}
            </Typography>
          </Grid>
          <Grid item md={7} sm={5} xs={12}>
            <></>
          </Grid>
          {userDetails.Type === 'Faculty' && (
            <Grid item md={2} sm={3} xs={12}>
              <KenButton
                variant="contained"
                color="primary"
                onClick={handleEditing}
                startIcon={<EditOutlinedIcon />}
              >
                Start Editing
              </KenButton>
            </Grid>
          )}
        </Grid>
      </Paper>

      <Paper elevation={0} style={{ padding: '16px', marginTop: '16px' }}>
        <Grid container spacing={1} >
          <Grid item xs={12} md={12} container alignItems='center'>
            {PreviewJson.map(e => {
              return (
                <>
                  <Grid item xs={12} md={12} style={{ marginBottom: '16px' }}>
                    <Typography>
                      <span>
                        {/* {previewType == 'ppt' && <img src={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/pptPngLogo.png`} alt="" />}
                      {previewType == 'mp4' && (
                        <img src={`https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/videoPngLogo.png`} alt="" />
                      )}
                      {previewType == 'pdf' && <img src={'https://inazstgpfs3001.blob.core.windows.net/assets/Icons/LMS/pdfPngLogo.png'} alt="" />} */}
                        {getResourceIcon()}
                        {e.externalURL ? (
                          <a
                            href={e.externalURL}
                            className={classes.title}
                            target="_blank"
                          >
                            {e.title}
                          </a>
                        ) : (
                          <Typography className={classes.title} component="span">
                            {e.title}
                          </Typography>
                        )}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid
                    item

                  >
                    <KenChip
                      // className={classes.chipHeadings}
                      label={e.section}
                      style={{
                        backgroundColor: '#FDEECF',
                        maxWidth: '100%',
                      }}
                    />

                  </Grid>
                  <Grid item >
                    <KenChip
                      // className={classes.chipHeadings}
                      label={e.subject}
                      style={{
                        backgroundColor: '#D6EFFF',
                        maxWidth: '100%',
                      }}
                    />
                  </Grid>

                  {e?.externalURL && (
                    <Grid item style={{ marginTop: '16px' }}>
                      <Box style={{ display: 'flex' }}>
                        <Typography className={classes.discriptionFont}>
                          {`URL:  `}
                        </Typography>
                        <Typography className={classes.discription}>
                          <a href={e.externalURL} target="_blank">{e.externalURL} </a>
                        </Typography>
                      </Box>
                    </Grid>
                  )}

                  {e?.fileName && (
                    <Grid item >
                      <KenChip
                        // className={classes.chipHeadings}
                        label={` File Name: ${e?.fileName}`}
                        style={{
                          backgroundColor: '#ffeae4',
                          maxWidth: '100%',
                        }}
                      />
                      {/* <Box style={{display:'flex'}}>
                    <Typography className={classes.discriptionFont}>
                     
                    File Name:
                    </Typography>
                    <Typography className={classes.discription}>
                      <a href={e.externalURL}>{e?.fileName}</a>
                    </Typography>
                    </Box> */}
                    </Grid>
                  )}
                  {/* {previewType == "excel" && (
                  <Grid md={12} sm={12} xs={12} style={{ marginTop: '16px' }}>
                    <Typography className={classes.discription}>
                      <a href={excelDownloadUrl} target="_blank">
                        Click to download file
                      </a>
                    </Typography>
                  </Grid>
                )} */}
                  <Grid item style={{ marginTop: '16px' }} xs={12} md={12}>
                    <Box style={{ display: 'flex' }}>
                      <Typography className={classes.discriptionFont}>{`Detail Description :  `} </Typography>
                      <Typography className={classes.discription}>
                        {e?.urlType ? e.resourceDescription : getDecodedTitle(e.resourceDescription)}
                      </Typography>
                    </Box>
                  </Grid>
                  {/* <Grid md={12} sm={12} xs={12} style={{ marginTop: '16px' }}>
                  <Typography className={classes.discriptionFont}>Other Details :</Typography>
                  <br />
                  <Typography className={classes.discription}>Availability :{' '}<span style={{ color: 'green' }}>{e.availability}</span></Typography>
                  <Typography className={classes.discription}>Restrictions :{' '}<span style={{ color: 'green' }}>{e.restrictions}</span></Typography>
                </Grid> */}
                </>
              );
            })}
          </Grid>
          <Grid item xs={12} md={12}>
            {previewType == 'mp4' ? (
              <ReactPlayer
                controls={true}
                config={{
                  file: { attributes: { controlsList: 'nodownload' } },
                }}
                className="react-player"
                url={previewURL}
                width="100%"
                // height="100vh"
                style={{ width: '100%', height: '100vh' }}
              />
            ) : (
              <>
                {previewType == 'ppt' ? (
                  // <iframe
                  //   src={previewURL}
                  //   width="100%"
                  //   style={{ width: '100%', height: '100vh' }}
                  //   frameBorder="0"
                  //   sandbox="allow-scripts allow-same-origin"
                  // />
                  <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <iframe src={previewURL} style={{ width: '100%', height: '100vh' }} frameBorder="0" scrolling="no" seamless="" allowFullScreen="allowFullScreen" sandbox="allow-scripts allow-same-origin"></iframe>
                    <div style={{ width: "80px", height: "80px", position: "absolute", opacity: 0, right: "0px", top: "0px" }} />
                  </div>
                ) : (
                  <>
                    <iframe
                      src={previewURL}
                      width="100%"
                      style={{ width: '100%', height: '100vh' }}
                      frameBorder="0"
                    />
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>

      </Paper>
    </>
  );
}