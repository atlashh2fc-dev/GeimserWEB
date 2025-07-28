export interface BotResponse {
  answer: string;
  leadCompleted: boolean;
  leadData: {
    nombre?: string;
    correo?: string;
    telefono?: string;
    mensaje: string;
    tipo_interes: string;
  };
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function obtenerRespuestaGPT(messages: Message[]): Promise<BotResponse> {
  console.log('🚀 [GPT SERVICE] Iniciando solicitud con', messages.length, 'mensajes');
  
  try {
    // 1. Verificar que tengamos mensajes
    if (!messages || messages.length === 0) {
      throw new Error('No hay mensajes para enviar');
    }

    // 2. Hacer la solicitud a la API
    console.log('📡 [GPT SERVICE] Enviando fetch a /api/chat');
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    console.log('📡 [GPT SERVICE] Respuesta recibida:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });

    // 3. Manejar errores HTTP
    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        console.error('❌ [GPT SERVICE] Error de API:', errorData);
      } catch (parseError) {
        console.error('❌ [GPT SERVICE] Error al parsear respuesta de error');
        const errorText = await response.text();
        console.error('❌ [GPT SERVICE] Texto de error:', errorText);
      }
      
      throw new Error(errorMessage);
    }

    // 4. Parsear respuesta JSON
    let data;
    try {
      data = await response.json();
      console.log('✅ [GPT SERVICE] Datos parseados:', {
        hasContent: !!data.content,
        contentLength: data.content?.length || 0,
        role: data.role,
        timestamp: data.timestamp
      });
    } catch (parseError) {
      console.error('❌ [GPT SERVICE] Error al parsear JSON de respuesta:', parseError);
      throw new Error('La respuesta del servidor no es JSON válido');
    }

    // 5. Validar estructura de respuesta
    if (!data || typeof data.content !== 'string') {
      console.error('❌ [GPT SERVICE] Estructura de respuesta inválida:', data);
      throw new Error('Respuesta del servidor con formato inválido');
    }

    const answer = data.content;

    // 6. Análisis de lead (detección de información de contacto)
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+?[0-9]{1,4}[-.\s]?)?(\(?[0-9]{1,4}\)?[-.\s]?)?[0-9]{1,4}[-.\s]?[0-9]{1,9}/g;
    
    const emailMatches = answer.match(emailRegex);
    const phoneMatches = answer.match(phoneRegex);
    
    const hasEmail = emailMatches && emailMatches.length > 0;
    const hasPhone = phoneMatches && phoneMatches.length > 0;
    const hasContactInfo = hasEmail || hasPhone;

    // 7. Extraer último mensaje del usuario para contexto
    const lastUserMessage = messages
      .filter(m => m.role === 'user')
      .pop()?.content || '';

    // 8. Construir datos del lead
    const leadData = {
      nombre: 'Usuario del chat',
      correo: hasEmail ? emailMatches![0] : undefined,
      telefono: hasPhone ? phoneMatches![0] : undefined,
      mensaje: lastUserMessage,
      tipo_interes: 'Consulta desde chat widget'
    };

    console.log('✅ [GPT SERVICE] Procesamiento completado:', {
      answerLength: answer.length,
      leadCompleted: hasContactInfo,
      hasEmail,
      hasPhone,
      leadData: leadData
    });

    // 9. Retornar respuesta estructurada
    return {
      answer,
      leadCompleted: hasContactInfo,
      leadData
    };

  } catch (error: any) {
    console.error('❌ [GPT SERVICE] Error completo:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause
    });

    // Mensajes de error específicos para el usuario
    let userMessage = 'Lo siento, hubo un problema al procesar tu mensaje.';
    
    if (error.message.includes('404')) {
      userMessage = '🚨 Error de configuración: La API del chat no está disponible. Contacta al administrador del sitio.';
    } else if (error.message.includes('500')) {
      userMessage = '⚠️ Error del servidor. Por favor intenta nuevamente en unos momentos.';
    } else if (error.message.includes('fetch')) {
      userMessage = '🌐 Error de conexión. Verifica tu conexión a internet e intenta nuevamente.';
    } else if (error.message.includes('JSON')) {
      userMessage = '📡 Error de comunicación con el servidor. Intenta recargar la página.';
    } else if (error.message.includes('TIMEOUT')) {
      userMessage = '⏱️ La respuesta está tardando mucho. Intenta con un mensaje más corto.';
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      userMessage = '💳 El servicio ha alcanzado su límite. Contacta al administrador.';
    } else if (error.message.includes('AUTH_ERROR')) {
      userMessage = '🔐 Error de autenticación del servicio. Contacta al administrador.';
    }

    // Retornar respuesta de error estructurada
    return {
      answer: userMessage + '\n\nSi el problema persiste, puedes contactarnos directamente por otros medios.',
      leadCompleted: false,
      leadData: {
        mensaje: `Error técnico: ${error.message}`,
        tipo_interes: 'Error en consulta'
      }
    };
  }
}
