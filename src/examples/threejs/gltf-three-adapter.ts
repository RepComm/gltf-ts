
import {
  Scene,
  Object3D,
  Mesh,
  Material,
  MeshStandardMaterial,
  Geometry,
  BufferGeometry,
  BufferAttribute,
  Float32BufferAttribute,
  DoubleSide,
  FrontSide
} from "./libs/three/Three.js";

import { GLTFParseResultSceneGraphOptions, GLTF } from "../../gltf.js";

export const GLTFThreeAdapter: GLTFParseResultSceneGraphOptions = {
  sceneCreate:(data): Scene => {
    let result = new Scene();
    result.name = data.name;
    return result;
  },
  /* We're asked to create a node, lets tell three.js to do this
   * We redeclare return type as Object3D so we don't forget to return it
   */
  nodeCreate: (name, hasMesh): Object3D => {
    //Store the result
    let result: Object3D;

    //If model has a mesh, create a three.js mesh (its an Object3D that has geometry)
    if (hasMesh) {
      result = new Mesh();
    } else {
      //Otherwise create an empty
      result = new Object3D();
    }
    //Set the name (gltf doesn't care about this much, just helps us not loose data)
    result.name = name;

    //IMPORTANT, must return the object so gltf can march the scene graph
    return result;
  },
  /* Here we can redeclare the type of node from 'any' to Object3D
   * Which is less work that casting node to Object3D like so:
   * (node as Object3D).position.set(x, y, z);
   */
  nodeTranslate: (node: Object3D, x, y, z) => {
    node.position.set(x, y, z);
  },
  /* Again, redeclare node as Object3D
   * Otherwise, you have to do:
   * (node as Object3D).quaternion.set(x, y, z, w);
   */
  nodeRotate: (node: Object3D, x, y, z, w) => {
    node.quaternion.set(x, y, z, w);
  },
  /**Redeclare both parent and child as Object3D*/
  nodeParent: (parent: Object3D, child: Object3D) => {
    parent.add(child);
  },
  /**Redeclare node as Mesh, and mesh as Geometry (three.js naming conventions mah dude)*/
  nodeAddMesh: (node: Mesh, mesh: Geometry) => {
    node.geometry = mesh;
  },
  nodeAddMaterial: (node: Mesh, material: Material) => {
    node.material = material;
  },
  /**This is where we need to handle creation of mesh data
   * Redeclare result as Geometry or BufferGeometry so
   * we don't forget to return it
   */
  meshCreate: (data): BufferGeometry => {
    let result: BufferGeometry = new BufferGeometry();

    //Attributes can be undefined, check first
    if (data.usePositions) {
      //Convert positions to float32array because thats what buffer geom likes
      //See https://threejs.org/docs/index.html#api/en/core/BufferGeometry
      let verts = Float32Array.from(data.positions);

      //Assign the vertex data
      result.setAttribute("position", new BufferAttribute(verts, 3));
    }

    //Non-indexed triangles are a thing, maaan
    if (data.useIndicies) {
      result.setIndex(data.indicies);
    }

    if (data.useNormals) {
      result.setAttribute("normal", new Float32BufferAttribute(data.normals, 3));
    }

    if (data.useColors) {
      result.setAttribute("color", new Float32BufferAttribute(data.colors, 3));
    }

    if (data.useUvs) {
      result.setAttribute("uv", new Float32BufferAttribute(data.uvs, 2));
    }

    //IMPORTANT, we need to return the geometry so gltf-ts can handle it
    return result;
  },
  materialCreate: (data): Material => {
    return new MeshStandardMaterial({
      side: data.doubleSided ? DoubleSide : FrontSide,
      emissive: GLTF.jsonRgbToNumber(data.emissiveFactor),
      name: data.name,
      roughness: data.pbrMetallicRoughness.roughnessFactor,
      metalness: data.pbrMetallicRoughness.metallicFactor,
      color: GLTF.jsonRgbaToNumber(data.pbrMetallicRoughness.baseColorFactor)
    });
  }
};
