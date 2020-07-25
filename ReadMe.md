# gltf-ts

A typescript GLTF parser (set up to compile to javascript ES Modules w/ babel)

## Status
Boiler plate for API is written, but parsing is only 1/4 done<br/>
Nothing to look at yet.

## Purpose
I'm using three.js' GLTFLoader, but converted to esm/es6 classes<br/>
Unfortunately it still doesn't offer the grainularity I need for my style.<br/>

This setup is its own implementation of GLTF parser that tries to follow<br/>
[specification 2.0](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)

## Lib notes
This code tries to be non-api-locking<br/>
This lib does not:
- Use third party libs
- Use target specific file APIs (just give me data)
- Force you to use TypeScript or JavaScript (you can use either one)
- Force you to use babel (you can compile gltf.ts however you want)

I used babel to compile only because the MS ts compiler seems to suck.

Everything is done to be as mobile of an API as possible.<br/>
You should be able to use this just about anywhere with little hassle.

## API / docs
- TODO

- See [typescript example](./src/index.ts)

## Tools used
- [vscode](https://code.visualstudio.com)
- [vscode gltf ext](https://github.com/AnalyticalGraphicsInc/gltf-vscode)
- [gltf 2.0 spec](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)
- [babel as typescript compiler](https://babeljs.io)
