import { supabase } from './supabaseClient';

/**
 * Registra uma ação financeira no histórico de logs.
 * @param {string} email - E-mail do usuário que realizou a ação.
 * @param {string} acao - Título curto da ação (Ex: "Criação de Transação").
 * @param {string} detalhes - Descrição detalhada da alteração.
 */
export async function registrarLogFinanceiro(email, acao, detalhes) {
  try {
    await supabase
      .from('logs_financeiros')
      .insert([{ usuario_email: email || 'Sistema', acao, detalhes }]);
  } catch (err) {
    console.error('Falha ao registrar log:', err);
  }
}