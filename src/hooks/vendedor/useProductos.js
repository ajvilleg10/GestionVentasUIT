// import { useState, useEffect } from 'react';
// import axios from 'utils/axios';

// const useProductos = () => {

//   const [planes, setPlanes] = useState([]);
//   const [anexos, setAnexos] = useState([]);

//   const fetchProductos = async () => {
//     try {

//       setPlanes([
//         {
//           nombre: "producto 1",
//           id: 1,
//           monto: 15
//         },
//         {
//           nombre: "producto 2",
//           id: 2,
//           monto: 30
//         },
//         {
//           nombre: "producto 3",
//           id: 3,
//           monto: 40
//         }
//       ]);

//       setAnexos([
//         {
//           nombre: "anexo 1",
//           id: 1,
//           monto: 5.00,
//         },
//         {
//           nombre: "anexo 2",
//           id: 2,
//           monto: 4.00,
//         },
//         {
//           nombre: "anexo 3",
//           id: 3,
//           monto: 6.00,
//         }
//       ]);

//       console.log('Obtener productos');

//     } catch (e) {
//       console.error('Error al obtener los productos', e);
//     }
//   }

//   useEffect(() => {
//     fetchProductos();
//   }, []);

//   return { planes, anexos };
// };

// export default useProductos;
