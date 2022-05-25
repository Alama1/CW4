import {Controller, Get} from '@nestjs/common';
import {TestsService} from "../../tests/tests.service";

@Controller('tests')
export class TestsController {
    constructor(
       testsService: TestsService
    ) {}

    @Get('starter')
    starterTests() {

    }
}
