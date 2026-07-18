// src/components/estaciones/los-rosales.js
import * as THREE from "three";

export function cargarModelo(edificioGroup, puntoAnclajeTejado, puntoAnclajeLateral) {
  // Paleta de colores ajustada a las fotos reales
  const matBlancoOcre = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 }); 
  const matLadrilloMZA = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85 }); 
  const matTejaVieja = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });  
  const matMarquesina = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 });  
  const matCarpinteria = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 }); 

  // FUNCIÓN AUXILIAR COJONUDA: Crea un tejado a 2 aguas perfecto usando Extrusión
  const crearTejadoLimpio = (largo, ancho, alto) => {
    const shape = new THREE.Shape();
    // Dibujamos el perfil triangular (visto de lado en el plano Z/Y)
    shape.moveTo(-ancho / 2, 0);          // Esquina trasera
    shape.lineTo(0, alto);                 // Cumbrera (punto más alto)
    shape.lineTo(ancho / 2, 0);           // Esquina delantera
    shape.lineTo(-ancho / 2, 0);          // Cerrar triángulo

    const settings = {
      steps: 1,
      depth: largo,                        // Longitud de la estación (Eje X)
      bevelEnabled: false
    };

    const geo = new THREE.ExtrudeGeometry(shape, settings);
    // Centramos la geometría para que el pivote quede en medio del tejado
    geo.center(); 
    return geo;
  };

  // =========================================================================
  // 1. CUERPO CENTRAL (Edificio Principal de 2 Plantas)
  // =========================================================================
  const centroGeo = new THREE.BoxGeometry(18, 11, 12);
  const centroMesh = new THREE.Mesh(centroGeo, matBlancoOcre);
  centroMesh.position.set(0, 5.5, 0);
  centroMesh.castShadow = true;
  centroMesh.receiveShadow = true;
  edificioGroup.add(centroMesh);

  // Remate superior de ladrillo
  const remateGeo = new THREE.BoxGeometry(18.4, 1.8, 12.2);
  const remateMesh = new THREE.Mesh(remateGeo, matLadrilloMZA);
  remateMesh.position.set(0, 11.9, 0);
  edificioGroup.add(remateMesh);

  // Copete triangular de la fachada
  const copeteGeo = new THREE.ConeGeometry(3, 1.5, 4);
  const copeteMesh = new THREE.Mesh(copeteGeo, matLadrilloMZA);
  copeteMesh.position.set(0, 13.2, 5.9); 
  copeteMesh.rotation.y = Math.PI / 4; 
  copeteMesh.scale.set(1.5, 1, 0.1); 
  edificioGroup.add(copeteMesh);


  // =========================================================================
  // 2. ALA IZQUIERDA (Súper alargada de una planta)
  // =========================================================================
  const alaIzqGeo = new THREE.BoxGeometry(32, 6, 11);
  const alaIzqMesh = new THREE.Mesh(alaIzqGeo, matBlancoOcre);
  alaIzqMesh.position.set(-25, 3, -0.5); 
  alaIzqMesh.castShadow = true;
  alaIzqMesh.receiveShadow = true;
  edificioGroup.add(alaIzqMesh);

  // Tejado extruido perfecto ala izquierda
  const tejadoIzqGeo = crearTejadoLimpio(32, 11, 2.2);
  const tejadoIzqMesh = new THREE.Mesh(tejadoIzqGeo, matTejaVieja);
  // Al extruir, el perfil se genera en el plano XY, así que rotamos en Y para alinearlo con las vías
  tejadoIzqMesh.rotation.y = Math.PI / 2;
  tejadoIzqMesh.position.set(-25, 7.1, -0.5);
  tejadoIzqMesh.castShadow = true;
  edificioGroup.add(tejadoIzqMesh);


  // =========================================================================
  // 3. ALA DERECHA Y MÓDULOS ANEXOS
  // =========================================================================
  const alaDerGeo = new THREE.BoxGeometry(16, 6, 11);
  const alaDerMesh = new THREE.Mesh(alaDerGeo, matBlancoOcre);
  alaDerMesh.position.set(17, 3, -0.5);
  alaDerMesh.castShadow = true;
  edificioGroup.add(alaDerMesh);

  // Tejado extruido perfecto ala derecha
  const tejadoDerGeo = crearTejadoLimpio(16, 11, 2.2);
  const tejadoDerMesh = new THREE.Mesh(tejadoDerGeo, matTejaVieja);
  tejadoDerMesh.rotation.y = Math.PI / 2;
  tejadoDerMesh.position.set(17, 7.1, -0.5);
  tejadoDerMesh.castShadow = true;
  edificioGroup.add(tejadoDerMesh);

  // Módulo exento / Almacén aislado derecho
  const almacenGeo = new THREE.BoxGeometry(10, 5, 9);
  const almacenMesh = new THREE.Mesh(almacenGeo, matBlancoOcre);
  almacenMesh.position.set(34, 2.5, -1.5); 
  almacenMesh.castShadow = true;
  
  const tejadoAlmacenGeo = crearTejadoLimpio(10, 9, 1.8);
  const tejadoAlmacenMesh = new THREE.Mesh(tejadoAlmacenGeo, matTejaVieja);
  tejadoAlmacenMesh.rotation.y = Math.PI / 2;
  tejadoAlmacenMesh.position.set(34, 5.9, -1.5);
  edificioGroup.add(almacenMesh, tejadoAlmacenMesh);


  // =========================================================================
  // 4. ELEMENTOS INTEGRADOS (Marquesina del andén principal)
  // =========================================================================
  const porcheGeo = new THREE.BoxGeometry(26, 0.4, 4);
  const porcheMesh = new THREE.Mesh(porcheGeo, matMarquesina);
  porcheMesh.position.set(-2, 5, 7.5); 
  porcheMesh.castShadow = true;
  edificioGroup.add(porcheMesh);

  // Columnas finas del porche
  const colGeo = new THREE.CylinderGeometry(0.15, 0.15, 5);
  const colMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
  
  for (let i = 0; i < 4; i++) {
    const col = new THREE.Mesh(colGeo, colMat);
    col.position.set(-13 + (i * 7.5), 2.5, 9.3);
    col.castShadow = true;
    edificioGroup.add(col);
  }

  // =========================================================================
  // ANCLAJES DE LÍNEAS GUÍA
  // =========================================================================
  puntoAnclajeTejado.set(0, 12.5, 0);       
  puntoAnclajeLateral.set(-15, 4.5, 5.2);  
}