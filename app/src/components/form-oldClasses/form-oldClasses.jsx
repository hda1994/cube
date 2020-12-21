import React, { Component } from "react";
import * as THREE from 'three';
import {getCubeArray, postCubeParams} from "../AJAX/AJAX";
import {Container, TextField, Button, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default class FormOldClasses extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.drawCube = this.drawCube.bind(this);

        this.mainSpace = {};
    }

    handleClick(e) {
        e.preventDefault();
        const params = { length: this.inputLength.value, height: this.inputHeight.value, width: this.inputWidth.value};
        console.log(this.inputHeight);
        postCubeParams(JSON.stringify(params)).then((resp) => {
                this.mount.removeChild(this.mainSpace);
                let cubeArray = JSON.parse(resp);
                this.drawCube(cubeArray);
            },
            () => {
                console.log('Load error POST');
        });
    }

    componentDidMount() {
        // this.createSpace();
        console.log(this.mount);
        getCubeArray().then((resp) => {
                let cubeArray = JSON.parse(resp);
                this.drawCube(cubeArray);
            },
            () => {
                console.log('Load error GET');
            });
    }

    drawCube(cubeArray) {
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(
            75,
            // window.innerWidth / window.innerHeight,
            this.mount.clientWidth / (window.innerHeight - this.inputs.clientHeight),
            0.1,
            1000
        );
        camera.position.z = 5;


        let renderer = new THREE.WebGLRenderer({
            alpha: true
        });

        renderer.setSize(this.mount.clientWidth, window.innerHeight - this.inputs.clientHeight);
        // renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);

        // MOUNT INSIDE OF REACT
        this.mainSpace = this.mount.appendChild(renderer.domElement); // mount a scene inside of React using a ref


        // CAMERA CONTROLS
        // https://threejs.org/docs/index.html#examples/controls/OrbitControls
        // this.controls = new THREE.OrbitControls(camera);



        let geometry = new THREE.BufferGeometry();
        let vertices = new Float32Array( cubeArray );

        geometry.clearGroups();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

        // let geometry = new THREE.BoxGeometry(2, 2, 2);
        let material = new THREE.MeshPhongMaterial( {
            color: 0x980111,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );

        let cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        let lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        scene.add( lights[ 0 ] );
        scene.add( lights[ 1 ] );
        scene.add( lights[ 2 ] );



        // SCALE ON RESIZE

        // Check "How can scene scale be preserved on resize?" section of Three.js FAQ
        // https://threejs.org/docs/index.html#manual/en/introduction/FAQ

        // code below is taken from Three.js fiddle
        // http://jsfiddle.net/Q4Jpu/

        // remember these initial values



        let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
        let windowHeight = window.innerHeight;

        window.addEventListener( 'resize', (event) => {
            // camera.aspect = window.innerWidth / window.innerHeight;
            camera.aspect = this.mount.clientWidth / (window.innerHeight - this.inputs.clientHeight);

            // adjust the FOV
            // camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
            camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( (window.innerHeight - this.inputs.clientHeight) / windowHeight ) );

            camera.updateProjectionMatrix();
            camera.lookAt( scene.position );

            // renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setSize( this.mount.clientWidth, window.innerHeight - this.inputs.clientHeight );
            renderer.render( scene, camera );

        }, false);

        // ANIMATE THE SCENE
        let animate = () => {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            // cube.rotation.z += 0.01;

            renderer.render(scene, camera);
        };
        animate();
    }


    render() {

        return (
            <Container maxWidth='sm'>
                <div ref={ref => (this.inputs = ref)}>
                    <form >
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                        >
                        <TextField
                            id="outlined-number"
                            label="Height"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ref={ref => this.inputHeight = ref}
                        />
                        <TextField
                            id="outlined-number"
                            label="Width"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ref={ref => this.inputWidth = ref}
                        />
                        <TextField
                            id="outlined-number"
                            label="Length"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            ref={ref => this.inputLength = ref}
                        />
                        <Button variant="contained" color="primary" onClick={this.handleClick}>
                            Draw
                        </Button>
                        </Grid>
                    </form>
                </div>
                <div ref={ref => (this.mount = ref)} />
            </Container>

    )}
}
