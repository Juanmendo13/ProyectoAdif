// src/components/estaciones/majarabique.js
import * as THREE from "three";

export function cargarModelo(edificioGroup, puntoAnclajeTejado, puntoAnclajeLateral) {
  // -------------------------------------------------------------------------
  // PALETA DE COLORES INDUSTRIALES (Ladrillo visto, metales y hormigón)
  // -------------------------------------------------------------------------
  const matLadrilloRojo = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 }); // Ladrillo visto técnico
  const matHormigonCubierta = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 }); // Cubiertas planas grises
  const matBarandillaBlanca = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 }); // Barandillas perimetrales de seguridad
  const matPortonTecnico = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.4 }); // Portones de lamas metálicas oscuras
  const matCartelBlanco = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }); // Panel Adif de la torre
  const matDetallesGris = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 }); // Marcos y pilastras

  // -------------------------------------------------------------------------
  // 1. BLOQUE PRINCIPAL BAJO (Sala de equipos técnicos)
  // -------------------------------------------------------------------------
  const baseGeo = new THREE.BoxGeometry(32, 5.2, 10);
  const baseMesh = new THREE.Mesh(baseGeo, matLadrilloRojo);
  baseMesh.position.set(0, 2.6, 0);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  edificioGroup.add(baseMesh);

  // Remate perimetral de hormigón superior (Cejilla blanca/gris que corona el bloque)
  const cornisaGeo = new THREE.BoxGeometry(32.4, 0.3, 10.4);
  const cornisaMesh = new THREE.Mesh(cornisaGeo, matHormigonCubierta);
  cornisaMesh.position.set(0, 5.35, 0);
  edificioGroup.add(cornisaMesh);

  // -------------------------------------------------------------------------
  // 2. TORRE TÉCNICA ASIMÉTRICA (El elemento más característico)
  // -------------------------------------------------------------------------
  // La torre sobresale rompiendo la simetría del bloque principal hacia un lado
  const torreGeo = new THREE.BoxGeometry(8, 10.5, 9.6);
  const torreMesh = new THREE.Mesh(torreGeo, matLadrilloRojo);
  torreMesh.position.set(6, 5.25, -0.1); // Desplazada y asentada desde el suelo técnico
  torreMesh.castShadow = true;
  edificioGroup.add(torreMesh);

  // Coronación superior de la torre con su plataforma transitable
  const cornisaTorreGeo = new THREE.BoxGeometry(8.4, 0.3, 10);
  const cornisaTorreMesh = new THREE.Mesh(cornisaTorreGeo, matHormigonCubierta);
  cornisaTorreMesh.position.set(6, 10.65, -0.1);
  edificioGroup.add(cornisaTorreMesh);

  // El gran cartel blanco corporativo del puesto técnico en la zona alta de la torre
  const cartelGeo = new THREE.BoxGeometry(5.5, 3.2, 0.2);
  const cartelMesh = new THREE.Mesh(cartelGeo, matCartelBlanco);
  cartelMesh.position.set(6, 8.5, 4.81); // Orientado al frente de vías
  edificioGroup.add(cartelMesh);

  // -------------------------------------------------------------------------
  // 3. PUERTAS TÉCNICAS Y REJILLAS DE VENTILACIÓN (Portones de lamas)
  // -------------------------------------------------------------------------
  // Gran portón técnico cuádruple de la fachada delantera
  const portonGeo = new THREE.BoxGeometry(12, 3.4, 0.15);
  const portonMesh = new THREE.Mesh(portonGeo, matPortonTecnico);
  portonMesh.position.set(-6, 1.7, 5.01);
  edificioGroup.add(portonMesh);

  // Divisiones estructurales del portón
  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue;
    const divisionGeo = new THREE.BoxGeometry(0.15, 3.4, 0.2);
    const divisionMesh = new THREE.Mesh(divisionGeo, matDetallesGris);
    divisionMesh.position.set(-6 + (i * 3), 1.7, 5.02);
    edificioGroup.add(divisionMesh);
  }

  // -------------------------------------------------------------------------
  // 4. BARANDILLAS METÁLICAS DE SEGURIDAD (Estructuras de tubos blancos)
  // -------------------------------------------------------------------------
  const crearBarandilla = (ancho, alto) => {
    const grupoBarandilla = new THREE.Group();
    // Pasamanos superior
    const barraSupGeo = new THREE.BoxGeometry(ancho, 0.06, 0.06);
    const barraSup = new THREE.Mesh(barraSupGeo, matBarandillaBlanca);
    barraSup.position.y = alto;
    grupoBarandilla.add(barraSup);

    // Montantes verticales (Postes)
    const numPostes = Math.max(2, Math.floor(ancho / 2));
    const posteGeo = new THREE.CylinderGeometry(0.03, 0.03, alto, 8);
    for (let i = 0; i < numPostes; i++) {
      const poste = new THREE.Mesh(posteGeo, matBarandillaBlanca);
      poste.position.set(-ancho / 2 + (i * (ancho / (numPostes - 1))), alto / 2, 0);
      grupoBarandilla.add(poste);
    }
    return grupoBarandilla;
  };

  // Barandilla sobre la azotea transitable del bloque bajo (Lado izquierdo)
  const barandillaTecho = crearBarandilla(11, 1.1);
  barandillaTecho.position.set(-10, 5.5, 4.8);
  edificioGroup.add(barandillaTecho);

  // Barandilla perimetral de la torre de telecomunicaciones alta
  const barandillaTorreFrente = crearBarandilla(7.6, 1.1);
  barandillaTorreFrente.position.set(6, 10.8, 4.6);
  edificioGroup.add(barandillaTorreFrente);

  // -------------------------------------------------------------------------
  // ANCLAJES TÉCNICOS PARA LÍNEAS GUÍA (Sincronizados con el perfil industrial)
  // -------------------------------------------------------------------------
  puntoAnclajeTejado.set(6, 11.0, 0);        // Apunta directamente a la coronación de la torre técnica
  puntoAnclajeLateral.set(-6, 3.4, 5.1);     // Apunta al gran portón de lamas de los sistemas de ventilación
}