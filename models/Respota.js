const mongoose = require('mongoose'); //importa o mongoose

// Schema para o modelo de Resposta
const RespostaSchema = new mongoose.Schema({
  // Campo para o autor da resposta
  autor: {
    type: String,
    required: [true, 'O autor é obrigatório'],
    trim: true,
    maxlength: [50, 'O nome do autor deve ter no máximo 50 caracteres']
  },
  // Campo para o texto da resposta
  texto: {
    type: String,
    required: [true, 'O texto é obrigatório'],
    trim: true,
    minlength: [10, 'O texto deve ter no mínimo 10 caracteres']
  },
  // Campo para o comentário da resposta
  comentario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentario',
    required: true
  }
}, {
  timestamps: true // createdAt e updatedAt automáticos
});

module.exports = mongoose.model('Resposta', RespostaSchema);
