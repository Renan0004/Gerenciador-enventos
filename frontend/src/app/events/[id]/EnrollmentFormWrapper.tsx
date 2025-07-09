'use client';

import { useRouter } from 'next/navigation';
import EnrollmentForm from '@/components/EnrollmentForm';

interface EnrollmentFormWrapperProps {
  eventId: string;
}

export default function EnrollmentFormWrapper({ eventId }: EnrollmentFormWrapperProps) {
  const router = useRouter();
  
  const handleSuccess = () => {
    // Atualizar a página para mostrar o novo participante
    router.refresh();
  };
  
  return <EnrollmentForm eventId={eventId} onSuccess={handleSuccess} />;
} 