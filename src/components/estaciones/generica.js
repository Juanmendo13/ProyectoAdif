// src/components/estaciones/generica.js
import * as THREE from "three";

export function cargarModelo(edificioGroup, puntoAnclajeTejado, puntoAnclajeLateral) {
  const matMuros = new THREE.MeshStandardMaterial({ color: 0xeae6e1, roughness: 0.6 });
  const matTejado = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.5 });

  const cuerpoGeo = new THREE.BoxGeometry(24, 9, 10);
  const cuerpoMesh = new THREE.Mesh(cuerpoGeo, matMuros);
  cuerpoMesh.position.y = 4.5;
  cuerpoMesh.castShadow = true;
  edificioGroup.add(cuerpoMesh);

  const tejadoGeo = new THREE.ConeGeometry(10, 4, 4);
  const tejadoMesh = new THREE.Mesh(tejadoGeo, matTejado);
  tejadoMesh.position.set(0, 11, 0);
  tejadoMesh.rotation.y = Math.PI / 4;
  tejadoMesh.scale.set(1.5, 1, 1.2);
  tejadoMesh.castShadow = true;
  edificioGroup.add(tejadoMesh);

  puntoAnclajeTejado.set(0, 13, 0);
  puntoAnclajeLateral.set(12, 4.5, 5);
}