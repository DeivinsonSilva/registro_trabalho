/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Trabalhador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trabalhador_nome_key" ON "Trabalhador"("nome");
