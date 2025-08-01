const mongoose = require('mongoose');

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
    enum: ['Hardware', 'Software', 'Geral', 'Opinião', 'Tutoriais', 'Reviews'],
    default: 'Geral',
    trim: true
  },
  imagemCapa: {
    type: String,
    trim: true,
    validate: {
      validator: (v) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v),
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
  timestamps: true // createdAt e updatedAt automáticos
});

NoticiaSchema.index({ data: -1 }); // Para ordenação eficiente por data

module.exports = mongoose.model('Noticia', NoticiaSchema);
