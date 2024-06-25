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
  { name: "Lider de Produção" },
  { name: "Lider de CQ" },
  { name: "Operador de produção" },
  { name: "Testador" },
  { name: "Dev TI" },
  { name: "Operador de logística" },
  { name: "Inspetor" },
  { name: "Revisor" },
];
//.map((item) => item.toUpperCase());

export const listBoot = [{ name: "OK" }, { name: "NOK" }, { name: "NA" }];

export const listBracelete = [{ name: "OK" }, { name: "NOK" }, { name: "NA" }];

export const listStatus = [
  { name: "ativo" },
  { name: "férias" },
  { name: "inativo" },
];

export const listRoles = [
  { name: "Full" },
  { name: "Editar" },
  { name: "Deletar" },
  { name: "Criar" },
];
