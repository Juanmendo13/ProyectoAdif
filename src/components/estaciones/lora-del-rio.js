// src/components/estaciones/lora-del-rio.js
import * as THREE from "three";

export function cargarModelo(edificioGroup, puntoAnclajeTejado, puntoAnclajeLateral) {
  // -------------------------------------------------------------------------
  // MATERIALES MEJORADOS (Colores realistas basados en las fotos)
  // -------------------------------------------------------------------------
  const matFachadaGris = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 }); // Gris claro enfoscado limpio
  const matZocaloGris = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });  // Base inferior gris piedra
  const matMarcosRojos = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.4 }); // Rojo Adif oscuro para carpintería/ventanas
  const matTejadoRojo = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.6 });  // Tejado central cerámico
  const matTejadoPlano = new THREE.MeshStandardMaterial({ color: 0xcbdec9, roughness: 0.8 }); // Cubiertas planas laterales claras
  const matCristalera = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.85 }); // Puertas acristaladas azuladas
  const matEstructuraPorche = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, metalness: 0.6 }); // Aluminio oscuro

  // -------------------------------------------------------------------------
  // AUXILIARES: ELEMENTOS REPETITIVOS REFINADOS
  // -------------------------------------------------------------------------
  const crearOjoDeBueyRealista = () => {
    const grupoVentana = new THREE.Group();
    // Marco exterior rojo
    const geoMarco = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 24);
    geoMarco.rotateX(Math.PI / 2);
    const meshMarco = new THREE.Mesh(geoMarco, matMarcosRojos);
    meshMarco.castShadow = true;
    grupoVentana.add(meshMarco);
    // Cristal interior
    const geoCristal = new THREE.CylinderGeometry(0.42, 0.42, 0.28, 24);
    geoCristal.rotateX(Math.PI / 2);
    const meshCristal = new THREE.Mesh(geoCristal, matCristalera);
    grupoVentana.add(meshCristal);
    return grupoVentana;
  };

  const crearVentanaRectangular = (ancho, alto) => {
    const grupoVentana = new THREE.Group();
    const geoMarco = new THREE.BoxGeometry(ancho, alto, 0.2);
    const meshMarco = new THREE.Mesh(geoMarco, matMarcosRojos);
    grupoVentana.add(meshMarco);
    const geoCristal = new THREE.BoxGeometry(ancho - 0.2, alto - 0.2, 0.25);
    const meshCristal = new THREE.Mesh(geoCristal, matCristalera);
    grupoVentana.add(meshCristal);
    return grupoVentana;
  };

  // Zócalo inferior estético que recorre todo el suelo para asentar el edificio
  const zocaloGeo = new THREE.BoxGeometry(70, 0.4, 11);
  const zocaloMesh = new THREE.Mesh(zocaloGeo, matZocaloGris);
  zocaloMesh.position.set(-6, 0.2, -0.2);
  zocaloMesh.receiveShadow = true;
  edificioGroup.add(zocaloMesh);

  // -------------------------------------------------------------------------
  // 1. CUERPO CENTRAL (Simétrico, con tejado a dos aguas integrado)
  // -------------------------------------------------------------------------
  const centroGeo = new THREE.BoxGeometry(15, 6.0, 9.6);
  const centroMesh = new THREE.Mesh(centroGeo, matFachadaGris);
  centroMesh.position.set(0, 3.4, 0); // Elevado sobre el zócalo
  centroMesh.castShadow = true;
  centroMesh.receiveShadow = true;
  edificioGroup.add(centroMesh);

  // El frontón del vestíbulo sobresale un poco por arriba en la fachada
  const frontonGeo = new THREE.BoxGeometry(8, 0.8, 9.8);
  const frontonMesh = new THREE.Mesh(frontonGeo, matFachadaGris);
  frontonMesh.position.set(0, 6.8, 0);
  frontonMesh.castShadow = true;
  edificioGroup.add(frontonMesh);

  // Tejado a dos aguas real sobre el bloque central (visto en Google Earth)
  const tejadoCentralGeo = new THREE.ConeGeometry(8.5, 2.2, 4);
  const tejadoCentralMesh = new THREE.Mesh(tejadoCentralGeo, matTejadoRojo);
  tejadoCentralMesh.position.set(0, 7.5, 0);
  tejadoCentralMesh.rotation.y = Math.PI / 4; // Cuadrado rotado para simular dos aguas limpias
  tejadoCentralMesh.scale.set(1.3, 1, 1.1);
  tejadoCentralMesh.castShadow = true;
  edificioGroup.add(tejadoCentralMesh);

  // El semicilindro de la entrada ya no corta la marquesina: es el murete técnico superior de la entrada
  const mureteCurvoGeo = new THREE.CylinderGeometry(3.5, 3.5, 6.0, 24, 1, false, 0, Math.PI);
  const mureteCurvoMesh = new THREE.Mesh(mureteCurvoGeo, matFachadaGris);
  mureteCurvoMesh.position.set(0, 3.4, 4.8); // Perfectamente alineado al frente
  mureteCurvoMesh.castShadow = true;
  edificioGroup.add(mureteCurvoMesh);

  // Soportal/Porche de entrada acristalado con estructura metálica limpia
  const soportalGeo = new THREE.BoxGeometry(5.5, 4.2, 2.5);
  const soportalMesh = new THREE.Mesh(soportalGeo, matCristalera);
  soportalMesh.position.set(0, 2.5, 6.0);
  edificioGroup.add(soportalMesh);

  const marquesinaEntradaGeo = new THREE.BoxGeometry(6.0, 0.25, 3.0);
  const marquesinaEntradaMesh = new THREE.Mesh(marquesinaEntradaGeo, matEstructuraPorche);
  marquesinaEntradaMesh.position.set(0, 4.6, 6.2);
  marquesinaEntradaMesh.castShadow = true;
  edificioGroup.add(marquesinaEntradaMesh);


  // -------------------------------------------------------------------------
  // 2. ALAS LATERALES SIMÉTRICAS (Con sus muescas y alturas correctas)
  // -------------------------------------------------------------------------
  // Ala Izquierda
  const alaIzqGeo = new THREE.BoxGeometry(18, 5.0, 8.4);
  const alaIzqMesh = new THREE.Mesh(alaIzqGeo, matFachadaGris);
  alaIzqMesh.position.set(-16.5, 2.9, -0.6);
  alaIzqMesh.castShadow = true;
  alaIzqMesh.receiveShadow = true;
  edificioGroup.add(alaIzqMesh);

  const techoPlanoIzqGeo = new THREE.BoxGeometry(18.2, 0.2, 8.6);
  const techoPlanoIzqMesh = new THREE.Mesh(techoPlanoIzqGeo, matTejadoPlano);
  techoPlanoIzqMesh.position.set(-16.5, 5.5, -0.6);
  edificioGroup.add(techoPlanoIzqMesh);

  // Ala Derecha (Ligeramente más larga según la vista de planta)
  const alaDerGeo = new THREE.BoxGeometry(22, 5.0, 8.4);
  const alaDerMesh = new THREE.Mesh(alaDerGeo, matFachadaGris);
  alaDerMesh.position.set(18.5, 2.9, -0.6);
  alaDerMesh.castShadow = true;
  alaDerMesh.receiveShadow = true;
  edificioGroup.add(alaDerMesh);

  const techoPlanoDerGeo = new THREE.BoxGeometry(22.2, 0.2, 8.6);
  const techoPlanoDerMesh = new THREE.Mesh(techoPlanoDerGeo, matTejadoPlano);
  techoPlanoDerMesh.position.set(18.5, 5.5, -0.6);
  edificioGroup.add(techoPlanoDerMesh);

  // Inyección de Ojos de buey hiperrealistas (Borde rojo + Cristal)
  const ojo1 = crearOjoDeBueyRealista(); ojo1.position.set(-22.5, 3.2, 3.7);
  const ojo2 = crearOjoDeBueyRealista(); ojo2.position.set(-11.0, 3.2, 3.7);
  const ojo3 = crearOjoDeBueyRealista(); ojo3.position.set(11.0, 3.2, 3.7);
  const ojo4 = crearOjoDeBueyRealista(); ojo4.position.set(25.5, 3.2, 3.7);
  edificioGroup.add(ojo1, ojo2, ojo3, ojo4);

  // Añadimos rejillas/ventanas cuadradas corporativas rojas entre las secciones
  const v1 = crearVentanaRectangular(1.8, 2.8); v1.position.set(-4.5, 3.0, 4.6);
  const v2 = crearVentanaRectangular(1.8, 2.8); v2.position.set(4.5, 3.0, 4.6);
  edificioGroup.add(v1, v2);


  // -------------------------------------------------------------------------
  // 3. CAFETERÍA ANEXA (Diseño de marquesina integrada a la izquierda)
  // -------------------------------------------------------------------------
  const cafeGeo = new THREE.BoxGeometry(11, 4.4, 8.4);
  const cafeMesh = new THREE.Mesh(cafeGeo, matFachadaGris);
  cafeMesh.position.set(-31, 2.6, -0.6);
  cafeMesh.castShadow = true;
  edificioGroup.add(cafeMesh);

  // Porche/Marquesina técnica de la cafetería
  const porcheCafeGeo = new THREE.BoxGeometry(15, 0.2, 8.4);
  const porcheCafeMesh = new THREE.Mesh(porcheCafeGeo, matEstructuraPorche);
  porcheCafeMesh.position.set(-44, 4.7, -0.6);
  porcheCafeMesh.castShadow = true;
  edificioGroup.add(porcheCafeMesh);
  
  // Columnas cilíndricas delgadas de soporte (Estructura real metálica)
  const colGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.4, 12);
  for (let i = 0; i < 4; i++) {
    const col = new THREE.Mesh(colGeo, matEstructuraPorche);
    col.position.set(-38 - (i * 4.2), 2.2, 3.4);
    col.castShadow = true;
    edificioGroup.add(col);
  }

  // -------------------------------------------------------------------------
  // ANCLAJES DE LÍNEAS GUÍA RECALCULADOS PARA EL REFINAMIENTO DE ALTURAS
  // -------------------------------------------------------------------------
  puntoAnclajeTejado.set(0, 8.8, 0);         // Justo en la coronación del tejado a dos aguas nuevo
  puntoAnclajeLateral.set(18.5, 5.6, 3.6);   // Apuntando sutilmente sobre el ala derecha reformada
}