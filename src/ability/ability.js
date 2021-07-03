import { Ability, AbilityBuilder } from "@casl/ability";
import { ROLE_ADMIN, ROLE_STAFF, ROLE_CUSTOMER } from "constant/user-config";

export default function defineAbilityFor(roles) {
  const { can, rules } = new AbilityBuilder(Ability);
  if (roles.length > 0) {
    can("login", "website");
    if (roles.includes(ROLE_ADMIN)) {
      can("", "user");
    }
    if (roles.includes(ROLE_STAFF)) {
      can("edit", "product");
    }
    if (roles.includes(ROLE_CUSTOMER)) {
      can("manage", "my-info");
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
