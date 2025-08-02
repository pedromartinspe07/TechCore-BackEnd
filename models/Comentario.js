const mongoose = require('mongoose');

// Schema de Comentário
const ComentarioSchema = new mongoose.Schema(
  {
    autor: {
      type: String,
      required: [true, 'O nome do autor é obrigatório.'],
      trim: true,
      maxlength: [50, 'O nome do autor deve ter no máximo 50 caracteres.']
    },
    texto: {
      type: String,
      required: [true, 'O comentário é obrigatório.'],
      trim: true,
      minlength: [10, 'O comentário deve ter no mínimo 10 caracteres.']
    },
    noticia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Noticia',
      required: [true, 'O comentário deve estar associado a uma notícia.']
    }
  },
  {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
  }
);

// Exporta o modelo
module.exports = mongoose.model('Comentario', ComentarioSchema);
