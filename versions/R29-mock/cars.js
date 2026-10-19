// demo data (Datos de ejemplo): one source for the hall, the sheet and the car page
window.KARATS_CARS = [
  { id:"kia-sportage", still:"284", key:"sportage", brand:"Kia", model:"Sportage", trim:"1.6 T-GDi MHEV GT-Line", year:2022, km:38000, fuel:"Gasolina MHEV", gear:"Automático DCT",
    power:"150 CV", cons:"6,4 l/100 km", label:"ECO", color:"Rojo Infra", doors:5, seats:5, owners:1, price:27900, monthly:389,
    highlights:["Etiqueta ECO", "Un solo propietario", "Garantía 12 meses"],
    equip:["Cámara 360°", "Navegador 12,3\"", "Apple CarPlay / Android Auto", "Faros full LED", "Climatizador bizona", "Asientos calefactados", "Control de crucero adaptativo", "Portón eléctrico"] },
  { id:"bmw-serie-3", still:"213", key:"bmw_2023", brand:"BMW", model:"Serie 3", trim:"320d Sedán", year:2023, km:24000, fuel:"Diésel", gear:"Automático Steptronic",
    power:"190 CV", cons:"4,7 l/100 km", label:"C", color:"Gris Dravit", doors:4, seats:5, owners:1, price:36500, monthly:509,
    highlights:["Libro de mantenimiento BMW", "Un solo propietario", "Garantía 12 meses"],
    equip:["BMW Live Cockpit Professional", "Faros LED adaptativos", "Asistente de aparcamiento", "Volante deportivo M", "Climatizador trizona", "Carga inalámbrica", "Retrovisores abatibles", "Sensores delante y detrás"] },
  { id:"toyota-corolla", still:"142", key:"corolla_e170", brand:"Toyota", model:"Corolla", trim:"125H Active Tech", year:2021, km:45000, fuel:"Híbrido", gear:"Automático e-CVT",
    power:"122 CV", cons:"4,1 l/100 km", label:"ECO", color:"Blanco Puro", doors:4, seats:5, owners:1, price:18900, monthly:265,
    highlights:["Etiqueta ECO", "Revisiones en Toyota", "Garantía 12 meses"],
    equip:["Toyota Safety Sense", "Cámara trasera", "Apple CarPlay / Android Auto", "Faros LED", "Climatizador bizona", "Arranque sin llave", "Control de crucero adaptativo", "Llantas 16\""] },
  { id:"hyundai-ioniq-6", still:"071", key:"ioniq6", brand:"Hyundai", model:"Ioniq 6", trim:"77 kWh Energy", year:2023, km:19000, fuel:"Eléctrico", gear:"Automático",
    power:"229 CV", cons:"14,3 kWh/100 km · 614 km WLTP", label:"0", color:"Gris Gravity", doors:4, seats:5, owners:1, price:34900, monthly:487,
    highlights:["Etiqueta 0 emisiones", "Carga rápida 800 V", "Garantía batería 8 años"],
    equip:["Bomba de calor", "Carga 10→80 % en 18 min", "Pantalla panorámica 12,3\"", "Highway Driving Assist", "Asientos ventilados", "Head-up display", "V2L (enchufe 220 V)", "Faros LED paramétricos"] },
  { id:"vw-golf-8", still:"000", key:"golf8", brand:"Volkswagen", model:"Golf 8", trim:"1.5 TSI Life", year:2021, km:52000, fuel:"Gasolina", gear:"Manual 6 vel.",
    power:"130 CV", cons:"5,5 l/100 km", label:"C", color:"Azul Atlántico", doors:5, seats:5, owners:2, price:21400, monthly:299,
    highlights:["Libro de mantenimiento VW", "ITV recién pasada", "Garantía 12 meses"],
    equip:["Digital Cockpit", "Navegador Discover", "App-Connect inalámbrico", "Faros LED", "Climatizador bizona", "Lane Assist", "Front Assist", "Sensores de aparcamiento"] },
];
window.KARATS_SHOTS = [
  ["01_front34", "Tres cuartos delantero"], ["02_front", "Frontal"], ["03_side", "Lateral"], ["04_rear34", "Tres cuartos trasero"],
  ["05_rear", "Trasera"], ["06_front34l", "Tres cuartos izquierdo"], ["07_high", "Vista superior"], ["10_low", "Ángulo bajo"],
  ["08_wheel", "Llanta"], ["09_lamp", "Faro"], ["12_tail", "Piloto trasero"],
];
window.fmtEUR = n => n.toLocaleString("es-ES").replace(/\./g, " ") + " €";
window.fmtKM = n => n.toLocaleString("es-ES").replace(/\./g, " ") + " km";
