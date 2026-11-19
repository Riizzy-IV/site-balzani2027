// Quantidade de clientes por estado — aparece no card ao passar o mouse / tocar no estado do mapa.
// Só os estados listados aqui respondem ao hover. Chave = sigla (ver src/data/mapaBrasil.js).
// O card mostra "+ de N clientes" (sem nomes de clientes).
//
// TODO: confirmar os números reais. Os valores abaixo são provisórios: correspondem à quantidade
// de nomes listados por estado na apresentação comercial (que termina sempre com "e muito mais...").
export const CLIENTES_POR_ESTADO = {
  SP: 3,
  BA: 4,
  PR: 4,
  MG: 4,
  ES: 4,
  RS: 4,
  SC: 4,
  GO: 4,
  RJ: 4,
  MT: 3,
  PA: 3,
  AL: 2,
  PB: 2,
  CE: 1,
  MS: 1,
  PE: 1,
  RN: 1,
}

export const textoClientes = (n) => `+ de ${n} ${n === 1 ? 'cliente' : 'clientes'}`
