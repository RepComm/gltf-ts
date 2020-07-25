
import { GLTF, GLTFAllow2_0, GLTFParseResult } from "./gltf.js";

//Async function so we can use await
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
      allowVersion:GLTFAllow2_0 //can pass in your own version allow here
    }
  );

  //Do something with result
  console.log ( result );

}

init();
