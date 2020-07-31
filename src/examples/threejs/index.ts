
//Import gltf-ts library es module
import { GLTF, GLTFAllow2_0, GLTFParseResult } from "./gltf.js";

//Import three for the sake of demo
import { Scene } from "./libs/three/Three.js";

//Import the demo adapter that parses gltf response to three.Scene
import { GLTFThreeAdapter } from "./gltf-three-adapter.js";

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
  let scene: Scene = (
    await result.makeSceneGraph(GLTFThreeAdapter)
  ) as Scene;

  console.log(scene);
}

init();
