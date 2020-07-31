
//Import gltf-ts library es module
import { GLTF, GLTFAllow2_0, GLTFParseResult } from "../../gltf.js";

//Import three for the sake of demo
import { Scene } from "./libs/three/Three.js";

//Import the demo adapter that parses gltf response to three.Scene
import { GLTFThreeAdapter } from "./gltf-three-adapter.js";

import Component from "./component.js";
import Renderer from "./renderer.js";
import { get, on } from "./aliases.js";

let container = new Component().useNative(get("container"));
let renderer = new Renderer().mount(container).id("renderer") as Renderer;

//Async function so we can use "await" feature
async function init() {

  //File path
  let gltfFile = "./demo.gltf";


  //Fetch it
  let gltfResponse: Response = await fetch(gltfFile);


  //Get array buffer
  let gltfBuffer: ArrayBuffer = await gltfResponse.arrayBuffer();


  //Pass to parser (can be ArrayBuffer, Uint8Array, string, or json object)
  let result: GLTFParseResult = await GLTF.parse(
    gltfBuffer,
    {
      allowVersion: GLTFAllow2_0 //can pass in your own version allow callback here
    }
  );
  
  //Makes a scene graph using the demo GLTFThreeAdapter, casts result to Scene
  let data: any = (
    await result.makeSceneGraph(GLTFThreeAdapter)
  );
  console.log(data);
  for (let scene of data.scenes) {
    renderer.getScene().add(scene);
  }

  on(window, "resize", ()=>{
    renderer.resize(container.rect.width, container.rect.height);
  }, undefined);

  renderer.useDefaultCamera();
  renderer.camera.position.z = 10;

  renderer.resize(container.rect.width, container.rect.height);

  console.log(renderer.camera);
  
  renderer.start();
}

init();
