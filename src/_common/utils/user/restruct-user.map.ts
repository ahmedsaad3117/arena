import { UserEntity } from "src/user/entities/users.entity";

export const restructUser = (input: UserEntity) => {
  const output = {
    ...input,
    userToRole: undefined,
    password: undefined,
    roles: input.userToRole
      .map((userRole) => {
        const role = userRole.role;
        return {
          id: role.id,
          name: role.name,
          permissions: role.roleToPermission.map((rolePermission) => {
            const permission = rolePermission.permission;
            return {
              id: permission.id,
              name: permission.name,
              slug: permission.slug,
            };
          }),
        };
      })
      .map((userRole) => ({
        id: userRole.id,
        name: userRole.name,
      })),
    permissions: input.userToRole
      .flatMap((userRole) =>
        userRole.role.roleToPermission.map(
          (rolePermission) => rolePermission.permission
        )
      )
      .map((permission) => ({
        id: permission.id,
        name: permission.name,
        slug: permission.slug,
      })),
  };
  return output;
};
