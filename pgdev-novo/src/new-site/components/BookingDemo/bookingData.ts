export type BookingType = 'barbearia' | 'clinica' | 'petshop'

export const bookingData = {
  barbearia: {
    title: 'Sistema de agendamento para barbearias',
    subtitle: 'Controle serviços, barbeiros, horários e clientes em uma agenda online simples, moderna e pronta para WhatsApp.',
    business: 'Barbearia Estilo Prime',
    segment: 'Barbearia',
    highlight: 'Agenda online para organizar atendimentos e reduzir horários perdidos.',
    whatsapp: 'https://wa.me/5511961111894?text=Ol%C3%A1%2C%20vi%20a%20demo%20de%20barbearia%20e%20quero%20um%20sistema%20assim.',
    services: [
      { name: 'Corte Masculino', price: 'R$ 45', duration: '40 min' },
      { name: 'Corte + Barba', price: 'R$ 70', duration: '1h' },
      { name: 'Barba Completa', price: 'R$ 40', duration: '30 min' },
      { name: 'Sobrancelha', price: 'R$ 20', duration: '15 min' },
    ],
    professionals: ['Carlos Silva', 'Rafael Souza', 'André Lima'],
    times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    info: [
      { label: '⚠️ Lembrete', value: 'Confirmar 1h antes' },
      { label: '⏱️ Duração média', value: '45 min' },
      { label: '🔄 Reagendamento', value: 'Até 2h antes' },
    ],
    features: [
      'Escolha de serviço',
      'Seleção de barbeiro',
      'Horários disponíveis',
      'Resumo do agendamento',
      'Contato via WhatsApp',
    ],
  },

  clinica: {
    title: 'Sistema de agendamento para clínicas',
    subtitle: 'Organize consultas, profissionais, pacientes e retornos com uma experiência clara e confiável.',
    business: 'Clínica Saúde+',
    segment: 'Clínica',
    highlight: 'Agenda médica online para reduzir confusão e melhorar o atendimento.',
    whatsapp: 'https://wa.me/5511961111894?text=Ol%C3%A1%2C%20vi%20a%20demo%20de%20cl%C3%ADnica%20e%20quero%20um%20sistema%20assim.',
    services: [
      { name: 'Consulta médica', price: 'R$ 120', duration: '40 min' },
      { name: 'Avaliação especializada', price: 'R$ 90', duration: '30 min' },
      { name: 'Retorno de consulta', price: 'R$ 70', duration: '25 min' },
      { name: 'Sessão de fisioterapia', price: 'R$ 100', duration: '50 min' },
    ],
    professionals: ['Dra. Ana Martins', 'Dr. Carlos Oliveira', 'Dra. Juliana Silva'],
    times: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
    info: [
      { label: '📋 Documentos', value: 'Levar carteirinha' },
      { label: '⏱️ Duração média', value: '40 min' },
      { label: '🔄 Cancelamento', value: 'Até 4h antes' },
    ],
    features: [
      'Agendamento de consultas',
      'Escolha de profissional',
      'Controle de pacientes',
      'Retornos organizados',
      'Confirmação por WhatsApp',
    ],
  },

  petshop: {
    title: 'Sistema de agendamento para petshops',
    subtitle: 'Facilite reservas de banho, tosa e consultas, mantendo clientes, pets e horários organizados.',
    business: 'PetCare Agenda',
    segment: 'Petshop',
    highlight: 'Agenda online para petshops que precisam organizar atendimentos com praticidade.',
    whatsapp: 'https://wa.me/5511961111894?text=Ol%C3%A1%2C%20vi%20a%20demo%20de%20petshop%20e%20quero%20um%20sistema%20assim.',
    services: [
      { name: 'Banho completo', price: 'R$ 50', duration: '1h' },
      { name: 'Tosa higiênica', price: 'R$ 60', duration: '1h' },
      { name: 'Banho + Tosa', price: 'R$ 90', duration: '1h30' },
      { name: 'Consulta veterinária', price: 'R$ 120', duration: '40 min' },
    ],
    professionals: ['Equipe Pet', 'Dr. Carlos Vet', 'Juliana Groomer'],
    times: ['09:00', '10:30', '12:00', '14:30', '16:00'],
    info: [
      { label: '🐾 Vacinas', value: 'Obrigatórias em dia' },
      { label: '⏱️ Duração média', value: '1 hora' },
      { label: '📝 Observação', value: 'Levar guia e coleira' },
    ],
    features: [
      'Cadastro do pet',
      'Serviços de banho e tosa',
      'Agenda por horário',
      'Controle de clientes',
      'Confirmação no WhatsApp',
    ],
  },
}