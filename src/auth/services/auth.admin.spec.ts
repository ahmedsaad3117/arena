import { Test } from "@nestjs/testing";
import { AdminAuthService } from "./auth.admin.service";
import { UsersBaseService } from "@app/user/providers/users.base.service";

describe("AdminAuthService", () => {
  let adminAuthService: AdminAuthService;
  let fakeService = {};
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AdminAuthService,
        {
          provide: UsersBaseService,
          useValue: fakeService,
        },
      ],
    }).compile();

    adminAuthService = moduleRef.get<AdminAuthService>(AdminAuthService);
  });

  expect(adminAuthService).toBeDefined();
});
