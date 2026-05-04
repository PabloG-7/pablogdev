export type BookingType = 'barbearia' | 'clinica' | 'petshop'

export const bookingData = {
  barbearia: {
    title: 'Agendamento para barbearias',
    business: 'Barbearia Prime',
    whatsapp:
      'https://wa.me/5511961111894?text=Ol%C3%A1%2C%20vi%20a%20demo%20de%20barbearia%20e%20quero%20um%20sistema%20assim.',
    services: [
      { name: 'Corte Masculino', price: 'R$ 45' },
      { name: 'Corte + Barba', price: 'R$ 70' },
      { name: 'Barba Completa', price: 'R$ 40' },
    ],
    professionals: ['Carlos Silva', 'Rafael Souza', 'André Lima'],
    times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  },

  clinica: {
    title: 'Agendamento para clínicas',
    business: 'Clínica Saúde+',
    whatsapp:
      'https://wa.me/5511961111894?text=Ol%C3%A1%2C%20vi%20a%20demo%20de%20cl%C3%ADnica%20e%20quero%20um%20sistema%20assim.',
    services: [
      { name: 'Consulta', price: 'R$ 120' },
      { name: 'Avaliação', price: 'R$ 90' },
      { name: 'Retorno', price: 'R$ 70' },
    ],
    professionals: ['Dra. Ana', 'Dr. Carlos', 'Dra. Juliana'],
    times: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'],
  },

  petshop: {
    title: 'Agendamento para petshops',
    business: 'PetCare',
    whatsapp:
      'https://wa.me/5511961111894?text=Ol%C3%A1%2C%20vi%20a%20demo%20de%20petshop%20e%20quero%20um%20sistema%20assim.',
    services: [
      { name: 'Banho', price: 'R$ 50' },
      { name: 'Tosa', price: 'R$ 60' },
      { name: 'Consulta', price: 'R$ 120' },
    ],
    professionals: ['Equipe Pet', 'Dr. Carlos', 'Dra. Juliana'],
    times: ['09:00', '10:30', '12:00', '14:30', '16:00'],
  },
}