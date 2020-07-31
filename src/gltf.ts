
export const BINARY_EXTENSION_BUFFER_NAME: string = "binary_glTF";
export const BINARY_EXTENSION_HEADER_MAGIC: string = "glTF";
export const BINARY_EXTENSION_HEADER_LENGTH: number = 12;
export const BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

export type GLTFId = number;

/**[Red, Green, Blue]*/
export type GLTFJsonRGB = Array<number>;

/**[Red, Green, Blue, Alpha]*/
export type GLTFJsonRGBA = Array<number>;

export interface GLTFJsonBuffer {
  /**Length of data in bytes*/
  byteLength: number;
  /**The uri of the buffer. Relative paths are relative to the .gltf file. Instead of referencing an external file, the uri can also be a data-uri*/
  uri: string;
}

export interface GLTFJsonBufferView {
  /**Index of the buffer*/
  buffer: GLTFId;
  /**Total length of buffer*/
  byteLength: number;
  /**Offset in buffer*/
  byteOffset: number;
}

export interface GLTFJsonAccessor {
  /**The index of the bufferView. When not defined, accessor must be initialized with zeros; `sparse` property or extensions could override zeros with actual values*/
  bufferView: GLTFId;
  /**FLOAT - The datatype of components in the attribute*/
  componentType: number;
  /**The number of attributes referenced by this accessor, not to be confused with the number of bytes or number of components*/
  count: number;
  /**Maximum value of each component in this attribute. Array elements must be treated as having the same data type as accessor's `componentType`. Both min and max arrays have the same length. The length is determined by the value of the type property; it can be 1, 2, 3, 4, 9, or 16.`normalized` property has no effect on array values: they always correspond to the actual values stored in the buffer. When accessor is sparse, this property must contain max values of accessor data with sparse substitution applied*/
  max: Array<number>;
  /**See max*/
  min: Array<number>;
  /**Specifies if the attribute is a scalar, vector, or matrix*/
  type: string;
}

export interface GLTFJsonMeshAttributes {
  POSITION: GLTFId;
  NORMAL: GLTFId;
  TEXCOORD_0: GLTFId;
}

export interface GLTFJsonMeshPrimitive {
  /**Each key's value is the index of the accessor containing attribute's data*/
  attributes: GLTFJsonMeshAttributes;
  /**The index of the accessor that contains mesh indices. When this is not defined, the primitives should be rendered without indices using `drawArrays()`. When defined, the accessor must contain indices: the `bufferView` referenced by the accessor should have a `target` equal to 34963 (ELEMENT_ARRAY_BUFFER); `componentType` must be 5121 (UNSIGNED_BYTE), 5123 (UNSIGNED_SHORT) or 5125 (UNSIGNED_INT), the latter may require enabling additional hardware support; `type` must be `"SCALAR"`. For triangle primitives, the front face has a counter-clockwise (CCW) winding order. Values of the index accessor must not include the maximum value for the given component type, which triggers primitive restart in several graphics APIs and would require client implementations to rebuild the index buffer. Primitive restart values are disallowed and all index values must refer to actual vertices. As a result, the index accessor's values must not exceed the following maxima: BYTE `< 255`, UNSIGNED_SHORT `< 65535`, UNSIGNED_INT `< 4294967295`*/
  indicies: GLTFId;
  /**The index of the material to apply to this primitive when rendering*/
  material: GLTFId;
}

export interface GLTFJsonMesh {
  /**The name of this mesh*/
  name: string;
  primitives: Array<GLTFJsonMeshPrimitive>;
}

