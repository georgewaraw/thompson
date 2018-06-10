
function init() {

  renderer = new THREE.WebGLRenderer( {
    alpha: true
  } )
  // renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth / 8, window.innerHeight / 8, false )
  document.body.appendChild( renderer.domElement )

  camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 10000 )
  camera.position.set( 0, 140, 0 )

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2( 0xFF3D00, .00023 )

  light = new THREE.AmbientLight( 0xFBE9E7 )
  scene.add( light )

  initRoad()
  initSky()
  initGround()
  initPyramid()
  initShaders()
  window.addEventListener( 'resize', onWindowResize, false )
  animate()

}


function initRoad() {

  geometry = new THREE.PlaneGeometry( 750, 10000 )

  video = document.createElement( 'video' )
  video.src = 'LH Road.mp4'
  video.autoplay = true
  // video.muted = true
  video.loop = true
  // video.play()

  texture = new THREE.VideoTexture( video )
  texture.minFilter = THREE.LinearFilter
  // texture.magFilter = THREE.LinearFilter
  // texture.format = THREE.RGBFormat

  material = new THREE.MeshLambertMaterial( {
    map: texture
  } )

  mesh = new THREE.Mesh( geometry, material )
  mesh.rotation.set( -.6 * Math.PI, 0, 0 )
  scene.add( mesh )

}


function initSky() {

  geometry = new THREE.PlaneGeometry( 3175, 1500 )

  video = document.createElement( 'video' )
  video.src = 'LH Sky 2.mp4'
  video.autoplay = true
  // video.muted = true
  video.loop = true
  // video.play()

  texture = new THREE.VideoTexture( video )
  texture.minFilter = THREE.LinearFilter
  // texture.magFilter = THREE.LinearFilter
  // texture.format = THREE.RGBFormat

  material = new THREE.MeshLambertMaterial( {
    map: texture
  } )

  mesh = new THREE.Mesh( geometry, material )
  mesh.position.set( 0, 425, -1250 )
  scene.add( mesh )

}


function initGround() {

  geometry = new THREE.PlaneGeometry( 7250, 10000 )

  video = document.createElement( 'video' )
  video.src = 'LH Ground.mp4'
  video.autoplay = true
  // video.muted = true
  video.loop = true
  // video.play()

  texture = new THREE.VideoTexture( video )
  texture.minFilter = THREE.LinearFilter
  // texture.magFilter = THREE.LinearFilter
  // texture.format = THREE.RGBFormat

  material = new THREE.MeshLambertMaterial( {
    map: texture
  } )

  mesh = new THREE.Mesh( geometry, material )
  mesh.rotation.set( -.60001 * Math.PI, 0, 0 )
  scene.add( mesh )

}


function initPyramid() {

  geometry = new THREE.CylinderGeometry( 25, 250, 250, 4 )

  video = document.createElement( 'video' )
  video.src = 'ACFW Eye.mp4'
  video.autoplay = true
  // video.muted = true
  video.loop = true
  // video.play()

  texture = new THREE.VideoTexture( video )
  texture.minFilter = THREE.LinearFilter
  // texture.magFilter = THREE.LinearFilter
  // texture.format = THREE.RGBFormat

  material = new THREE.MeshLambertMaterial( {
    map: texture
  } )

  mesh = new THREE.Mesh( geometry, material )
  mesh.position.set( 0, 200, -1250 )
  mesh.rotation.set( Math.PI, 0, 0 )
  scene.add( mesh )

}


function initShaders() {

  composer = new THREE.EffectComposer( renderer )
  composer.addPass( new THREE.RenderPass( scene, camera ) )

  effect = new THREE.ShaderPass( THREE.TechnicolorShader )
  composer.addPass( effect )
  effect2 = new THREE.FilmPass( 1, .01, 4096, false  )
  effect2.renderToScreen = true
  composer.addPass( effect2 )

}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth / 8, window.innerHeight / 8, false )

}


function animate() {

  requestAnimationFrame( animate )


  mesh.rotation.y = Date.now() * .001


  composer.render()
  // renderer.render( scene, camera )

}


