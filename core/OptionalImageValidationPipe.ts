import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException, FileValidator } from '@nestjs/common';

@Injectable()
export class OptionalImageValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (file) {
      const maxSize = 5000000; // 5MB
      if (file.size > maxSize) {
        throw new BadRequestException('Tamaño máximo del archivo es de 5MB');
      }
      const allowedTypes = /image\/(png|jpeg|jpg)$/;
      if (!allowedTypes.test(file.mimetype)) {
        throw new BadRequestException('Tipo de archivo no permitido. Solo se permiten archivos png, jpeg y jpg');
      }
    }
    return file;
  }
}
