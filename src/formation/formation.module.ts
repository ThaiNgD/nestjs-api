import { Module } from '@nestjs/common';
import { FormationController } from './controller/formation/formation.controller';
import { FormationService } from './service/formation/formation.service';

@Module({
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
