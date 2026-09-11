import bcrypt from "bcrypt";
import { prisma } from "../database/prisma";

async function main() {
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
        throw new Error("ADMIN_PASSWORD não foi definida.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: {
            email: "admin@coreflow.com"
        },
        update: {
            name: "Administrador",
            password: hashedPassword,
            role: "ADMIN"
        },
        create: {
            name: "Administrador",
            email: "admin@coreflow.com",
            password: hashedPassword,
            role: "ADMIN"
        }
    });

    console.log(`Administrador preparado: ${admin.email}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