export interface GLTFJsonPBRMetallicRoughness {
  /**The RGBA components of the base color of the material. The fourth component (A) is the alpha coverage of the material. The `alphaMode` property specifies how alpha is interpreted. These values are linear. If a baseColorTexture is specified, this value is multiplied with the texel values*/
  baseColorFactor: GLTFJsonRGBA;
  /**The metalness of the material. A value of 1.0 means the material is a metal. A value of 0.0 means the material is a dielectric. Values in between are for blending between metals and dielectrics such as dirty metallic surfaces. This value is linear. If a metallicRoughnessTexture is specified, this value is multiplied with the metallic texel values*/
  metallicFactor: number;
  /**The roughness of the material. A value of 1.0 means the material is completely rough. A value of 0.0 means the material is completely smooth. This value is linear. If a metallicRoughnessTexture is specified, this value is multiplied with the roughness texel values*/
  roughnessFactor: number;
}

export interface GLTFJsonMaterial {
  doubleSided: boolean;
  /**The RGB components of the emissive color of the material. These values are linear. If an emissiveTexture is specified, this value is multiplied with the texel values*/
  emissiveFactor: GLTFJsonRGB;
  /**The name of this material*/
  name: string;
  pbrMetallicRoughness: GLTFJsonPBRMetallicRoughness;
}

export interface GLTFJsonNode {
  /**The index of the mesh in this node*/
  mesh: GLTFId;
  /**The name of this node, not unique*/
  name: string;
}

export interface GLTFJsonScene {
  /**Name of scene, not unique*/
  name: string;
  /**The indices of each root node*/
  nodes: Array<GLTFId>;
}

export interface GLTFJsonAsset {
  /**Tool that generated this glTF model. Useful for debugging*/
  generator: string;
  /**The glTF version that this asset targets*/
  version: string;
}

export interface GLTFJson {
  asset: GLTFJsonAsset;
  /**Default scene, the scene that should be loaded on model import*/
  scene: GLTFId;
  /**An array of scenes*/
  scenes: Array<GLTFJsonScene>;
  /**An array of nodes*/
  nodes: Array<GLTFJsonNode>;
  /**An array of materials*/
  materials: Array<GLTFJsonMaterial>;
  /**An array of meshes*/
  meshes: Array<GLTFJsonMesh>;
  /**An array of accessors. An accessor is a typed view into a bufferView*/
  accessors: Array<GLTFJsonAccessor>;
  /**An array of bufferViews. A bufferView is a view into a buffer generally representing a subset of the buffer*/
  bufferViews: Array<GLTFJsonBufferView>;
  /**An array of buffers. A buffer points to binary geometry, animation, or skins*/
  buffers: Array<GLTFJsonBuffer>;
}

export interface MeshCreationData {
  usePositions: boolean;
  positions: number[] | undefined;
  useIndicies: boolean;
  indicies: number[] | undefined;
  useNormals: boolean;
  normals: number[] | undefined;
  useColors: boolean;
  colors: number[] | undefined;
  useUvs: boolean;
  uvs: number[] | undefined;
}

export interface GLTFParseResultSceneGraphOptions {
  sceneCreate: (data: GLTFJsonScene) => any;
  /**Pass in your code for creating a node in the graph, must return the node!
   * @returns node created by your code
   */
  nodeCreate: (name: string, hasMesh: boolean) => any;
  nodeTranslate: (node: any, x: number, y: number, z: number) => void;
  nodeRotate: (node: any, x: number, y: number, z: number, w: number) => void;
  nodeParent: (parent: any, child: any) => void;
  nodeAddMesh: (node: any, mesh: any) => void;
  nodeAddMaterial: (node: any, material: any) => void;
  meshCreate: (data: MeshCreationData) => any;
  materialCreate: (data: GLTFJsonMaterial) => any;
}

export class _GLTFAccessor {
  dataView: DataView;
  componentType: number;
  count: number;
  //TODO - read up on whatever the heck min and max do
  min: number[];
  max: number[];
  constructor (jsonDef: GLTFJsonAccessor) {
    //TODO - convert componentType to something normal..
    this.componentType = jsonDef.componentType;
    this.count = jsonDef.count;
    this.min = jsonDef.min;
    this.max = jsonDef.max;
  }
}

