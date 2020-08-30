/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */
import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import {Spin, Button, Typography} from 'antd';
import {Document, Page, pdfjs} from 'react-pdf';
import Navigator from './elements';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PreviewPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
    };
  }

  nextPage = () =>
    this.setState(({pageNumber}) => ({pageNumber: pageNumber + 1}));

  prevPage = () =>
    this.setState(({pageNumber}) => ({pageNumber: pageNumber - 1}));

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  };

  render() {
    const {pageNumber, numPages} = this.state;
    const {src} = this.props;
    return (
      <Fragment>
        <Document
          className="pdf"
          loading={<Spin />}
          file={src}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page loading={<Spin />} pageNumber={pageNumber} />
        </Document>
        <Navigator>
          <Button
            onClick={this.prevPage}
            disabled={pageNumber === 1}
            color="secondary"
            size="small"
          >
            {'< Anterior'}
          </Button>
          <Typography textAlign="center" variant="muted">
            Page {pageNumber} of {numPages}
          </Typography>
          <Button
            onClick={this.nextPage}
            disabled={pageNumber === numPages}
            color="secondary"
            size="small"
          >
            {'Siguiente >'}
          </Button>
        </Navigator>
      </Fragment>
    );
  }
}

PreviewPDF.propTypes = {
  src: PropTypes.string.isRequired,
};

export default PreviewPDF;
