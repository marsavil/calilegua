import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriasService {
  categorias = [
    { id: 1, nombre: 'Juegos' },
    { id: 2, nombre: 'Musica' },
    { id: 3, nombre: 'Deportes' }
  ]
  private idCont = this.categorias.length; // idCont coincidente con la cantidad de categorias
  findAll() {
    return this.categorias;
  }

  findOne(id: number) {
    return this.categorias.find((item) => item.id === id);
  }

  create(payload: any) {
    this.idCont = this.idCont + 1;
    const newCategory = {
      id: this.idCont,
      ...payload,
    };
    this.categorias.push(newCategory);
    return newCategory;
  }
  update(id: number, payload: any) {
    const category = this.categorias.find((p) => p.id === id);
    if (!category) {
      throw new Error(`No se encontró la categoría con id ${id}`);
    }
    Object.assign(category, payload);
    const index = this.categorias.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`La categoriía #${id} no se encuentra`);
    }

    // Reemplazar el categoryo actualizado en la lista
    this.categorias.splice(index, 1, category);
    return {
      message: 'Categoria actualizada correctamente',
      category,
    };
  }
  remove(id: number) {
    const index = this.categorias.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `La categoria con el id ${id} no se encuentra`,
      );
    }
    this.categorias.splice(index, 1);
    return {
      message: 'Categoría eliminada correctamente',
      id,
    }
  }
}
