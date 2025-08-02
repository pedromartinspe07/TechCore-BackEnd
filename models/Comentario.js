const mongoose = require('mongoose'); //importa o mongoose

// Schema para o modelo de Comentário
const ComentarioSchema = new mongoose.Schema({
  // Campo para o autor do comentário
  autor: {
    type: String,
    required: [true, 'O autor é obrigatório'],
    trim: true,
    maxlength: [50, 'O nome do autor deve ter no máximo 50 caracteres']
  },
  // Campo para o texto do comentário
  texto: {
    type: String,
    required: [true, 'O texto é obrigatório'],
    trim: true,
    minlength: [10, 'O texto deve ter no mínimo 10 caracteres']
  },
  // Campo para a data do comentário
  data: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);
