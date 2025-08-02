const mongoose = require('mongoose');

// Schema para o modelo de Resposta
const RespostaSchema = new mongoose.Schema({
  autor: {
    type: String,
    required: [true, 'O autor é obrigatório'],
    trim: true,
    maxlength: [50, 'O nome do autor deve ter no máximo 50 caracteres'],
    validate: {
      validator: v => /^[\p{L}\p{N} .'-]{2,}$/u.test(v),
      message: 'O nome do autor contém caracteres inválidos'
    }
  },
  texto: {
    type: String,
    required: [true, 'O texto da resposta é obrigatório'],
    trim: true,
    minlength: [10, 'O texto deve ter no mínimo 10 caracteres'],
    maxlength: [1000, 'O texto deve ter no máximo 1000 caracteres']
  },
  comentario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentario',
    required: [true, 'A resposta deve estar associada a um comentário']
  }
}, {
  timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

// Index opcional para facilitar buscas por data de criação
RespostaSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Resposta', RespostaSchema);
