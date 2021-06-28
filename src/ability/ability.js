import { Ability, AbilityBuilder } from "@casl/ability";
import { ROLE_ADMIN, ROLE_STAFF, ROLE_CUSTOMER } from "constant/user-config";

export default function defineAbilityFor(roles) {
  const { can, cannot, build } = new AbilityBuilder(Ability);
  if (roles.length > 0) {
    if (roles.includes(ROLE_ADMIN)) {
      can("manage", "all"); // read-write access to everything
    }
    if (roles.includes(ROLE_STAFF)) {
      can("edit", "all"); // read-write access to everything
    }
    if (roles.includes(ROLE_CUSTOMER)) {
      can("read", "all"); // read-write access to everything
    }
  }

  can("buy", "product");

  return build();
}
