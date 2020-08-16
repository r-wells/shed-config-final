import React, { Component } from "react";
import "./Display.css";

import * as THREE from "three";

import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "./OrbitControls.js";
import Button from "./../Button/Button";

var scene = new THREE.Scene();

var cameraFront, cameraRight, cameraLeft, cameraBack;

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threeLoaded: false,
      autoRotate: false,
      prevConfig: null,
      extrasDownloaded: false,
      sizing: "ten",
      sizeChange: false,
      resetDefault: false,
      camTargetsActivated: false,
      color: null,
      changeColor: false,
      camAnimTarget: "null",
      camAnimActivate: false,
      camPosition: "unknown",
      camTargetPosition: null,
      allConfigs: {},
      currentConfig: [],
      Config_8x10: [
        "8x8_Base",
        "8x8_Back_44s_s",
        "8x8_Left_44s_s",
        "8x8_Right_44s_s",
        "8x8_Front_door_22s",
      ],
      Config_10x10: [
        "10x8_Base",
        "10x8_Back_44s_22s_44s",
        "10x8_Left_44s_s",
        "10x8_Right_44s_s",
        "10x8_Front_22s_door_22s",
      ],
      Config_12x10: [
        "12x8_Base",
        "12x8_Back_44s_s_s",
        "12x8_Left_44s_22s_44s",
        "12x8_Right_44s_22s_44s",
        "12x8_Front_22s_door_44s",
      ],
      default_8x10: [],
      default_10x10: [],
      default_12x10: [],
      defaultsSet: false,
      disableMesh: null,
      enableMesh: null,
    };
    this.remount = this.remount.bind(this);
    this.stop = this.stop.bind(this);
    this.resetCamPosition = this.resetCamPosition.bind(this);
    this.setCurrentConfig = this.setCurrentConfig.bind(this);
    this.updateExtrasState = this.updateExtrasState.bind(this);
    this.checkMeshInConfig = this.checkMeshInConfig.bind(this);
    this.resetDefaultConfig = this.resetDefaultConfig.bind(this);
  }

  startCamAnim(direction) {
    if (!this.state.camAnimActivate) {
      var camPosition;
      var target;
      if (direction === "Front") {
        target = cameraFront;
        camPosition = "Front";
      } else if (direction === "Back") {
        target = cameraBack;
        camPosition = "Back";
      } else if (direction === "Left") {
        target = cameraLeft;
        camPosition = "Left";
      } else if (direction === "Right") {
        target = cameraRight;
        camPosition = "Right";
      }
      this.setState({
        camAnimTarget: target,
        camAnimActivate: true,
        camPosition: camPosition,
      });
    }
  }

  updateExtrasState() {
    this.setState({ extrasDownloaded: true });
  }

  checkMeshInConfig = (name) => {
    if (this.state.extrasDownloaded) {
      return this.state.allConfigs[this.state.sizing].includes(name);
    }
  };

  setCurrentConfig(array) {
    var sizing = this.state.sizing;
    this.setState({ currentConfig: array });
    if (sizing === "eight") {
      this.setState({ Config_8x10: array });
    } else if (sizing === "ten") {
      this.setState({ Config_10x10: array });
    } else if (sizing === "twelve") {
      this.setState({ Config12x10: array });
    }
  }

  resetCamPosition() {
    if (this.state.camPosition !== "unknown") {
      this.setState({ camPosition: "unknown" });
    }
  }

  remount = () => {
    this.componentWillUnmount();
    this.componentDidMount();
  };

  resetDefaultConfig(size) {
    this.setState({ resetDefault: size });
  }

  mutateConfigName(sizing, configuration) {
    var size;
    var config;
    var name;
    if (sizing === "eight") {
      size = "8x8";
    } else if (sizing === "ten") {
      size = "10x8";
    } else if (sizing === "twelve") {
      size = "12x8";
    }
    if (configuration[0] === "F") {
      config = "Front" + configuration.slice(1);
    } else if (configuration[0] === "B") {
      config = "Back" + configuration.slice(1);
    } else if (configuration[0] === "L") {
      config = "Left" + configuration.slice(1);
    } else if (configuration[0] === "R") {
      config = "Right" + configuration.slice(1);
    }
    name = size + "_" + config;
    return name;
  }

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  initiateScene = () => {
    var envMap;
    var currentConfigArray = [];
    var reflectionResolution;
    var componentArray = [];
    var jsonData;
    var precisionQuality = "highp";
    var reflectionResolution = 1024;

    var preloader = document.createElement("div");
    preloader.id = "loader";

    const manager = new THREE.LoadingManager();
    const manager2 = new THREE.LoadingManager();

    const loader = new THREE.GLTFLoader(manager);
    const loader2 = new THREE.GLTFLoader(manager2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const envLoader = new THREE.RGBELoader(manager);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.gammaOutput = true;
    renderer.gammaInput = true;
    renderer.gammaFactor = 2.2;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMapSoft = true;

    // renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 2;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;

    // renderer.shadowCameraFar = 100;
    // renderer.shadowCameraFov = 80;

    var reflectiveMat = new THREE.MeshStandardMaterial({
      color: "white",
      metalness: 1,
      roughness: 0,
      precision: precisionQuality,
    });

    manager.onStart = function (url, itemsLoaded, itemsTotal) {};

    manager.onLoad = function () {
      // console.log("Loading complete!");
      setTimeout(init, 100);
      preloader.style.display = "none";

      loader2.load(
        "https://d178re3qvjjhpw.cloudfront.net/shed/Assets/Extras_new3_comp.gltf",
        (gltf) => {
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              // console.log(child.name);
              // child.material = reflectiveMat;
              child.material.precisionQuality = precisionQuality;
              child.material.roughness = 0.65;
              child.material.envMap = envMap;
              child.material.envMapIntensity = 0.4;
              child.visible = false;
              child.castShadow = true;
              child.receiveShadow = true;
              // scene.add(child);
            } else if (child.type === "Group") {
              componentArray.push(child);
            }
          });
          scene.add(gltf.scene);
        }
      );
    };

    manager.onProgress = function (item, loaded, total) {
      var percentageLoad = (loaded / total) * 100 + "%";
      // console.log(percentageLoad);

      preloader.innerHTML = percentageLoad;
      // console.log(preloader);
    };

    this.mount.appendChild(preloader);

    manager.onError = function (url) {
      // console.log("There was an error loading " + url);
    };

    manager2.onLoad = () => {
      this.updateExtrasState();
      var ten = componentArray
        .filter((x) => x.name.split("_")[0] === "10x8")
        .map((x) => x.name);
      ten = { ten: ten };
      var eight = componentArray
        .filter((x) => x.name.split("_")[0] === "8x8")
        .map((x) => x.name);
      eight = { eight: eight };
      var twelve = componentArray
        .filter((x) => x.name.split("_")[0] === "12x8")
        .map((x) => x.name);
      twelve = { twelve: twelve };
      jsonData = { ...eight, ...ten, ...twelve };
      this.setState({ allConfigs: jsonData });
      //   jsonData = JSON.stringify(jsonData);
      //   this.download(jsonData, "json.txt", "text/plain");
    };

    envLoader.load(
      "https://d178re3qvjjhpw.cloudfront.net/reflection2.hdr",
      (texture) => {
        var cubeGenerator = new THREE.EquirectangularToCubeGenerator(texture, {
          resolution: reflectionResolution,
        });
        cubeGenerator.update(renderer);
        var pmremGenerator = new THREE.PMREMGenerator(
          cubeGenerator.renderTarget.texture
        );
        pmremGenerator.update(renderer);
        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(
          pmremGenerator.cubeLods
        );
        pmremCubeUVPacker.update(renderer);

        envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        //background image
        // var generator = new THREE.CubemapGenerator(renderer);
        // var renderTarget = generator.fromEquirectangular(texture, {
        //   resolution: reflectionResolution,
        // });

        // scene.background = renderTarget;

        loader.load(
          "https://d178re3qvjjhpw.cloudfront.net/shed/Assets/Base_model.gltf",
          (gltf) => {
            gltf.scene.traverse(function (child) {
              if (child.isMesh) {
                // child.material = reflectiveMat;
                child.material.precisionQuality = precisionQuality;
                child.material.roughness = 0.65;
                child.material.envMap = envMap;
                child.material.envMapIntensity = 0.4;
                child.castShadow = true;
                child.receiveShadow = true;
              } else if (child.type === "Group") {
                componentArray.push(child);
                currentConfigArray.push(child.name);
              } else {
                child.intensity = 0.5;
                // child.castShadow = true;
              }
            });

            scene.add(gltf.scene);
          }
        );
      }
    );

    this.setCurrentConfig(currentConfigArray);

    const init = () => {
      var idleTime = 0;
      var controls;
      var moveCam;
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;
      var camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
      camera.position.z = 5;
      camera.position.y = 0.5;
      var ambientLight = new THREE.AmbientLight(0xcccccc);
      var directLight = new THREE.DirectionalLight("white");
      directLight.intensity = 0.7;
      directLight.position.set(20, 2, 20);
      ambientLight.intensity = 0.2;
      directLight.castShadow = true;
      directLight.shadow.bias = -0.0001;
      directLight.shadow.camera.near = 10;
      directLight.shadow.camera.far = 50;
      directLight.shadow.mapSize.width = 2048;
      directLight.shadow.mapSize.height = 2048;
      directLight.shadowMapDarkness = 2;
      directLight.shadowMapSoft = true;

      // var shadowCameraHelper = new THREE.CameraHelper(
      //   directLight.shadow.camera
      // );
      // shadowCameraHelper.visible = true;

      scene.add(directLight);
      scene.add(ambientLight);
      // scene.add(shadowCameraHelper);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      function colorLuminance(hex, lum) {
        hex = String(hex).replace(/[^0-9a-f]/gi, "");
        if (hex.length < 6) {
          hex = hex.replace(/(.)/g, "$1$1");
        }
        lum = lum || 0;
        var rgb = "#",
          c;
        for (var i = 0; i < 3; ++i) {
          c = parseInt(hex.substr(i * 2, 2), 16);
          c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
          rgb += ("00" + c).substr(c.length);
        }
        return rgb;
      }

      const changeColor = (code, mesh_name) => {
        var foundMeshesArray;
        var color = colorLuminance(code, -0.3);
        function changeColorOnChildren(foundMeshesArray) {
          foundMeshesArray.forEach((group) => {
            group.children.forEach((item) => {
              if (item.material.name === "Material12") {
                item.material.color = new THREE.Color(color);
              }
            });
          });
        }
        if (mesh_name) {
          foundMeshesArray = componentArray.filter((x) => x.name === mesh_name);
          changeColorOnChildren(foundMeshesArray);
        } else {
          this.state.currentConfig.forEach((e) => {
            foundMeshesArray = componentArray.filter((x) => x.name === e);
            changeColorOnChildren(foundMeshesArray);
          });
        }

        this.setState({ changeColor: false });
      };

      const disableMeshGroup = (name) => {
        var foundMeshes = componentArray.filter((x) => x.name === name);
        // console.log(`disabling:`);
        // console.log(foundMeshes);
        foundMeshes[0].children.forEach((x) => {
          x.visible = false;
        });
      };

      const enableMeshGroup = (name) => {
        var foundMeshes = componentArray.filter((x) => x.name === name);
        // console.log(`enabling:`);
        // console.log(foundMeshes);
        foundMeshes[0].children.forEach((x) => {
          x.visible = true;
        });
      };

      const swapMeshGroups = (disableMesh, enableMesh, delay) => {
        var check = this.checkMeshInConfig(enableMesh);
        if (check) {
          if (this.state.camTargetPosition === this.state.camPosition) {
            delay = 0;
            // console.log("camera already in position");
          } else {
            this.startCamAnim(this.state.camTargetPosition);
          }
          var curConfig;
          curConfig = this.state.currentConfig;
          curConfig[curConfig.indexOf(disableMesh)] = enableMesh;
          this.setCurrentConfig(curConfig);

          setTimeout(() => {
            disableMeshGroup(disableMesh);
            enableMeshGroup(enableMesh);
            changeColor(this.state.color, enableMesh);
            // console.log("configuration changed successfully");
            idleTime = 0;
          }, delay);
        } else {
          console.log(
            `${enableMesh} was not found in config database, change failed`
          );
        }
        this.setState({
          disableMesh: null,
          enableMesh: null,
          camTargetPosition: null,
        });
      };

      const changeSize = (size) => {
        var newConfig;
        if (size === "ten" || size === "eight" || size === "twelve") {
          if (size === "ten") {
            // console.log("switching to size Ten");
            newConfig = this.state.Config_10x10;
            this.setState({ sizing: "ten" });
          } else if (size === "eight") {
            // console.log("switching to size Eight");
            newConfig = this.state.Config_8x10;
            this.setState({ sizing: "eight" });
          } else if (size === "twelve") {
            // console.log("switching to size Twelve");
            newConfig = this.state.Config_12x10;
            this.setState({ sizing: "twelve" });
          }
          let n = 0;
          while (n < this.state.currentConfig.length) {
            disableMeshGroup(this.state.currentConfig[n]);
            enableMeshGroup(newConfig[n]);
            n++;
          }
          this.setCurrentConfig(newConfig);
        } else {
          console.log("Incorrect size provided: Switching size aborted");
        }

        this.setState({ sizeChange: false });
      };

      const resetDefaultConfig = (size) => {
        var newConfig;
        var base = this.state.currentConfig.filter(
          (x) => x.split("_")[x.split("_").length - 1] === "Base"
        )[0];
        var oldConfig = this.state.currentConfig.filter(
          (item) => item !== base
        );

        if (size === "ten" || size === "eight" || size === "twelve") {
          if (size === "ten") {
            newConfig = this.state.default_10x10.filter(
              (item) => item !== base
            );
          } else if (size === "eight") {
            newConfig = this.state.default_8x10.filter((item) => item !== base);
          } else if (size === "twelve") {
            newConfig = this.state.default_12x10.filter(
              (item) => item !== base
            );
          }
          let n = 0;
          while (n < oldConfig.length) {
            disableMeshGroup(oldConfig[n]);
            enableMeshGroup(newConfig[n]);

            n++;
          }
          newConfig.push(base);
          this.setCurrentConfig(newConfig);
        } else {
          console.log("Incorrect size provided: Config reset aborted");
        }

        this.setState({ resetDefault: false });
      };

      const initControls = (camera) => {
        controls = new OrbitControls(camera, this.mount);
        controls.screenSpacePanning = false;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.2;
        controls.minZoom = 3;
        controls.maxZoom = 30;
        controls.minDistance = 3;
        controls.maxDistance = 10;
        controls.target.set(0, 0, 0);
        controls.autoRotateSpeed = -2;
        controls.minPolarAngle = THREE.Math.degToRad(30);
        controls.maxPolarAngle = THREE.Math.degToRad(100);

        // controls.autoRotate = true;
      };
      // camera.lookAt(0, 1, 0);

      initControls(camera);

      // controls.dispose();

      const initAllCameraPositions = () => {
        cameraFront = camera.clone();
        controls.rotate(THREE.Math.degToRad(250));
        controls.update();
        cameraLeft = camera.clone();
        controls.rotate(THREE.Math.degToRad(-660));
        controls.update();
        cameraRight = camera.clone();
        controls.rotate(THREE.Math.degToRad(70));
        controls.update();
        cameraBack = camera.clone();
        controls.rotate(THREE.Math.degToRad(-20));
        controls.autoRotate = this.state.autoRotate;
        if (!this.state.autoRotate) {
          this.setState({ camPosition: "Front" });
        }
      };

      const initTween = function (camera, requiredCamPosition) {
        moveCam = new TWEEN.Tween({ t: 0 })
          .to({ t: 1 }, 1000)
          .onUpdate((tween) => {
            camera.quaternion.slerp(requiredCamPosition.quaternion, tween.t);
          })
          .onStart(function () {
            new TWEEN.Tween(camera.position)
              .to(requiredCamPosition.position, 500)
              .start();
          })
          .onComplete(function () {
            initTween(camera);
            controls.enabled = true;
            this.camAnimActivate = false;
            // console.log("animation completed");
          });
      };

      setInterval(() => {
        idleTime += 2;
      }, 2000);

      this.mount.appendChild(renderer.domElement);

      const animate = () => {
        controls.update();
        if (idleTime > 8 && !controls.autoRotate) {
          idleTime = 0;
          if (this.state.autoRotate) {
            // console.log("auto rotation starting");
            this.resetCamPosition();
          }
          controls.autoRotate = this.state.autoRotate;
        }
        this.frameId = window.requestAnimationFrame(animate);
        renderer.render(scene, camera);
        TWEEN.update();
        if (!this.state.camTargetsActivated) {
          initAllCameraPositions();
          this.setState({ camTargetsActivated: true });
        }
        if (this.state.camAnimActivate) {
          idleTime = 0;
          initTween(camera, this.state.camAnimTarget);
          controls.enabled = false;
          controls.autoRotate = false;
          moveCam.start();
          this.setState({ camAnimActivate: false });
        }
        if (
          this.state.extrasDownloaded &&
          this.state.enableMesh != null &&
          !this.state.camAnimActivate
        ) {
          swapMeshGroups(this.state.disableMesh, this.state.enableMesh, 500);
        }

        if (this.state.extrasDownloaded && this.state.sizeChange) {
          changeSize(this.state.sizing);
        }
        if (this.state.changeColor) {
          changeColor(this.state.color);
        }
        if (this.state.resetDefault !== false) {
          resetDefaultConfig(this.state.resetDefault);
        }
      };

      const handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleWindowResize);
      this.mount.addEventListener("click", this.resetCamPosition);
      this.mount.addEventListener("touchend", this.resetCamPosition);

      animate();
      if (!this.state.threeLoaded) {
        this.setState({ threeLoaded: true });
      }
    };
  };

  componentDidMount() {
    this.initiateScene();
    if (!this.state.defaultsSet) {
      this.setState({
        default_10x10: [...this.state.Config_10x10],
        default_8x10: [...this.state.Config_8x10],
        default_12x10: [...this.state.Config_12x10],
        defaultsSet: true,
      });
      setTimeout(() => {
        // console.log(this.state);
      }, 2000);
    }
  }
  componentDidUpdate() {
    if (
      (this.state.threeLoaded &&
        this.props.sizing &&
        this.props.configuration &&
        this.props.configuration !== this.state.prevConfig) ||
      this.props.sizing !== this.state.sizing
    ) {
      var passedConfig;
      var camPosition;
      if (this.state.sizing === this.props.sizing) {
        // console.log("size is the same");
        passedConfig = this.mutateConfigName(
          this.props.sizing,
          this.props.configuration
        );
        if (this.state.currentConfig.includes(passedConfig)) {
          // console.log("current config already includes this");
        } else {
          camPosition = passedConfig.split("_")[1];
          if (this.state.camPosition === camPosition) {
            // console.log(`Camera is already showing ${camPosition}`);
            this.setState({ camTargetPosition: camPosition });
            //switch configuration here
            //find mesh to disable
            var curConfig = this.state.currentConfig;
            var meshToDisable;
            curConfig.forEach((e) => {
              e.split("_").forEach((x) => {
                if (x === camPosition) {
                  meshToDisable = e;
                }
              });
            });
            this.setState({
              disableMesh: meshToDisable,
              enableMesh: passedConfig,
            });
          } else {
            // console.log(`Camera will move to ${camPosition}`);
            this.setState({ camTargetPosition: camPosition });
            var curConfig = this.state.currentConfig;
            var meshToDisable;
            curConfig.forEach((e) => {
              e.split("_").forEach((x) => {
                if (x === camPosition) {
                  meshToDisable = e;
                }
              });
            });
            this.setState({
              disableMesh: meshToDisable,
              enableMesh: passedConfig,
            });
            //disable found mesh
          }
        }
      } else {
        //change base model here
        this.setState({
          sizeChange: true,
          sizing: this.props.sizing,
          changeColor: true,
        });
      }

      this.setState({ prevConfig: this.props.configuration });
    }
    if (this.state.threeLoaded && this.props.color !== this.state.color) {
      // console.log("color updated to " + this.props.color);

      this.setState({
        changeColor: true,
        color: this.props.color,
      });
    }
  }

  componentWillUnmount() {
    this.stop();

    this.mount.removeChild(this.renderer.domElement);
  }

  render() {
    return (
      <div className="Three">
        <div className="DisplayContainer" ref={(ref) => (this.mount = ref)} />
        {/* <button onClick={() => this.startCamAnim("Front")}>South</button>
        <button onClick={() => this.startCamAnim("Left")}>Left</button>
        <button onClick={() => this.startCamAnim("Right")}>Right</button>
        <button onClick={() => this.startCamAnim("Back")}>North</button> */}
        {/* <button
          onClick={() => {
            console.log(this.state.currentConfig);
          }}
        >
          Log Current Configurations
        </button> */}
        <Button
          buttonText="Reset to default configuration"
          classes="Button"
          onClick={() => {
            this.resetDefaultConfig(this.state.sizing);
          }}
        />
      </div>
    );
  }
}

export default Display;
