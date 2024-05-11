import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: [
        'query', 
        // 'info', 
        // 'warn', 
        'error'
    ],
})

// // * DOGGOS
// const fetchAllUser = async () => {
//   const dogs = await prisma.user.findMany({ include: { payments: true } });

//   console.log(dogs);
// };

// const generateUserss = async () => {
//   const dog = await prisma.user.createMany({
//     data: [
//       { name: "Aldo", email: "aldo_hambali@yahoo.com", username: "aldo" },
//       { name: "Budi", email: "budi_santoso@yahoo.com", username: "budi" },
//       { name: "Indah", email: "indah_sari@gmail.com", username: "indah" },
//       { name: "Susi", email: "susi_susanti@hotmail.com", username: "susi" },
//     ],
//   });

//   console.log(dog);
// };

// // * OWNERS
// const fetchAllOwners = async () => {
//   const owners = await prisma.owner.findMany({ include: { dogs: true } });

//   console.log(owners);
// };

// const generateOwners = async () => {
//   const res = await prisma.owner.createMany({
//     data: [
//       { name: "Alice" },
//       { name: "Jhon" },
//       { name: "Ruby" },
//       { name: "Juan" },
//     ],
//   });

//   console.log(res);
// };

// async function main() {
//   await generateOwners();
//   await generateUserss();
//   console.log("Finished :D");
// }

// // prisma.$disconnect()
// // good practice in scripts that only run once
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });