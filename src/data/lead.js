// Formulário de contato em etapas (pop-up aberto por qualquer link "#contato" do site).
// As perguntas e opções são as do formulário atual da Balzani.

// TODO: definir para onde os contatos vão (CRM, planilha, e-mail...). Recebe um POST com JSON.
// Enquanto estiver vazio, o envio é só simulado no navegador — NENHUM contato é salvo.
export const LEAD_ENDPOINT = ''

export const LEAD_STEPS = [
  {
    id: 'contato',
    title: 'Como falamos com você?',
    fields: [
      { name: 'nome', label: 'Nome completo', type: 'text', autoComplete: 'name' },
      { name: 'telefone', label: 'Telefone / WhatsApp', type: 'tel', autoComplete: 'tel' },
    ],
  },
  {
    id: 'empresa',
    title: 'Onde encontramos sua empresa?',
    fields: [
      { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
      { name: 'site', label: 'Site ou Instagram da empresa', type: 'text', autoComplete: 'url' },
    ],
  },
  {
    id: 'perfil',
    title: 'Sobre você',
    choices: [
      {
        name: 'perfil',
        label: 'Você é',
        options: ['Corretor de imóveis', 'Dono de imobiliária', 'Construtor/Incorporador'],
      },
      {
        name: 'vgv',
        label: 'Qual o VGV do seu lançamento imobiliário?',
        grid: true,
        // o formulário atual pula a faixa de 12 a 20 milhões — mantido igual; ajuste se precisar
        options: ['0 a 6 milhões', '6 a 12 milhões', '20 a 50 milhões', 'Acima de 50 milhões'],
      },
    ],
  },
  {
    id: 'lancamento',
    title: 'E o seu lançamento?',
    choices: [
      {
        name: 'previsao',
        label: 'Qual a previsão para o seu lançamento?',
        grid: true,
        options: ['Dentro de 3 meses', 'De 3 a 6 meses', 'Já lancei', 'Sem previsão'],
      },
    ],
  },
]