export class GLTFParseResult {
  json: GLTFJson;
  /**Construct the scene graph, passing in your own code for the low level stuff*/
  makeSceneGraph(options: GLTFParseResultSceneGraphOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.json.scenes.forEach(options.sceneCreate);
      this.json.materials.forEach(options.materialCreate);

      let buffers = new Array<ArrayBuffer>(this.json.buffers.length);
      for (let i=0; i<this.json.buffers.length; i++) {
        //TODO - make sure this handles URLs correctly
        let def = this.json.buffers[i];
        let resp = await fetch(def.uri);
        buffers[i] = await resp.arrayBuffer();
      }

      let bufferViews = new Array<DataView>(this.json.bufferViews.length);
      for (let i=0; i<this.json.bufferViews.length; i++) {
        let def = this.json.bufferViews[i];
        bufferViews[i] = new DataView(
          buffers[def.buffer]
        );
      }

      let accessors = new Array<_GLTFAccessor>(this.json.accessors.length);
      this.json.accessors.forEach((json, index)=>{
        let accessor = new _GLTFAccessor(json);
        accessor.dataView = bufferViews[json.bufferView];
        accessors[index] = accessor;
      });

      this.json.meshes.forEach((json) => {
        //TODO - handle multiple primitives!
        let prim = json.primitives[0];
        let positionAccessor = accessors[prim.attributes.POSITION];
        let normalAccessor = accessors[prim.attributes.NORMAL];
        let uvAccessor = accessors[prim.attributes.TEXCOORD_0];

        //TODO - grab values from _GLTFAccessor s and dump into attributes

        let positions: number[];
        let normals: number[];
        let indicies: number[];
        let colors: number[];
        let uvs: number[];

        let useIndicies: boolean = (prim.indicies !== undefined && prim.indicies !== null);
        let data: MeshCreationData = {
          usePositions: true,
          useIndicies: useIndicies,
          useNormals: true,
          useColors: false, // TODO - handle colors
          useUvs: true,
          positions: positions,
          normals: normals,
          indicies: indicies,
          colors: colors,
          uvs: uvs
        };
        options.meshCreate(data);
      });

      //options.nodeAddMaterial
      //options.nodeAddMesh
      //options.nodeCreate
      //options.nodeParent
      //options.nodeRotate
      //options.nodeTranslate
    });
  }
}

export interface GLTFParseOptionsAllowVersionCallback {
  (version: string, versionAsNum: number): boolean;
}

export interface GLTFParseOptions {
  allowVersion: GLTFParseOptionsAllowVersionCallback;
}

export const GLTFAllow2_0 = (v: string, vn: number) => {
  return vn >= 2;
}

const textDec = new TextDecoder();

