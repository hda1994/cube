import * as THREE from 'three';

const createCube = (resp, mount, inputs) => {
    while ( mount.current.firstChild) {
        mount.current.removeChild(mount.current.firstChild);
    }
    let cubeArray = JSON.parse(resp);

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
        75,
        mount.current.clientWidth / (window.innerHeight - inputs.current.clientHeight),
        0.1,
        1000
    );
    camera.position.z = 5;

    let renderer = new THREE.WebGLRenderer({
        alpha: true
    });

    renderer.setSize(mount.current.clientWidth, window.innerHeight - inputs.current.clientHeight);

    // MOUNT INSIDE OF REACT
    mount.current.appendChild(renderer.domElement); // mount a scene inside of React using a ref

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


    //RESIZE
    let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
    let windowHeight = window.innerHeight;

    window.addEventListener( 'resize', (event) => {
        camera.aspect = mount.current.clientWidth / (window.innerHeight - inputs.current.clientHeight);

        // adjust the FOV
        camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( (window.innerHeight - inputs.current.clientHeight) / windowHeight ) );

        camera.updateProjectionMatrix();
        camera.lookAt( scene.position );

        renderer.setSize( mount.current.clientWidth, window.innerHeight - inputs.current.clientHeight );
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
};

const createError = (mount) => {
    while ( mount.current.firstChild) {
        mount.current.removeChild(mount.current.firstChild);
    }
    let elem = document.createElement("div");
    elem.innerHTML = "Load error!";
    mount.current.appendChild(elem); // mount a scene inside of React using a ref
};

export {createCube, createError};

