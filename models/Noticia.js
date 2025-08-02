const mongoose = require('mongoose');

// Definição do schema da Notícia
const NoticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true,
    maxlength: [100, 'O título deve ter no máximo 100 caracteres']
  },
  conteudo: {
    type: String,
    required: [true, 'O conteúdo é obrigatório'],
    trim: true,
    minlength: [10, 'O conteúdo deve ter no mínimo 10 caracteres']
  },
  categoria: {
    type: String,
    enum: {
      values: ['Hardware', 'Software', 'Geral', 'Opinião', 'Tutoriais', 'Reviews'],
      message: 'Categoria inválida'
    },
    default: 'Geral',
    trim: true
  },
  imagemCapa: {
    type: String,
    trim: true,
    validate: {
      validator: (url) =>
        !url || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url),
      message: 'A URL da imagem de capa deve ser válida e terminar com uma extensão de imagem'
    }
  },
  autor: {
    type: String,
    trim: true,
    default: 'Redação TechCore',
    maxlength: [50, 'O nome do autor deve ter no máximo 50 caracteres']
  },
  data: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // adiciona createdAt e updatedAt automaticamente
  collection: 'noticias' // nome explícito da coleção (opcional)
});

// Index para ordenar por data de publicação (mais recentes primeiro)
NoticiaSchema.index({ data: -1 });

// Exporta o modelo
module.exports = mongoose.model('Noticia', NoticiaSchema);