export class GLTF {
  /**Returns the header type gltf or glb*/
  static headerType(data: Uint8Array): string {
    return textDec.decode(data.subarray(0, 4));
  }
  /**Checks if a data containing glb or gltf is GLB or not*/
  static isGLB(data: Uint8Array): boolean {
    return GLTF.headerType(data) === BINARY_EXTENSION_HEADER_MAGIC;
  }
  /**Generic parser - for the lazy :)
   * @param data gltf or glb formatted data to parse
   * @param options to use while parsing
   */
  static parse(data: Uint8Array | string | GLTFJson | ArrayBuffer, options: GLTFParseOptions): Promise<GLTFParseResult> {
    return new Promise(async (resolve, reject) => {
      if (data instanceof ArrayBuffer) {
        resolve(await GLTF.parseArrayBuffer(data, options));
        return;
      } else if (data instanceof Uint8Array) {
        resolve(await GLTF.parseBin(data, options));
        return;
      } else if (typeof (data) === "string") {
        resolve(await GLTF.parseText(data, options));
        return;
      } else if (typeof (data) === "object") {
        resolve(GLTF.parseJson(data as GLTFJson, options));
        return;
      } else {
        reject(`gltf data passed wasn't a known type: ${typeof (data)} : ${data}`);
        return;
      }
    });
  }
  /**Parses Uint8Array from either gltf or glb content*/
  static parseBin(data: Uint8Array, options: GLTFParseOptions): Promise<GLTFParseResult> {
    return new Promise(async (resolve, reject) => {
      //TODO - implement binary parsing to json
      if (GLTF.isGLB(data)) {
        reject("GLB not handled yet");
        return;
      } else {
        resolve(await GLTF.parseText(textDec.decode(data), options));
        return;
      }
    });
  }
  /**Parses loaded in json data gltf*/
  static parseJson(gltfJson: GLTFJson, options: GLTFParseOptions): Promise<GLTFParseResult> {
    return new Promise((resolve, reject) => {
      let result: GLTFParseResult = new GLTFParseResult();

      //Reject versions that options don't support
      if (!options.allowVersion(
        gltfJson.asset.version,
        parseFloat(gltfJson.asset.version))) {
        reject(`Version ${gltfJson.asset.version} rejected by options.allowVersion`);
      }
      result.json = gltfJson;
      //TODO
      resolve(result);
    })
  }
  /**Transforms text to json data gltf and parses*/
  static parseText(data: string, options: GLTFParseOptions): Promise<GLTFParseResult> {
    return new Promise(async (resolve, reject) => {
      let json: GLTFJson;
      try {
        json = JSON.parse(data);
      } catch (ex) {
        reject(`Couldn't parse json of gltf data, was typeof object ${ex}`);
        return;
      }
      resolve(await GLTF.parseJson(json, options));
    });
  }
  /**Transforms arraybuffer to uint8array and parses*/
  static parseArrayBuffer(data: ArrayBuffer, options: GLTFParseOptions): Promise<GLTFParseResult> {
    return new Promise(async (resolve, reject) => {
      let result = await GLTF.parseBin(new Uint8Array(data), options).catch(reject);
      if (!result) return;
      resolve(result);
    });
  }
  /**Converts number[r, g, b] to unsigned int
   * @param rgba
   * @returns numerical representation of color as unsigned integer
   * 
   * jsonRgbaToNumber([
   *  255, 0, 255
   * ]).toString(16);
   * //Outputs "ff00ffff"
   */
  static jsonRgbToNumber(rgb: GLTFJsonRGB): number {
    /**OK, witchcraft time
     * Bitshift left 24 (red value here) will result in
     * output wrapping around in binary (signed)
     * We want it to be unsigned
     * 
     * You can do >>> to bitshift right to get UNSIGNED result
     * Unfortunately there is no equivalent for left shift..
     * 
     * SO, let it wrap, then unsign it with >>> 0
    */
    return (
      //Shift red value over 3 bytes to the right
      rgb[0] << 24 | //bit 'or' with next value

      //Shift green value over 2 bytes to the right
      rgb[1] << 16 | //bit 'or' with next value

      //Shift blue value over 1 byte to the right
      rgb[2] << 8 | //bit 'or' with next value

      //Full alpha
      255
    ) >>> 0; // ">>> 0" unsigns number
  }
  /**Converts number[r, g, b, a] to unsigned int
   * @param rgba
   * @returns numerical representation of color as unsigned integer
   * 
   * jsonRgbaToNumber([
   *  255, 0, 255, 0
   * ]).toString(16);
   * //Outputs "ff00ff00"
   */
  static jsonRgbaToNumber(rgba: GLTFJsonRGBA): number {
    return (
      //Shift red value over 3 bytes to the right
      rgba[0] << 24 | //bit 'or' with next value

      //Shift green value over 2 bytes to the right
      rgba[1] << 16 | //bit 'or' with next value

      //Shift blue value over 1 byte to the right
      rgba[2] << 8 | //bit 'or' with next value

      //alpha value
      rgba[3]
    ) >>> 0;
  }
}
