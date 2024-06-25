const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const listOcupacao = [
  "Lider de Produção",
  "Lider de CQ",
  "Operador de produção",
  "Testador",
  "Dev TI",
  "Operador de logística",
  "Inspetor",
  "Revisor",
];
//.map((item) => item.toUpperCase());

export const listBoot = ["OK", "NOK", "NA"];

export const listBracelete = ["OK", "NOK", "NA"];

export const listStatus = ["ativo", "férias", "inativo"];

export const listRoles = [
  { name: "Full" },
  { name: "Editar" },
  { name: "Deletar" },
  { name: "Criar" },
];
