import React, { useEffect, useState } from "react";
import {getCubeArray, postCubeParams} from "../api/api";
import {Container} from "@material-ui/core";
import {Form} from "../form/form";
import {createCube, createError} from "../cube/cube";

export function Workspace() {
    const [length, setLength] = useState(1);
    const [height, setHeight] = useState(1);
    const [width, setWidth] = useState(1);
    let mount = React.createRef();
    let inputs = React.createRef();

    const handleClick = (e) => {
        e.preventDefault();
        const params = { length: length, height: height, width: width};
        postCubeParams(JSON.stringify(params)).then((resp) => {
                createCube(resp, mount, inputs);
            },
            () => {
                createError(mount);
                console.log('Load error POST');
            });
    };

    const handleLoad = () => {
        getCubeArray().then((resp) => {
                createCube(resp, mount, inputs);
            },
            () => {
                createError(mount);
                console.log('Load error GET');
            });
    };

    useEffect(handleLoad, [1]);

    return (
        <Container maxWidth='lg'>
            <div ref={inputs}>
                <Form setParams={{setLength, setHeight, setWidth, handleClick}}/>
            </div>
            <div ref={mount} />
        </Container>
    )
}