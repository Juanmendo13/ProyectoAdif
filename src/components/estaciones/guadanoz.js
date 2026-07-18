// src/components/estaciones/generica.js
import * as THREE from "three";

export function cargarModelo(edificioGroup, puntoAnclajeTejado, puntoAnclajeLateral) {
  // -------------------------------------------------------------------------
  // MATERIALES ESTÁNDAR PARA MODELOS GENÉRICOS
  // -------------------------------------------------------------------------
  const matFachada = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 }); // Gris claro limpio
  const matZocalo = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });  // Gris oscuro
  const matTejado = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.5 });  // Tejado rojo regular
  const matVanos = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });   // Puertas/Cristales oscuros
  const matMarcos = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });  // Marcos técnicos

  // -------------------------------------------------------------------------
  // 1. CUERPO PRINCIPAL Y CIMENTACIÓN
  // -------------------------------------------------------------------------
  // Bloque base
  const cuerpoGeo = new THREE.BoxGeometry(20, 5, 8);
  const cuerpoMesh = new THREE.Mesh(cuerpoGeo, matFachada);
  cuerpoMesh.position.set(0, 2.5, 0);
  cuerpoMesh.castShadow = true;
  cuerpoMesh.receiveShadow = true;
  edificioGroup.add(cuerpoMesh);

  // Zócalo inferior para asentar el edificio
  const zocaloGeo = new THREE.BoxGeometry(20.2, 0.4, 8.2);
  const zocaloMesh = new THREE.Mesh(zocaloGeo, matZocalo);
  zocaloMesh.position.set(0, 0.2, 0);
  edificioGroup.add(zocaloMesh);

  // -------------------------------------------------------------------------
  // 2. CUBIERTA / TEJADO A DOS AGUAS CORRECTO (Sin rotaciones raras)
  // -------------------------------------------------------------------------
  // Usamos una extrusión prismática triangular para simular un tejado a dos aguas real
  const shapeTejado = new THREE.Shape();
  shapeTejado.moveTo(-10.2, 0);
  shapeTejado.lineTo(0, 2);
  shapeTejado.lineTo(10.2, 0);
  shapeTejado.lineTo(-10.2, 0);

  const settingsExtrusion = {
    steps: 1,
    depth: 8.4,
    bevelEnabled: false
  };

  const tejadoGeo = new THREE.ExtrudeGeometry(shapeTejado, settingsExtrusion);
  const tejadoMesh = new THREE.Mesh(tejadoGeo, matTejado);
  // Centramos la geometría extruida sobre el bloque
  tejadoMesh.position.set(0, 5, -4.2);
  tejadoMesh.castShadow = true;
  edificioGroup.add(tejadoMesh);

  // -------------------------------------------------------------------------
  // 3. DETALLES DE LA FACHADA: PUERTAS Y VENTANAS
  // -------------------------------------------------------------------------
  // Puerta de entrada central
  const puertaGeo = new THREE.BoxGeometry(2.2, 3.2, 0.1);
  const puertaMesh = new THREE.Mesh(puertaGeo, matVanos);
  puertaMesh.position.set(0, 1.6, 4.01); // Justo en la cara frontal
  
  const marcoPuertaGeo = new THREE.BoxGeometry(2.4, 3.3, 0.15);
  const marcoPuertaMesh = new THREE.Mesh(marcoPuertaGeo, matMarcos);
  marcoPuertaMesh.position.set(0, 1.65, 4.0);
  edificioGroup.add(puertaMesh, marcoPuertaMesh);

  // Ventanas laterales simétricas (2 a cada lado)
  const posicionesX = [-6, -3, 3, 6];
  posicionesX.forEach((posX) => {
    // Cristal
    const ventanaGeo = new THREE.BoxGeometry(1.6, 1.8, 0.1);
    const ventanaMesh = new THREE.Mesh(ventanaGeo, matVanos);
    ventanaMesh.position.set(posX, 2.8, 4.01);

    // Marco
    const marcoVentanaGeo = new THREE.BoxGeometry(1.8, 2.0, 0.15);
    const marcoVentanaMesh = new THREE.Mesh(marcoVentanaGeo, matMarcos);
    marcoVentanaMesh.position.set(posX, 2.8, 4.0);

    edificioGroup.add(ventanaMesh, marcoVentanaMesh);
  });

  // -------------------------------------------------------------------------
  // RECALCULAR PUNTOS DE ANCLAJE PARA LA INTERFAZ
  // -------------------------------------------------------------------------
  puntoAnclajeTejado.set(0, 7.1, 0);       // Justo en la cumbrera del tejado
  puntoAnclajeLateral.set(6, 2.5, 4.0);    // En el lado derecho de la fachada
}