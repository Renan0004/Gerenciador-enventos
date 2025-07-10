export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Remove todos os caracteres não numéricos para validação
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Valida se tem 10 ou 11 dígitos (formato brasileiro)
  // 10 dígitos: telefone fixo (11) 1234-5678
  // 11 dígitos: celular (11) 91234-5678
  return digitsOnly.length === 10 || digitsOnly.length === 11;
};

export const validateDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
};

export const validateUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}; 