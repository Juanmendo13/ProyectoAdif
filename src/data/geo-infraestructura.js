// src/data/geo-infraestructura.js

export const CONFIG_MAPAS = {
  "PE-17": {
    "El Priorato":                                    { x: 85, y: 10 },
    "Lora del Río":                                   { x: 78, y: 16 },
    "Guadañoz":                                       { x: 71, y: 22 },
    "Los Rosales":                                    { x: 64, y: 28 },
    "Brenes":                                         { x: 57, y: 34 },
    "Majarabique":                                    { x: 50, y: 40 },
    "Apd. S. Jerónimo - Apd. Estadio - Apd. Cartuja": { x: 38, y: 52 },
    "Triángulo Tamarguillo":                          { x: 50, y: 52 },
    "C.T.T. Sevilla":                                 { x: 44, y: 64 },
    "Sevilla Santa Justa":                            { x: 38, y: 74 },
    "La Negrilla":                                    { x: 58, y: 68 }
  },
  "PE-24": {
    "Sevilla Santa Justa":      { x: 50, y: 8 },
    "La Salud":                 { x: 50, y: 16 },
    "Dos Hermanas":             { x: 50, y: 24 },
    "Utrera":                   { x: 50, y: 32 },
    "Las Alcantarillas":        { x: 46, y: 38 },
    "Las Cabezas":              { x: 42, y: 44 },
    "Lebrija":                  { x: 38, y: 50 },
    "Aeropuerto de Jerez":      { x: 34, y: 56 },
    "Jerez-Mercancías":         { x: 30, y: 62 },
    "Jerez de la Frontera":     { x: 26, y: 68 },
    "El Puerto de Santa María": { x: 26, y: 76 },
    "Las Aletas":               { x: 26, y: 82 },
    "Puerto Real":              { x: 26, y: 88 },
    "San Fernando-Bahía Sur":   { x: 18, y: 92 },
    "Cortadura":                { x: 12, y: 84 },
    "Cádiz":                    { x: 12, y: 74 }
  },
  "PE-26": {
    "Majarabique":                                    { x: 92, y: 25 },
    "Alamillo":                                       { x: 84, y: 27 },
    "Apd. S. Jerónimo-Apd. Estadio-Apd. Cartuja":     { x: 88, y: 39 },
    "Valencina-Santiponce":                           { x: 76, y: 29 },
    "Salteras":                                       { x: 69, y: 33 },
    "Villanueva-Olivares":                            { x: 62, y: 36 },
    "Benacazón":                                      { x: 55, y: 40 },
    "Aznalcázar-Pilas":                               { x: 48, y: 44 },
    "Huévar":                                         { x: 42, y: 47 },
    "Carrión de los Céspedes":                        { x: 36, y: 49 },
    "Escacena":                                       { x: 30, y: 51 },
    "Villalba":                                       { x: 24, y: 53 },
    "La Palma del Condado":                           { x: 19, y: 56 },
    "Niebla":                                         { x: 14, y: 60 },
    "San Juan del Puerto":                            { x: 10, y: 66 },
    "Huelva Mercancías":                              { x: 8, y: 73 },
    "Huelva":                                         { x: 8, y: 84 }
  }
};

export const TRAMOS_VIAS = {
  "pe-17": [
    ["El Priorato", "Lora del Río", "Guadañoz", "Los Rosales", "Brenes", "Majarabique"],
    ["Majarabique", "Apd. S. Jerónimo - Apd. Estadio - Apd. Cartuja"],
    ["Majarabique", "Triángulo Tamarguillo"],
    ["Triángulo Tamarguillo", "C.T.T. Sevilla", "Sevilla Santa Justa"],
    ["Triángulo Tamarguillo", "La Negrilla"]
  ],
  "pe-24": [
    ["Sevilla Santa Justa", "La Salud", "Dos Hermanas", "Utrera", "Las Alcantarillas", "Las Cabezas", "Lebrija", "Aeropuerto de Jerez", "Jerez-Mercancías", "Jerez de la Frontera", "El Puerto de Santa María", "Las Aletas", "Puerto Real", "San Fernando-Bahía Sur", "Cortadura", "Cádiz"]
  ],
  "pe-26": [
    ["Majarabique", "Alamillo", "Valencina-Santiponce", "Salteras", "Villanueva-Olivares", "Benacazón", "Aznalcázar-Pilas", "Huévar", "Carrión de los Céspedes", "Escacena", "Villalba", "La Palma del Condado", "Niebla", "San Juan del Puerto", "Huelva Mercancías", "Huelva"],
    ["Alamillo", "Apd. S. Jerónimo-Apd. Estadio-Apd. Cartuja"]
  ]
};