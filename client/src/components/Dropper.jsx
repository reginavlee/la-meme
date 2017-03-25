const React = require('react')
const Dropzone = require('react-dropzone')
const upload = require('superagent')

 class Dropper extends React.Component{
    onDrop (files) {
      upload.post('http://localhost:3000/upload')
      .attach('theseNamesMustMatch', files[0])
      .end((err, res) => {
        if (err) console.log(err);
        alert('File uploaded!');
      })
    }

    render(){
      return (
          <div>
            <Dropzone onDrop={this.onDrop} multiple='true'>
              <div>Try dropping a file here, or click to select a file to upload.</div>
            </Dropzone>
          </div>
      );
    }
};

export default Dropper;
