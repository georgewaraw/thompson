
function init() {

  canvas = document.getElementById( 'canvas' )
  renderer = new THREE.WebGLRenderer( {
    canvas : canvas } )
  renderer.setSize(
      window.innerWidth / 8 , window.innerHeight / 8 , false )

  camera = new THREE.PerspectiveCamera(
      75 , window.innerWidth / window.innerHeight , 1 , 10000 )
  camera.position.set(
      0 , 140 , 0 )

  scene = new THREE.Scene( )
  scene.fog = new THREE.FogExp2(
      0xFF3D00 , .00023 ) // Deep Orange A400

  light = new THREE.AmbientLight( 0xFBE9E7 ) // Deep Orange 50
  scene.add( light )

  window.addEventListener(
      'resize' , resize )
  window.addEventListener(
      'keydown' , keydown )

  road( )
  sky( )
  ground( )
  eye( )

  postprocessing( )

  animate( )

}

function resize( ) {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix( )

  renderer.setSize(
      window.innerWidth / 8 , window.innerHeight / 8 , false )

  composer.reset( )

}

function keydown( e ) {

  if ( e.code === 'Space' ) {

    videoRoad.play( )
    videoSky.play( )
    videoGround.play( )
    videoEye.play( )

  }

}


function road( ) {

  geometry = new THREE.PlaneGeometry(
      750 , 10000 )

  videoRoad = document.getElementById( 'videoRoad' )
  texture = new THREE.VideoTexture( videoRoad )
  texture.minFilter = THREE.LinearFilter
  material = new THREE.MeshLambertMaterial( {
    map : texture
  } )

  mesh = new THREE.Mesh(
      geometry , material )
  mesh.rotation.set(
      -.6 * Math.PI , 0 , 0 )
  scene.add( mesh )

}

function sky( ) {

  geometry = new THREE.PlaneGeometry(
      3175 , 1500 )

  videoSky = document.getElementById( 'videoSky' )
  texture = new THREE.VideoTexture( videoSky )
  texture.minFilter = THREE.LinearFilter
  material = new THREE.MeshLambertMaterial( {
    map : texture
  } )

  mesh = new THREE.Mesh(
      geometry , material )
  mesh.position.set(
      0 , 425 , -1250 )
  scene.add( mesh )

}

function ground( ) {

  geometry = new THREE.PlaneGeometry(
      7250 , 10000 )

  videoGround = document.getElementById( 'videoGround' )
  texture = new THREE.VideoTexture( videoGround )
  texture.minFilter = THREE.LinearFilter
  material = new THREE.MeshLambertMaterial( {
    map : texture
  } )

  mesh = new THREE.Mesh(
      geometry , material )
  mesh.rotation.set(
      -.60001 * Math.PI , 0 , 0 )
  scene.add( mesh )

}

function eye( ) {

  geometry = new THREE.CylinderGeometry(
      25 , 250 , 250 , 4 )

  videoEye = document.getElementById( 'videoEye' )
  texture = new THREE.VideoTexture( videoEye )
  texture.minFilter = THREE.LinearFilter
  material = new THREE.MeshLambertMaterial( {
    map : texture
  } )

  mesh = new THREE.Mesh(
      geometry , material )
  mesh.position.set(
      0 , 200 , -1250 )
  mesh.rotation.set(
      Math.PI , 0 , 0 )
  scene.add( mesh )

}


function postprocessing( ) {

  composer = new THREE.EffectComposer( renderer )
  composer.addPass( new THREE.RenderPass(
      scene , camera ) )

  effect = new THREE.ShaderPass( THREE.TechnicolorShader )
  composer.addPass( effect )
  effect2 = new THREE.FilmPass(
      1 , .01 , 4096 , false  )
  effect2.renderToScreen = true
  composer.addPass( effect2 )

}


function animate( ) {

  mesh.rotation.y = Date.now( ) * .001

  composer.render( )

  requestAnimationFrame( animate )

}
