import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { TestsService } from '../../tests/tests.service';

@Module({
  controllers: [TestsController],
  providers: [TestsService]
})
export class TestsModule {}
