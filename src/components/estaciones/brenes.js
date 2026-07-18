// src/components/estaciones/brenes.js
import * as THREE from "three";

export function cargarModelo(edificioGroup, puntoAnclajeTejado, puntoAnclajeLateral) {
  // Paleta de colores
  const matBlancoCal = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
  const matAlbero = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.6 });
  const matCarpinteria = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.5 });
  const matTeja = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.7 });

  // Cuerpo principal
  const cuerpoGeo = new THREE.BoxGeometry(40, 9, 12);
  const cuerpoMesh = new THREE.Mesh(cuerpoGeo, matBlancoCal);
  cuerpoMesh.position.set(0, 4.5, 0);
  cuerpoMesh.castShadow = true;
  cuerpoMesh.receiveShadow = true;
  edificioGroup.add(cuerpoMesh);

  // Zócalo
  const zocaloGeo = new THREE.BoxGeometry(40.2, 1.2, 12.2);
  const zocaloMesh = new THREE.Mesh(zocaloGeo, matAlbero);
  zocaloMesh.position.set(0, 0.6, 0);
  edificioGroup.add(zocaloMesh);

  // Cornisa
  const cornisaGeo = new THREE.BoxGeometry(41, 0.6, 13);
  const cornisaMesh = new THREE.Mesh(cornisaGeo, matAlbero);
  cornisaMesh.position.set(0, 9, 0);
  edificioGroup.add(cornisaMesh);

  // Tejado
  const tejadoGeo = new THREE.ConeGeometry(11, 4, 4);
  const tejadoMesh = new THREE.Mesh(tejadoGeo, matTeja);
  tejadoMesh.position.set(0, 11, 0);
  tejadoMesh.rotation.y = Math.PI / 4;
  tejadoMesh.scale.set(2.6, 1, 1.3);
  tejadoMesh.castShadow = true;
  edificioGroup.add(tejadoMesh);

  // Puertas
  const puertaGeo = new THREE.BoxGeometry(2.5, 5, 0.2);
  const p1 = new THREE.Mesh(puertaGeo, matCarpinteria);
  p1.position.set(-12, 3.7, 6);
  const p2 = new THREE.Mesh(puertaGeo, matCarpinteria);
  p2.position.set(-4, 3.7, 6);
  edificioGroup.add(p1, p2);

  // Actualizar posiciones de las líneas técnicas flotantes
  puntoAnclajeTejado.set(0, 13, 0);
  puntoAnclajeLateral.set(-4, 3.7, 6.1);
}