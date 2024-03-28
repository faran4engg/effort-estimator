import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 10 });

export const getUUID = uid.randomUUID;
// export const getUUID = (): string => {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
//     const piece = (Math.random() * 16) | 0;
//     const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
//     return elem.toString(16);
//   });
// };
