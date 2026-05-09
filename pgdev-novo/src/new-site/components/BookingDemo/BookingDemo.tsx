import type { Language } from '../../types'
import type { BookingType } from './bookingData'
import BarbeariaDemo from './BarbeariaDemo/BarbeariaDemo'
import ClinicaDemo from './ClinicaDemo/ClinicaDemo'
import PetshopDemo from './PetshopDemo/PetshopDemo'
import './BookingDemoGlobal.css'

type Props = {
  type: BookingType
  language: Language
}

export default function BookingDemo({ type, language }: Props) {
  if (type === 'barbearia') return <BarbeariaDemo language={language} />
  if (type === 'clinica') return <ClinicaDemo language={language} />
  
  return <PetshopDemo language={language} />
}