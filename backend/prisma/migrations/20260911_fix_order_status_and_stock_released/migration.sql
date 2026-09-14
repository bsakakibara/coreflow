-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDENTE', 'CONCLUIDO', 'CANCELADO');

-- AlterTable
ALTER TABLE "Order"
ADD COLUMN "stockReleased" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Order"
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "status" TYPE "OrderStatus" USING ("status"::"OrderStatus"),
ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
