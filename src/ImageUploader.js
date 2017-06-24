import React, {PureComponent} from 'react';


class ImageUploader extends PureComponent {
  componentDidMount() {
    this.image = document.createElement('img');

    this.image.onload = () => {
      this.props.handleImageChange(this.image)
    }
  }

  handleUpload = (ev, ...args) => {
    const [selectedFile] = ev.target.files;

    const reader = new FileReader();
    reader.onload = ev => {
      this.image.src = ev.target.result
    };

    reader.readAsDataURL(selectedFile);

    //
    // userImage = $("#userImage")[0];
    // if (userImage.files && userImage.files[0]) {
    //     var reader = new FileReader();
    //
    //     reader.onload = function (e) {
    //         image.src = e.target.result;
    //     };
    //
    //     reader.readAsDataURL(userImage.files[0]);
    // }
    //
    // camera = new THREE.OrthographicCamera();
    // renderer = new THREE.WebGLRenderer({
    //     antialias: false
    // });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // shader = new THREE.ShaderMaterial({
    //     vertexShader: document.getElementById('vertexShader').textContent,
    //     fragmentShader: document.getElementById('fragmentShader').textContent,
    //     uniforms: {
    //         texture1: {
    //             type: "t",
    //             value: texture
    //         }
    //     }
    // });
    // scene = new THREE.Scene();
    // scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1), shader));
    //
    // $('#container').append(renderer.domElement);
    // animate();
    //
    // function animate() {
    //     requestAnimationFrame(animate);
    //
    //     renderer.render(scene, camera);
    // }
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleUpload} />
      </div>
    )
  }
}

export default ImageUploader;
