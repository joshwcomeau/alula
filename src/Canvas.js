import React, { PureComponent } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const textureLoader = new THREE.TextureLoader();

const vertexShader = `
  varying vec2 vUv;

  void main() {
      vUv = uv;
      gl_Position = vec4(uv * 2. - vec2(1, 1), 0., 1.);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D texture1;
  void main() {
      gl_FragColor = texture2D(texture1, vUv.xy);
  }
`;


const CanvasElem = styled.canvas`
  position: relative;
  width: 100%;
  height: 100%;
  background: #CCC;
`;

class Canvas extends PureComponent {
  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  componentDidMount() {
    // TODO: resize handlers for width/height
    const {width, height} = this.state;

    this.canvas.width = width;
    this.canvas.height = height;

    const rendererParams = {
      canvas: this.canvas,
      // antialias: false, // TODO: experiment with this
    };
    const cameraParams = [
      -width / 2,
      width / 2,
      -height / 2,
      height / 2,
    ];

    this.renderer = new THREE.WebGLRenderer(rendererParams);
    // this.renderer.setClearColor(0xFFFFFF, 1.0)
    this.renderer.setSize(width, height);

    this.camera = new THREE.OrthographicCamera(...cameraParams);
    this.camera.position.set(0, 0, 200);

    this.scene = new THREE.Scene();
    this.scene.add(this.camera);

    // Our initial texture will be the specified default image.
    const imageSrc = this.props.defaultImageSrc;
    console.log({imageSrc});

    textureLoader.load(imageSrc, texture => {
      this.texture = texture;

      console.log(this.texture);

      // Simulate background-size: cover.
      // By default it will stretch the image to exactly cover the canvas.
      // We don't want that; instead we want it to crop the image, so that
      // it covers the canvas without being warped.
      const canvas = {width, height};
      const {image} = texture;

      // First, deal with the scaling issue. We want to start by shrinking
      // the shortest-difference dimension so that the image exactly fits
      // in 1 dimension (if the image is narrower than the window, use
      // width. If the image is wider, use height)
      const windowAspectRatio = canvas.width / canvas.height;
      const imageAspectRatio = image.width / image.height;
      const scaleDimension = windowAspectRatio > imageAspectRatio
        ? 'width'
        : 'height';

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 4, 4 );
      // this.texture.repeat.set(image.width / canvas.width, image.width / image.height);


      // TODO: Do I need this?
      // this.texture.magFilter=THREE.NearestFilter;
      // this.texture.minFilter=THREE.NearestFilter;
      // this.material = new THREE.MeshBasicMaterial();
      this.material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          texture1: {
            type: "t",
            value: this.texture
          }
        }
      });

      this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1), this.material);

      this.scene.add(this.mesh);

      this.animate();


    }, xhr => {
      // console.log('progress!', xhr)
    }, xhr => {
      // console.error('error', xhr)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.updateImageTexture(nextProps.image);
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.renderer.render(this.scene, this.camera);
  }

  updateImageTexture(image) {
    // const {image} = this.props;
    //
    const newTexture = new THREE.Texture(image);

    this.mesh.material.map = newTexture;
    this.mesh.material.needsUpdate = true;


    // this.geometry = new THREE.PlaneGeometry(800,600,1,1);
    // this.material = new THREE.MeshBasicMaterial({ map: this.texture });
    //
    // const mesh = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(mesh);
    //
    // this.renderer.render(this.scene, this.camera);
    //

    //
    // // TODO: Is the default LinearFilter better than NearestFilter?
    // this.texture.magFilter=THREE.NearestFilter;
    // this.texture.minFilter=THREE.NearestFilter;
    //
    // this.geometry=new THREE.PlaneGeometry(800,600,1,1);
    // this.material=new THREE.ShaderMaterial({
    //   //side:THREE.DoubleSide,
    //   //wireframe:true,
    //   //wireframeLinewidth:10,
    //   uniforms:{
    //     map: {type: "t", value: this.texture},
    //     amount: {type: "f", value: 0.0},
    //   },
    //   vertexShader:[
    //     "varying vec2 vUV;",
    //     "void main(){",
    //     "vUV=uv;",
    //     "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    //     "}"
    //   ].join("\n"),
    //   fragmentShader:[
    //     "varying vec2 vUV;",
    //     "uniform sampler2D map;",
    //     "uniform float amount;",
    //     "void main(void) {",
    //       "highp vec4 texColor = texture2D( map, vUV );",
    //       //"float gray=dot(texColor.rgb,vec3(0.3,0.6,0.1));",
    //       //"vec3 grayColor=vec3(gray,gray,gray);",
    //       // "gl_FragColor=vec4(mix(texColor.rgb,vec3(gray,gray,gray),amount),1.0);",
    //       "float red=dot(texColor.rgb,vec3(-0.607,0.769,0.189))*amount+texColor.r;",
    //       "float green=dot(texColor.rgb,vec3(0.349,-0.314,0.168))*amount+texColor.g;",
    //       "float blue=dot(texColor.rgb,vec3(0.272,0.534,-0.869))*amount+texColor.b;",
    //       "gl_FragColor=vec4(clamp(vec3(red,green,blue),0.0,1.0),1.0);",
    //     "}"
    //   ].join("\n")
    // });
    //
    // const mesh = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(mesh);
    //
    // this.renderer.render(this.scene, this.camera);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      this.updateImageTexture();
    }
  }

  render() {
    return (
      <CanvasElem innerRef={elem => this.canvas = elem}>

      </CanvasElem>
    );
  }
}

export default Canvas;
