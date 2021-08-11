import { Ability, AbilityBuilder } from "@casl/ability";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_STAFF } from "constants/user-config";

export default function defineAbilityFor(roles) {
  const { can, rules } = new AbilityBuilder(Ability);
  if (roles.length > 0) {
    can("login", "website");
    if (roles.includes(ROLE_ADMIN) || roles.includes(ROLE_STAFF)) {
      can("read-write", "admin-staff");
      if (roles.includes(ROLE_ADMIN)) {
        can("read-write", "admin");
      }
      if (roles.includes(ROLE_STAFF)) {
        can("read-write", "staff");
      }
    }
    if (roles.includes(ROLE_CUSTOMER)) {
      can("read-write", "customer");
      can("buy", "product");
    }
  } else {
    can("buy", "product");
  }

  return rules;
}

export function buildAbilityFor(roles) {
    return new Ability(defineAbilityFor(roles));
}
